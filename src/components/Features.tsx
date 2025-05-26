
import { Radar, Bell, ChartLine } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Radar,
      title: 'Otomatik Veri Toplama',
      description: 'Rakip ürünlerin fiyatlarını, puanlarını ve yorumlarını otomatik olarak takip edin. 7/24 kesintisiz veri toplama ile hiçbir değişikliği kaçırmayın.',
      color: 'bg-blue-500',
    },
    {
      icon: Bell,
      title: 'Gerçek Zamanlı Uyarılar',
      description: 'Önemli fiyat değişiklikleri ve yorum artışları için anında bildirimler alın. E-posta, SMS ve push bildirimleri ile her zaman güncel kalın.',
      color: 'bg-orange-500',
    },
    {
      icon: ChartLine,
      title: 'Detaylı Analiz',
      description: 'Rakiplerinizin stratejilerini anlamak için kapsamlı raporlar ve grafikler. Trend analizi ile gelecek tahminleri yapın.',
      color: 'bg-green-500',
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Rakip Takibinde Yeni Nesil Çözüm
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            TrendRadar ile Trendyol pazarındaki rakiplerinizi profesyonelce takip edin ve 
            rekabet avantajı kazanın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-neutral-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-neutral-200"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            'Kategori Analizi',
            'Yorum Sentiment Analizi',
            'Fiyat Geçmişi Grafikleri',
            'Özelleştirilebilir Raporlar',
            'API Entegrasyonu',
            'Çoklu Kullanıcı Desteği',
            'Mobil Uygulama',
            '24/7 Teknik Destek'
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg hover:bg-brand-primary/5 transition-colors"
            >
              <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
              <span className="text-neutral-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
