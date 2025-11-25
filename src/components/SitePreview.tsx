import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface SitePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
}

const SitePreview = ({ isOpen, onClose, code, language }: SitePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderPreview = () => {
    if (language === 'html' || language === 'web') {
      return (
        <iframe
          srcDoc={code}
          className="w-full h-full border-0 bg-white"
          title="Site Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20">
        <div className="text-center p-8">
          <Icon name="Code" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            Предпросмотр доступен только для HTML/CSS/JS кода
          </p>
          <div className="text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg max-w-md">
            <p className="mb-2">Язык: {language}</p>
            <p>Для просмотра конвертируйте код в HTML формат</p>
          </div>
        </div>
      </div>
    );
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] h-[95vh]' : 'max-w-5xl h-[80vh]'} p-0 gap-0`}>
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Globe" size={20} className="text-primary" />
              Предпросмотр сайта
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                disabled={language !== 'html' && language !== 'web'}
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Открыть в новой вкладке
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SitePreview;
