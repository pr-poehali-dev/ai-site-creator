import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import SitePreview from './SitePreview';

interface GeneratedSite {
  id: string;
  prompt: string;
  code: string;
  language: string;
  timestamp: string;
}

const AICodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSites, setGeneratedSites] = useState<GeneratedSite[]>([]);
  const [previewSite, setPreviewSite] = useState<GeneratedSite | null>(null);

  const languages = [
    { value: 'html', label: 'HTML/CSS/JS', icon: 'Globe' },
    { value: 'react', label: 'React', icon: 'Code' },
    { value: 'python', label: 'Python', icon: 'Code' },
    { value: 'javascript', label: 'JavaScript', icon: 'Code' }
  ];

  const examplePrompts = [
    'Создай простой калькулятор с красивым дизайном',
    'Сделай landing page для кофейни',
    'Интерактивная галерея изображений',
    'Форма регистрации с валидацией'
  ];

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch('https://functions.poehali.dev/f1dd4b3d-617a-46cc-b928-62ba0ec50aba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          language: language
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate code');
      }

      const data = await response.json();
      const generatedCode = data.code;

      const newSite: GeneratedSite = {
        id: Date.now().toString(),
        prompt: prompt,
        code: generatedCode,
        language: language,
        timestamp: new Date().toLocaleString('ru-RU')
      };

      setGeneratedSites([newSite, ...generatedSites]);
      setPrompt('');
    } catch (error) {
      console.error('Error generating code:', error);
      alert(error instanceof Error ? error.message : 'Не удалось сгенерировать код. Проверьте, что добавлен OPENAI_API_KEY');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = (site: GeneratedSite) => {
    setPreviewSite(site);
  };

  const handleDownload = (site: GeneratedSite) => {
    const extension = site.language === 'html' ? 'html' : site.language === 'python' ? 'py' : 'js';
    const blob = new Blob([site.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-site-${site.id}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">ИИ-генератор кода</h2>
        <p className="text-muted-foreground">
          Опиши сайт — получи готовый код для запуска
        </p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Язык программирования
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <Icon name={lang.icon} size={16} />
                      {lang.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Опиши, что создать
            </label>
            <Textarea
              placeholder="Например: Создай красивую страницу с калькулятором"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(example)}
                className="text-xs"
              >
                {example}
              </Button>
            ))}
          </div>

          <Button
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin" />
                Генерирую код...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={20} />
                Сгенерировать сайт
              </>
            )}
          </Button>
        </div>
      </Card>

      {generatedSites.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Созданные сайты</h3>
          
          <div className="space-y-3">
            {generatedSites.map((site, idx) => (
              <Card
                key={site.id}
                className="p-4 bg-card/30 backdrop-blur border-border/50 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {languages.find(l => l.value === site.language)?.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {site.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {site.prompt}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(site)}
                    >
                      <Icon name="Eye" size={16} className="mr-2" />
                      Открыть сайт
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(site)}
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {previewSite && (
        <SitePreview
          isOpen={!!previewSite}
          onClose={() => setPreviewSite(null)}
          code={previewSite.code}
          language={previewSite.language}
        />
      )}
    </div>
  );
};

export default AICodeGenerator;