
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      position: 'E-ticaret Müdürü',
      company: 'TechStore',
      avatar: '/placeholder-avatar-1.jpg',
      rating: 5,
      comment: 'TrendRadar sayesinde rakiplerimizin fiyat stratejilerini anlayıp, satışlarımızı %35 artırdık. Gerçekten işe yarayan bir platform.'
    },
    {
      name: 'Zeynep Kaya',
      position: 'Pazarlama Sorumlusu',
      company: 'HomeDecor',
      avatar: '/placeholder-avatar-2.jpg',
      rating: 5,
      comment: 'Yorum analizleri sayesinde müşteri memnuniyetimizi büyük ölçüde iyileştirdik. Ürün geliştirme sürecimiz artık çok daha veri odaklı.'
    },
    {
      name: 'Mehmet Özkan',
      position: 'Kurucu',
      company: 'SportEquip',
      avatar: '/placeholder-avatar-3.jpg',
      rating: 5,
      comment: 'Platform çok kullanıcı dostu ve veri analizi profesyonel seviyede. Destek ekibi de çok hızlı ve çözüm odaklı.'
    },
    {
      name: 'Ayşe Demir',
      position: 'Satış Müdürü',
      company: 'FashionHub',
      avatar: '/placeholder-avatar-4.jpg',
      rating: 5,
      comment: 'Gerçek zamanlı uyarılar sayesinde fiyat değişikliklerine hemen tepki verebiliyoruz. Rekabet avantajımız çok arttı.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Binlerce satıcı TrendRadar ile rekabet avantajı kazanıyor. 
            Onların deneyimlerini keşfedin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-neutral-600 text-sm">
                    {testimonial.position} • {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-brand-primary/20 absolute -top-2 -left-1" />
                <p className="text-neutral-700 leading-relaxed pl-6">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-16 border-t border-neutral-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-2">4.9/5</div>
            <div className="text-neutral-600 text-sm">Müşteri Memnuniyeti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-2">500+</div>
            <div className="text-neutral-600 text-sm">Aktif Kullanıcı</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-2">50K+</div>
            <div className="text-neutral-600 text-sm">Takip Edilen Ürün</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-2">%35</div>
            <div className="text-neutral-600 text-sm">Ortalama Satış Artışı</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
