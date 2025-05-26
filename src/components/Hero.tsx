
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-neutral-50 to-brand-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
            Yeni: Gelişmiş yorum analizi özelliği
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-6 animate-fade-in">
            Trendyol'daki Rakiplerinizi{' '}
            <span className="text-brand-primary">Otomatik Takip Edin</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Fiyat değişimlerini, ürün puanlarını ve müşteri yorumlarını gerçek zamanlı izleyin. 
            Rekabet avantajı için veri odaklı kararlar alın.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 text-lg font-semibold animate-pulse-glow"
            >
              Ücretsiz Deneyin
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Demo İzleyin
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-primary">500+</span>
              <span>Aktif Satıcı</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-primary">50K+</span>
              <span>Takip Edilen Ürün</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-primary">99.9%</span>
              <span>Uptime</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-16 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
              <div className="bg-neutral-100 px-6 py-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-neutral-500">app.trendradar.com</span>
                </div>
              </div>
              <div className="p-6 h-96 bg-gradient-to-br from-neutral-50 to-brand-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-brand-primary rounded-lg"></div>
                  </div>
                  <p className="text-neutral-600">Dashboard Önizlemesi</p>
                  <p className="text-sm text-neutral-500 mt-2">Gerçek dashboard yakında burada görünecek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
