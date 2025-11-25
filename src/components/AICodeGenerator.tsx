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

    await new Promise(resolve => setTimeout(resolve, 2000));

    let generatedCode = '';
    
    if (language === 'html') {
      generatedCode = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сгенерировано ИИ</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 32px;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        
        .prompt-display {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }
        
        .prompt-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .prompt-text {
            color: #333;
            font-size: 14px;
        }
        
        .content {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
        }
        
        .icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 20px;
        }
        
        .feature-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            transition: transform 0.2s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .feature-title {
            font-size: 14px;
            color: #333;
            font-weight: 600;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>✨ Сайт готов!</h1>
        <p class="subtitle">Создано искусственным интеллектом</p>
        
        <div class="prompt-display">
            <div class="prompt-label">Ваш запрос:</div>
            <div class="prompt-text">${prompt}</div>
        </div>
        
        <div class="content">
            <div class="icon">🚀</div>
            <h2 style="color: #333; margin-bottom: 10px;">Отличная работа!</h2>
            <p style="color: #666; margin-bottom: 20px;">
                Ваш сайт успешно сгенерирован и готов к использованию
            </p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">Быстро</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <div class="feature-title">Красиво</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">Адаптивно</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">✨</div>
                    <div class="feature-title">Современно</div>
                </div>
            </div>
            
            <button class="btn" onclick="alert('Это демо-версия! 🎉')">
                Начать работу
            </button>
        </div>
        
        <div class="footer">
            Сгенерировано AI Site Builder
        </div>
    </div>
    
    <script>
        console.log('Сайт успешно загружен! 🚀');
        console.log('Промпт:', '${prompt}');
    </script>
</body>
</html>`;
    } else if (language === 'react') {
      generatedCode = `// React компонент
import React, { useState } from 'react';

const GeneratedSite = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px'
      }}>
        <h1>✨ React Компонент</h1>
        <p>Промпт: ${prompt}</p>
      </div>
    </div>
  );
};

export default GeneratedSite;`;
    } else {
      generatedCode = `# Сгенерированный код на ${language}
# Промпт: ${prompt}

def main():
    print("Привет из сгенерированного кода!")
    print("Промпт: ${prompt}")

if __name__ == "__main__":
    main()`;
    }

    const newSite: GeneratedSite = {
      id: Date.now().toString(),
      prompt: prompt,
      code: generatedCode,
      language: language,
      timestamp: new Date().toLocaleString('ru-RU')
    };

    setGeneratedSites([newSite, ...generatedSites]);
    setIsGenerating(false);
    setPrompt('');
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
