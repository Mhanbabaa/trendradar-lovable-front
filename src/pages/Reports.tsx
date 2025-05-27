
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
            <p className="text-gray-600">Otomatik raporlar oluşturun ve yönetin</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Rapor Oluştur
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Otomatik Raporlar</CardTitle>
                  <CardDescription>Zamanlanmış otomatik raporlarınız</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-500">Henüz otomatik rapor oluşturulmamış.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Rapor Geçmişi</CardTitle>
                  <CardDescription>Daha önce oluşturulan raporlar</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-teal-600" />
                </div>
                <p className="text-gray-500">Henüz rapor geçmişi bulunmuyor.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
