
import { ArrowDown, Plus, BarChart3, Target } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Plus,
      title: 'Rakipleri Ekleyin',
      description: 'Takip etmek istediğiniz Trendyol ürünlerini veya kategorileri seçin. URL ile tek tek ekleyebilir veya kategori bazında toplu ekleme yapabilirsiniz.',
      image: '/placeholder-add-products.jpg'
    },
    {
      number: 2,
      icon: Radar,
      title: 'Otomatik Takip',
      description: 'TrendRadar, rakiplerinizi 7/24 takip eder ve verileri toplar. Fiyat değişimleri, yorum analizi ve puanlama güncellemelerini otomatik olarak kaydeder.',
      image: '/placeholder-tracking.jpg'
    },
    {
      number: 3,
      icon: BarChart3,
      title: 'Analiz ve Aksiyon',
      description: 'Raporları inceleyin, uyarıları alın ve rekabetçi aksiyonlar alın. Detaylı grafikler ve analizlerle stratejik kararlar verin.',
      image: '/placeholder-analytics.jpg'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            3 basit adımda rakip takibini başlatın ve rekabet avantajı kazanmaya hemen başlayın.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-brand-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-800">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>

                  {step.number < steps.length && (
                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 text-brand-primary font-medium">
                        Sonraki Adım
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Placeholder */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
                      <div className="aspect-video bg-gradient-to-br from-neutral-100 to-brand-primary/10 flex items-center justify-center">
                        <div className="text-center">
                          <step.icon className="w-12 h-12 text-brand-primary mx-auto mb-3" />
                          <p className="text-neutral-600 font-medium">{step.title}</p>
                          <p className="text-sm text-neutral-500 mt-1">Ekran Görüntüsü</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-brand-primary to-brand-primary/30"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
            Hemen Başlayın
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
