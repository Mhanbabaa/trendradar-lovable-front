
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/lib/product.service';

interface ProductMetrics {
  basketCount: { count: string; change?: number };
  favoriteCount: { count: string; change?: number };
  orderCountL3D: { count: string; change?: number };
  pageViewCount: { count: string; change?: number };
}

interface ExtendedProduct extends Product {
  metrics?: ProductMetrics;
}

export default function ProductList() {
  const { products, isLoading } = useProducts();

  const formatNumber = (numberStr: string) => {
    const number = parseInt(numberStr.replace(/[^\d]/g, ''));
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return numberStr;
  };

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    value, 
    change, 
    color 
  }: { 
    icon: any; 
    label: string; 
    value: string; 
    change?: number; 
    color: string;
  }) => (
    <div className={`p-3 rounded-lg ${color}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-white" />
          <span className="text-xs text-white/80">{label}</span>
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {change > 0 ? (
              <TrendingUp className="h-3 w-3 text-green-300" />
            ) : change < 0 ? (
              <TrendingDown className="h-3 w-3 text-red-300" />
            ) : null}
            <span className={`text-xs ${change > 0 ? 'text-green-300' : change < 0 ? 'text-red-300' : 'text-white/60'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      <div className="text-lg font-bold text-white mt-1">
        {formatNumber(value)}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Takip Edilen Ürünler</CardTitle>
          <CardDescription>Henüz hiç ürün eklemediniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">İlk ürününüzü ekleyin</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Trendyol'dan takip etmek istediğiniz ürünlerin URL'lerini ekleyerek 
              fiyat değişimlerini ve yorumları analiz etmeye başlayın.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product: ExtendedProduct) => (
        <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-0">
            {/* Ürün Resmi */}
            <div className="relative">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90">
                  ₺{product.price.toLocaleString('tr-TR')}
                </Badge>
              </div>
            </div>

            {/* Ürün Bilgileri */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating || 0}</span>
                </div>
                <span className="text-xs text-gray-500">
                  ({(product.review_count || 0).toLocaleString('tr-TR')} yorum)
                </span>
              </div>

              {/* Metrikler */}
              {product.metrics && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <MetricCard
                    icon={ShoppingCart}
                    label="Sepet"
                    value={product.metrics.basketCount.count}
                    change={product.metrics.basketCount.change}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                  />
                  <MetricCard
                    icon={Heart}
                    label="Favori"
                    value={product.metrics.favoriteCount.count}
                    change={product.metrics.favoriteCount.change}
                    color="bg-gradient-to-br from-red-500 to-red-600"
                  />
                  <MetricCard
                    icon={ShoppingCart}
                    label="Sipariş"
                    value={product.metrics.orderCountL3D.count}
                    change={product.metrics.orderCountL3D.change}
                    color="bg-gradient-to-br from-green-500 to-green-600"
                  />
                  <MetricCard
                    icon={Eye}
                    label="Görüntüleme"
                    value={product.metrics.pageViewCount.count}
                    change={product.metrics.pageViewCount.change}
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                  />
                </div>
              )}

              {/* Aksiyon Butonları */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(product.url, '_blank')}
                >
                  Ürünü Gör
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Detaylar
                </Button>
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Son güncelleme: {new Date(product.last_updated).toLocaleString('tr-TR')}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
