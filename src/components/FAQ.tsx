
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "TrendRadar nasıl çalışır?",
      answer: "TrendRadar, Trendyol'daki rakip ürünlerinizi otomatik olarak tarar ve fiyat, puan, yorum gibi kritik verileri toplar. Bu veriler gerçek zamanlı olarak analiz edilir ve size anlamlı raporlar halinde sunulur."
    },
    {
      question: "Hangi Trendyol kategorilerini destekliyorsunuz?",
      answer: "TrendRadar, Trendyol'daki tüm ürün kategorilerini destekler. Elektronik, moda, ev & yaşam, spor, kitap ve daha birçok kategoride ürün takibi yapabilirsiniz."
    },
    {
      question: "Veriler ne sıklıkla güncellenir?",
      answer: "Güncelleme sıklığı seçtiğiniz pakete göre değişir. Başlangıç paketinde günlük, Profesyonel'de günde 3 kez, İşletme'de saatlik, Kurumsal'da ise gerçek zamanlı güncelleme yapılır."
    },
    {
      question: "Ücretsiz deneme süresi ne kadar?",
      answer: "Tüm paketler için 14 gün ücretsiz deneme hakkı sunuyoruz. Deneme süresinde tüm özellikler sınırsız olarak kullanılabilir ve kredi kartı bilgisi gerekmez."
    },
    {
      question: "Aboneliğimi istediğim zaman iptal edebilir miyim?",
      answer: "Evet, aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi anında geçerli olur ve kalan süre için para iadesi alabilirsiniz."
    },
    {
      question: "API desteği var mı?",
      answer: "Evet, İşletme ve Kurumsal paketlerde RESTful API erişimi bulunur. API ile verilerinizi kendi sistemlerinizle entegre edebilir ve özel analiz araçları geliştirebilirsiniz."
    },
    {
      question: "Verilerimin güvenliği nasıl sağlanıyor?",
      answer: "Tüm verileriniz SSL şifreleme ile korunur ve güvenli sunucularda saklanır. KVKK uyumlu olarak çalışır ve verilerinizi üçüncü taraflarla paylaşmayız."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Sık Sorulan Sorular
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            TrendRadar hakkında merak ettiğiniz her şey. Daha fazla soru için 
            destek ekibimizle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-neutral-50 border border-neutral-200 rounded-xl px-6 hover:bg-neutral-100/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-neutral-800 hover:text-brand-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-neutral-800 mb-3">
            Sorunuz mu var?
          </h3>
          <p className="text-neutral-600 mb-6">
            Uzman ekibimiz size yardımcı olmaya hazır. 7/24 destek alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Canlı Destek
            </button>
            <button className="border border-neutral-300 hover:border-brand-primary text-neutral-700 hover:text-brand-primary px-6 py-3 rounded-lg font-medium transition-colors">
              E-posta Gönder
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
