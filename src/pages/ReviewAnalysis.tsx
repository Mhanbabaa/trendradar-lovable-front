
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const ReviewAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yorum Analizi</h1>
          <p className="text-gray-600">Ürün yorumlarını ve sentiment analizini görün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Sentiment Analizi</CardTitle>
                  <CardDescription>Ürün yorumlarının duygu durumu analizi</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-500">Sentiment analizi için önce ürün eklemeniz gerekiyor.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900">Anahtar Kelimeler</CardTitle>
                  <CardDescription>Yorumlarda en çok geçen kelimeler</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-gray-500">Henüz anahtar kelime verisi bulunmuyor.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReviewAnalysis;
