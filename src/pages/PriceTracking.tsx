
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PriceTracking = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fiyat Takibi</h1>
          <p className="text-gray-600">Ürün fiyat değişimlerini izleyin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fiyat Grafikleri</CardTitle>
              <CardDescription>Ürünlerinizin fiyat değişim grafikleri</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Fiyat takibi için önce ürün eklemeniz gerekiyor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>En Çok Değişen Fiyatlar</CardTitle>
              <CardDescription>Son 24 saatte en çok değişen ürün fiyatları</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz fiyat değişikliği verisi bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PriceTracking;
