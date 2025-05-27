
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600">Hesap ve uygulama ayarlarınızı yönetin</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hesap Bilgileri</CardTitle>
              <CardDescription>Kişisel bilgilerinizi görüntüleyin ve düzenleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">E-posta</label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Ad Soyad</label>
                  <p className="text-gray-900">{user?.user_metadata?.full_name || "Belirtilmemiş"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Şirket</label>
                  <p className="text-gray-900">{user?.user_metadata?.company_name || "Belirtilmemiş"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
              <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Bildirim ayarları yakında eklenecek.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abonelik</CardTitle>
              <CardDescription>Mevcut abonelik planınız ve fatura bilgileri</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Abonelik bilgileri yakında eklenecek.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hesap İşlemleri</CardTitle>
              <CardDescription>Hesabınızla ilgili işlemler</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleSignOut}>
                Çıkış Yap
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
