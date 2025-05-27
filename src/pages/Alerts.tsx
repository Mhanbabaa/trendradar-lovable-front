
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Alerts = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Uyarılar</h1>
            <p className="text-gray-600">Fiyat ve stok uyarılarınızı yönetin</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Uyarı Oluştur
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktif Uyarılar</CardTitle>
              <CardDescription>Şu anda aktif olan uyarılarınız</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz aktif uyarı bulunmuyor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uyarı Geçmişi</CardTitle>
              <CardDescription>Daha önce tetiklenen uyarılar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz uyarı geçmişi bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
