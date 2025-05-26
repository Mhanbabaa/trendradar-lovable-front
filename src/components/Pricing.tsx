
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Başlangıç',
      price: 199,
      period: '/ay',
      description: 'Küçük işletmeler için ideal',
      features: [
        '10 rakip ürün takibi',
        'Günlük veri güncelleme',
        'Temel raporlama',
        'E-posta bildirimleri',
        '1 aylık veri arşivi',
        'E-posta desteği'
      ],
      cta: 'Ücretsiz Deneyin',
      popular: false
    },
    {
      name: 'Profesyonel',
      price: 399,
      period: '/ay',
      description: 'Büyüyen işletmeler için',
      features: [
        '50 rakip ürün takibi',
        'Günde 3 kez veri güncelleme',
        'Gelişmiş raporlama ve analiz',
        'E-posta ve mobil bildirimler',
        '3 aylık veri arşivi',
        'Öncelikli e-posta desteği',
        'Yorum sentiment analizi',
        'Kategori analizi'
      ],
      cta: 'Ücretsiz Deneyin',
      popular: true
    },
    {
      name: 'İşletme',
      price: 999,
      period: '/ay',
      description: 'Kurumsal işletmeler için',
      features: [
        '200 rakip ürün takibi',
        'Saatlik veri güncelleme',
        'Tam analitik ve raporlama',
        'Öncelikli bildirimler',
        '12 aylık veri arşivi',
        'Özel destek temsilcisi',
        'Çoklu kullanıcı desteği (5 kullanıcı)',
        'API erişimi',
        'Özel entegrasyonlar'
      ],
      cta: 'Ücretsiz Deneyin',
      popular: false
    },
    {
      name: 'Kurumsal',
      price: null,
      period: '',
      description: 'Büyük organizasyonlar için',
      features: [
        'Sınırsız ürün takibi',
        'Gerçek zamanlı veri güncelleme',
        'Özel analiz modülleri',
        'Tam API erişimi',
        'Sınırsız veri arşivi',
        'Öncelikli destek ve danışmanlık',
        'Sınırsız kullanıcı',
        'Özel SLA',
        'On-premise kurulum seçeneği'
      ],
      cta: 'Bizimle İletişime Geçin',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Her İşletmeye Uygun Paketler
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            İhtiyaçlarınıza uygun paketi seçin. Tüm paketlerde 14 gün ücretsiz deneme hakkı.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-brand-primary bg-gradient-to-b from-brand-primary/5 to-white scale-105' 
                  : 'border-neutral-200 bg-white hover:border-brand-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    En Popüler
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  {plan.price ? (
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-neutral-800">
                        ₺{plan.price}
                      </span>
                      <span className="text-neutral-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-neutral-800">
                      Özel Fiyatlandırma
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular
                    ? 'bg-brand-primary hover:bg-brand-primary/90 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12 p-6 bg-neutral-50 rounded-xl max-w-2xl mx-auto">
          <h4 className="font-semibold text-neutral-800 mb-2">
            💰 Para İade Garantisi
          </h4>
          <p className="text-neutral-600 text-sm">
            İlk 30 gün içinde memnun kalmazsanız, paranızın tamamını iade ediyoruz. 
            Sorulsuz sualsiz, hızlı iade süreci.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
