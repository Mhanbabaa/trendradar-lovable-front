
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bell, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Uyarılar</h1>
            <p className="text-gray-600">Fiyat ve stok uyarılarınızı yönetin</p>
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Uyarı Oluştur
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Aktif Uyarılar</CardTitle>
                  <CardDescription>Şu anda aktif olan uyarılarınız</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-500">Henüz aktif uyarı bulunmuyor.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Uyarı Geçmişi</CardTitle>
                  <CardDescription>Daha önce tetiklenen uyarılar</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-500">Henüz uyarı geçmişi bulunmuyor.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
