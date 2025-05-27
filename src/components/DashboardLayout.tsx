
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings, 
  LogOut,
  Radar,
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Ürünler', href: '/products', icon: Package },
    { name: 'Fiyat Takibi', href: '/price-tracking', icon: TrendingUp },
    { name: 'Yorum Analizi', href: '/review-analysis', icon: MessageSquare },
    { name: 'Kategori Analizi', href: '/category-analysis', icon: BarChart3 },
    { name: 'Raporlar', href: '/reports', icon: FileText },
    { name: 'Uyarılar', href: '/alerts', icon: Bell },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Radar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-white">TrendRadar</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.user_metadata?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500">Premium Kullanıcı</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-6 bg-white shadow-sm border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Bell className="w-4 h-4 mr-2" />
              Bildirimler
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
