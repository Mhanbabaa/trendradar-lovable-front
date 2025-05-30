
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from './useTenant';
import { toast } from '@/hooks/use-toast';
import { useProducts } from './useProducts';

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

export function useTrendyolScraper() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const { addProduct: addProductToService } = useProducts();
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
        
        // Use the addProduct from useProducts hook (without trendyol_id)
        addProductToService({
          name: productData.name,
          url: url,
          price: productData.price,
          image_url: productData.image_url,
          rating: productData.rating,
          review_count: productData.review_count
        });

        return { success: true };
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
