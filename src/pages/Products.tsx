
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Products = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ürünler</h1>
            <p className="text-gray-600">Takip ettiğiniz ürünleri yönetin ve analiz edin</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Ürün Ekle
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtrele
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Takip Edilen Ürünler</CardTitle>
                <CardDescription>Henüz hiç ürün eklemediniz</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">İlk ürününüzü ekleyin</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Trendyol'dan takip etmek istediğiniz ürünlerin URL'lerini ekleyerek 
                fiyat değişimlerini ve yorumları analiz etmeye başlayın.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                İlk Ürününüzü Ekleyin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Products;
