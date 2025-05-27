
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
            <p className="text-gray-600">Otomatik raporlar oluşturun ve yönetin</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Rapor Oluştur
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Otomatik Raporlar</CardTitle>
              <CardDescription>Zamanlanmış otomatik raporlarınız</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz otomatik rapor oluşturulmamış.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rapor Geçmişi</CardTitle>
              <CardDescription>Daha önce oluşturulan raporlar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz rapor geçmişi bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
