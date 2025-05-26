
import { Radar, Target, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Target,
      title: 'Rakipleri Ekleyin',
      description: 'Takip etmek istediğiniz Trendyol ürünlerini veya kategorileri seçin.',
      color: 'bg-blue-500',
    },
    {
      icon: Radar,
      title: 'Otomatik Takip',
      description: 'TrendRadar, rakiplerinizi 7/24 takip eder ve verileri toplar.',
      color: 'bg-orange-500',
    },
    {
      icon: BarChart3,
      title: 'Analiz ve Aksiyon',
      description: 'Raporları inceleyin, uyarıları alın ve rekabetçi aksiyonlar alın.',
      color: 'bg-green-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            TrendRadar ile rakip takibi yapmak çok kolay. Sadece 3 adımda başlayın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                {step.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
