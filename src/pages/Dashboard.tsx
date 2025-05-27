
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, TrendingDown, Package, Bell, FileText, Users, Star, Activity } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Toplam Ürün",
      value: "0",
      description: "Takip edilen ürün sayısı",
      icon: Package,
      change: "+0%",
      changeType: "positive" as const,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Aktif Uyarılar",
      value: "0",
      description: "Bekleyen uyarı sayısı",
      icon: Bell,
      change: "+0%",
      changeType: "neutral" as const,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Bu Hafta Raporlar",
      value: "0",
      description: "Oluşturulan rapor sayısı",
      icon: FileText,
      change: "+0%",
      changeType: "positive" as const,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Ortalama Rating",
      value: "0.0",
      description: "Ürün değerlendirmeleri",
      icon: Star,
      change: "0%",
      changeType: "neutral" as const,
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Hoş geldiniz, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                TrendRadar ile rakiplerinizi takip edin ve pazardaki avantajınızı koruyun.
              </p>
            </div>
            <div className="hidden md:block">
              <Activity className="w-20 h-20 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-5`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : stat.changeType === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {stat.changeType === 'positive' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                    {stat.changeType === 'negative' && <TrendingDown className="w-3 h-3 inline mr-1" />}
                    {stat.change}
                  </span>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Son Fiyat Değişiklikleri</CardTitle>
                  <CardDescription>Son 24 saatte güncellenen ürünler</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Henüz takip edilen ürün bulunmuyor.</p>
                <p className="text-sm text-gray-400">İlk ürününüzü ekleyerek başlayın ve fiyat değişimlerini takip edin.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Son Uyarılar</CardTitle>
                  <CardDescription>Son 7 gün içinde tetiklenen uyarılar</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Henüz uyarı bulunmuyor.</p>
                <p className="text-sm text-gray-400">Ürünler için fiyat uyarıları oluşturun ve önemli değişiklikleri kaçırmayın.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">Hızlı İşlemler</CardTitle>
            <CardDescription>TrendRadar'ı kullanmaya başlamak için aşağıdaki adımları takip edin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                <Package className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">1. Ürün Ekle</h3>
                <p className="text-sm text-gray-600">Takip etmek istediğiniz Trendyol ürünlerini ekleyin</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors cursor-pointer">
                <Bell className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">2. Uyarı Oluştur</h3>
                <p className="text-sm text-gray-600">Fiyat değişiklikleri için otomatik uyarılar ayarlayın</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">3. Rapor İncele</h3>
                <p className="text-sm text-gray-600">Detaylı analiz raporlarını inceleyin ve stratejinizi geliştirin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
