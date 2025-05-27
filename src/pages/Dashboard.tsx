
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Hoş geldiniz, {user?.user_metadata?.full_name || user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Takip edilen ürün sayısı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Aktif Uyarılar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Bekleyen uyarı sayısı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Bu Hafta Raporlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Oluşturulan rapor sayısı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Ortalama Fiyat Değişimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-%</div>
              <p className="text-xs text-muted-foreground">Son 7 gün</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Son Fiyat Değişiklikleri</CardTitle>
              <CardDescription>Son 24 saatte güncellenen ürünler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz takip edilen ürün bulunmuyor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yakın Zamanda Tetiklenen Uyarılar</CardTitle>
              <CardDescription>Son 7 gün içinde tetiklenen uyarılar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz uyarı bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
