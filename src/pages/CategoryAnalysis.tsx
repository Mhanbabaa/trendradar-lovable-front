
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CategoryAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kategori Analizi</h1>
          <p className="text-gray-600">Kategori bazında analiz ve karşılaştırmalar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Performansı</CardTitle>
              <CardDescription>Kategorilerdeki ürün performans analizi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Kategori analizi için önce ürün eklemeniz gerekiyor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sıralama Değişiklikleri</CardTitle>
              <CardDescription>Kategori sıralamalarındaki değişimler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz sıralama verisi bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;
