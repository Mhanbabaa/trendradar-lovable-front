
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ReviewAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Yorum Analizi</h1>
          <p className="text-gray-600">Ürün yorumlarını ve sentiment analizini görün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analizi</CardTitle>
              <CardDescription>Ürün yorumlarının duygu durumu analizi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Sentiment analizi için önce ürün eklemeniz gerekiyor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anahtar Kelimeler</CardTitle>
              <CardDescription>Yorumlarda en çok geçen kelimeler</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Henüz anahtar kelime verisi bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalysis;
