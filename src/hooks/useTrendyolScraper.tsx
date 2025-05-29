
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from './useTenant';
import { toast } from '@/hooks/use-toast';

export interface TrendyolProductData {
  name: string;
  price: number;
  image_url: string;
  sku: string;
  brand: string;
  description: string;
  rating: number;
  review_count: number;
  merchant_id: string;
  content_id: string;
}

export interface SocialProofData {
  basketCount: { count: string; priority: number };
  favoriteCount: { count: string; priority: number };
  orderCountL3D: { count: string; priority: number };
  pageViewCount: { count: string; priority: number };
  sentiments?: Array<{
    tagName: string;
    reviewCount: number;
    positiveRatio: number;
    priority: number;
  }>;
}

export interface ReviewData {
  ratingCounts: Array<{
    rate: number;
    count: number;
    commentCount: number;
  }>;
  averageRating: number;
  totalCommentCount: number;
  totalRatingCount: number;
  aiSummary: string;
  imageUrl?: string;
}

export function useTrendyolScraper() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // URL'den product ID ve merchant ID'yi çıkarma
  const extractProductInfo = (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const merchantId = urlParams.get('merchantId');
    
    // -p- sonrası content ID'yi al
    const contentIdMatch = url.match(/-p-(\d+)/);
    const contentId = contentIdMatch ? contentIdMatch[1] : null;
    
    if (!contentId) {
      throw new Error('URL\'den ürün ID\'si çıkarılamadı');
    }
    
    return { contentId, merchantId };
  };

  // Trendyol HTML'den ürün verilerini çıkarma
  const scrapeProductData = async (url: string): Promise<TrendyolProductData> => {
    try {
      const response = await fetch(`/api/scrape-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Ürün verileri alınamadı');
      }

      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Scraping error:', error);
      throw new Error('Ürün bilgileri çekilirken hata oluştu');
    }
  };

  // Social proof verilerini alma
  const getSocialProofData = async (contentId: string): Promise<SocialProofData> => {
    try {
      const response = await fetch(
        `https://apigw.trendyol.com/discovery-web-searchgw-service/social-proof?contentIds=${contentId}&client=PDP&channelId=1`
      );

      if (!response.ok) {
        throw new Error('Social proof verileri alınamadı');
      }

      const data = await response.json();
      return data.result[contentId];
    } catch (error) {
      console.error('Social proof error:', error);
      throw new Error('Sosyal kanıt verileri alınamadı');
    }
  };

  // Review verilerini alma
  const getReviewData = async (contentId: string, sellerId: string): Promise<ReviewData> => {
    try {
      const response = await fetch(
        `https://apigw.trendyol.com/discovery-web-websfxsocialreviewrating-santral/product-reviews-detailed?sellerId=${sellerId}&contentId=${contentId}&pageSize=20&culture=tr-TR&channelId=1&storefrontId=1&aiSummaryVariant=C`
      );

      if (!response.ok) {
        throw new Error('Review verileri alınamadı');
      }

      const data = await response.json();
      const { ratingCounts, averageRating, totalCommentCount, totalRatingCount, aiSummary, imageUrl } = data.result.contentSummary;
      
      return {
        ratingCounts,
        averageRating,
        totalCommentCount,
        totalRatingCount,
        aiSummary,
        imageUrl
      };
    } catch (error) {
      console.error('Review data error:', error);
      throw new Error('Yorum verileri alınamadı');
    }
  };

  const addProductMutation = useMutation({
    mutationFn: async (url: string) => {
      console.log('useTrendyolScraper: tenantId =', tenantId);
      
      if (!tenantId) {
        throw new Error('Kullanıcı bilgileri yükleniyor, lütfen bekleyin veya sayfayı yenileyin');
      }

      setIsLoading(true);
      
      try {
        // URL'den product bilgilerini çıkar
        const { contentId, merchantId } = extractProductInfo(url);
        
        // Ürün verilerini scrape et
        const productData = await scrapeProductData(url);
        
        // Social proof verilerini al
        const socialProofData = await getSocialProofData(contentId);
        
        // Review verilerini al
        const reviewData = await getReviewData(contentId, merchantId || productData.merchant_id);
        
        // Ürünü veritabanına kaydet
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tenantId,
            url,
            productData,
            socialProofData,
            reviewData,
            contentId,
            merchantId: merchantId || productData.merchant_id
          }),
        });

        if (!response.ok) {
          throw new Error('Ürün kaydedilemedi');
        }

        return await response.json();
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      });
    },
    onError: (error) => {
      console.error('useTrendyolScraper error:', error);
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    addProduct: addProductMutation.mutate,
    isLoading: isLoading || addProductMutation.isPending,
  };
}
