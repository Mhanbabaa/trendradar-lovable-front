
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const PriceTracking = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fiyat Takibi</h1>
          <p className="text-gray-600">Ürün fiyat değişimlerini izleyin ve trendleri analiz edin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Bugün Değişen</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500">Fiyat değişimi olan ürün</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ortalama Değişim</CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0%</div>
              <p className="text-xs text-gray-500">Son 7 gün</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">En Yüksek Düşüş</CardTitle>
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <TrendingDown className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">0%</div>
              <p className="text-xs text-gray-500">Bu hafta</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Fiyat Grafikleri</CardTitle>
                  <CardDescription>Ürünlerinizin fiyat değişim grafikleri</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-500 mb-2">Fiyat takibi için önce ürün eklemeniz gerekiyor.</p>
                <p className="text-sm text-gray-400">Ürün ekledikten sonra fiyat grafikleri burada görünecek.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">En Çok Değişen Fiyatlar</CardTitle>
                  <CardDescription>Son 24 saatte en çok değişen ürün fiyatları</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-500 mb-2">Henüz fiyat değişikliği verisi bulunmuyor.</p>
                <p className="text-sm text-gray-400">Ürünler eklendikten sonra fiyat değişimleri burada listelenecek.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PriceTracking;
