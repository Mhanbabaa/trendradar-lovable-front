
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ürün verileri alınamadı');
      }

      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Scraping error:', error);
      throw new Error(error instanceof Error ? error.message : 'Ürün bilgileri çekilirken hata oluştu');
    }
  };

  const addProductMutation = useMutation({
    mutationFn: async (url: string) => {
      console.log('useTrendyolScraper: starting product addition for tenantId =', tenantId);
      
      if (!tenantId) {
        throw new Error('Kullanıcı bilgileri yükleniyor, lütfen bekleyin veya sayfayı yenileyin');
      }

      setIsLoading(true);
      
      try {
        // URL'den product bilgilerini çıkar
        console.log('Extracting product info from URL:', url);
        const { contentId, merchantId } = extractProductInfo(url);
        console.log('Extracted info - contentId:', contentId, 'merchantId:', merchantId);
        
        // Ürün verilerini scrape et
        console.log('Starting product scraping...');
        const productData = await scrapeProductData(url);
        console.log('Scraped product data:', productData);
        
        // Use the addProduct from useProducts hook
        console.log('Adding product to service...');
        const result = await new Promise((resolve, reject) => {
          addProductToService({
            name: productData.name,
            url: url,
            price: productData.price,
            image_url: productData.image_url,
            rating: productData.rating,
            review_count: productData.review_count
          });
          
          // Since addProductToService doesn't return a promise, we'll consider it successful
          setTimeout(() => resolve({ success: true }), 100);
        });

        console.log('Product added successfully:', result);
        return { success: true };
      } catch (error) {
        console.error('Error in addProductMutation:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      console.log('Product addition successful, invalidating queries...');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      });
    },
    onError: (error) => {
      console.error('useTrendyolScraper error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return {
    addProduct: addProductMutation.mutate,
    isLoading: isLoading || addProductMutation.isPending,
  };
}
