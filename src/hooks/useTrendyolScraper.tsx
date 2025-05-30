
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
    console.log('🔍 Extracting product info from URL:', url);
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const merchantId = urlParams.get('merchantId');
    
    // -p- sonrası content ID'yi al
    const contentIdMatch = url.match(/-p-(\d+)/);
    const contentId = contentIdMatch ? contentIdMatch[1] : null;
    
    console.log('📋 Extracted content ID:', contentId, 'merchant ID:', merchantId);
    
    if (!contentId) {
      throw new Error('URL\'den ürün ID\'si çıkarılamadı');
    }
    
    return { contentId, merchantId };
  };

  // Trendyol HTML'den ürün verilerini çıkarma
  const scrapeProductData = async (url: string): Promise<TrendyolProductData> => {
    try {
      console.log('🌐 Starting scraping request for URL:', url);
      
      const response = await fetch(`/api/scrape-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      console.log('📡 Scraping API response status:', response.status, response.statusText);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.error('❌ Could not parse error response as JSON:', parseError);
          const textResponse = await response.text();
          console.error('❌ Raw error response:', textResponse.substring(0, 500));
          throw new Error(`API yanıtı beklenmeyen format: ${response.status} ${response.statusText}`);
        }
        console.error('❌ Scraping API error:', errorData);
        throw new Error(errorData.error || 'Ürün verileri alınamadı');
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('❌ Could not parse successful response as JSON:', parseError);
        const textResponse = await response.text();
        console.error('❌ Raw successful response:', textResponse.substring(0, 500));
        throw new Error('API yanıtı beklenmeyen format');
      }

      console.log('✅ Scraped product data:', data.product);
      return data.product;
    } catch (error) {
      console.error('💥 Scraping error:', error);
      throw new Error(error instanceof Error ? error.message : 'Ürün bilgileri çekilirken hata oluştu');
    }
  };

  const addProductMutation = useMutation({
    mutationFn: async (url: string) => {
      console.log('🚀 useTrendyolScraper: starting product addition process');
      console.log('👤 Current tenantId:', tenantId);
      console.log('🔗 Product URL:', url);
      
      if (!tenantId) {
        console.error('❌ No tenant ID available');
        throw new Error('Kullanıcı bilgileri yükleniyor, lütfen bekleyin veya sayfayı yenileyin');
      }

      setIsLoading(true);
      console.log('⏳ Loading state set to true');
      
      try {
        // URL'den product bilgilerini çıkar
        console.log('🔍 Step 1: Extracting product info from URL');
        const { contentId, merchantId } = extractProductInfo(url);
        console.log('✅ Step 1 completed - contentId:', contentId, 'merchantId:', merchantId);
        
        // Ürün verilerini scrape et
        console.log('🌐 Step 2: Starting product scraping');
        const productData = await scrapeProductData(url);
        console.log('✅ Step 2 completed - scraped data:', productData);
        
        // Use the addProduct from useProducts hook
        console.log('💾 Step 3: Adding product to database');
        console.log('📦 Product data to be saved:', {
          name: productData.name,
          url: url,
          price: productData.price,
          image_url: productData.image_url,
          rating: productData.rating,
          review_count: productData.review_count
        });

        // Call the addProduct function and wait for it
        await new Promise<void>((resolve, reject) => {
          try {
            addProductToService({
              name: productData.name,
              url: url,
              price: productData.price,
              image_url: productData.image_url,
              rating: productData.rating,
              review_count: productData.review_count
            });
            console.log('✅ Step 3 completed - product add function called');
            setTimeout(() => resolve(), 1000); // Give it a moment to process
          } catch (error) {
            console.error('❌ Error calling addProductToService:', error);
            reject(error);
          }
        });

        console.log('🎉 Product addition process completed successfully');
        return { success: true };
      } catch (error) {
        console.error('💥 Error in addProductMutation:', error);
        throw error;
      } finally {
        console.log('⏳ Setting loading state to false');
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      console.log('🎯 Product addition mutation successful');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      });
    },
    onError: (error) => {
      console.error('❌ useTrendyolScraper mutation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return {
    addProduct: (url: string) => {
      console.log('🎬 addProduct called with URL:', url);
      return addProductMutation.mutateAsync(url);
    },
    isLoading: isLoading || addProductMutation.isPending,
  };
}
