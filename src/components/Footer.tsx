
import { Radar, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Ürün': [
      'Özellikler',
      'Fiyatlandırma',
      'API Dokümantasyonu',
      'Entegrasyonlar',
      'Güvenlik'
    ],
    'Şirket': [
      'Hakkımızda',
      'Blog',
      'Kariyer',
      'Basın Kiti',
      'İletişim'
    ],
    'Destek': [
      'Yardım Merkezi',
      'Topluluk',
      'Durum Sayfası',
      'Geri Bildirim',
      'İletişim'
    ],
    'Yasal': [
      'Gizlilik Politikası',
      'Kullanım Şartları',
      'Çerez Politikası',
      'KVKK',
      'İade Politikası'
    ]
  };

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <Radar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TrendRadar</span>
            </div>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Trendyol satıcıları için geliştirilmiş en kapsamlı rakip takip ve 
              analiz platformu. Rekabet avantajı kazanmak hiç bu kadar kolay olmamıştı.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-4 h-4" />
                <span>info@trendradar.com</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-4 h-4" />
                <span>+90 212 xxx xx xx</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-4 h-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-white">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-neutral-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold mb-2">Güncellemelerden Haberdar Olun</h4>
              <p className="text-neutral-300">
                Yeni özellikler ve e-ticaret trendleri hakkında bilgi alın.
              </p>
            </div>
            
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-brand-primary"
              />
              <button className="bg-brand-primary hover:bg-brand-primary/90 px-6 py-3 rounded-lg font-medium transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">
            © 2024 TrendRadar. Tüm hakları saklıdır.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
