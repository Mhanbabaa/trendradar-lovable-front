
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
            <p className="text-gray-600">Takip ettiğiniz ürünleri yönetin</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ürün Ekle
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Takip Edilen Ürünler</CardTitle>
            <CardDescription>Henüz hiç ürün eklemediniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">İlk ürününüzü ekleyerek başlayın</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                İlk Ürününüzü Ekleyin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;
