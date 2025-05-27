
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Layers, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CategoryAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategori Analizi</h1>
          <p className="text-gray-600">Kategori bazında analiz ve karşılaştırmalar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Kategori Performansı</CardTitle>
                  <CardDescription>Kategorilerdeki ürün performans analizi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-500">Kategori analizi için önce ürün eklemeniz gerekiyor.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Sıralama Değişiklikleri</CardTitle>
                  <CardDescription>Kategori sıralamalarındaki değişimler</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-500">Henüz sıralama verisi bulunmuyor.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryAnalysis;
