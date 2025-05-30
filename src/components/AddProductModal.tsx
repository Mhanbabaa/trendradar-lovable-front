
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTrendyolScraper } from '@/hooks/useTrendyolScraper';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [url, setUrl] = useState('');
  const { addProduct, isLoading } = useTrendyolScraper();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('📝 Form submitted with URL:', url);
    console.log('⏳ Current loading state:', isLoading);
    
    if (!url.trim()) {
      console.log('❌ Empty URL validation failed');
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir Trendyol URL'si girin",
        variant: "destructive",
      });
      return;
    }

    // Trendyol URL formatını kontrol et
    if (!url.includes('trendyol.com') || !url.includes('-p-')) {
      console.log('❌ URL format validation failed:', url);
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir Trendyol ürün URL'si girin",
        variant: "destructive",
      });
      return;
    }

    console.log('✅ URL validation passed, calling addProduct');

    try {
      await addProduct(url);
      console.log('✅ addProduct completed successfully');
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi ve veriler toplanıyor",
      });
      setUrl('');
      onClose();
      onProductAdded();
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Ürün eklenirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Yeni Ürün Ekle</DialogTitle>
          <DialogDescription>
            Takip etmek istediğiniz Trendyol ürününün URL'sini girin
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Trendyol URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://www.trendyol.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ekleniyor...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Ürün Ekle
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
