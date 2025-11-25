import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Привет! Я помогу создать твой сайт. Опиши, что тебе нужно.' }
  ]);
  const [input, setInput] = useState('');

  const examplePrompts = [
    'Создай лендинг для IT-компании',
    'Сайт-портфолио дизайнера',
    'Интернет-магазин одежды',
    'Блог о технологиях'
  ];

  const features = [
    {
      icon: 'Sparkles',
      title: 'ИИ-генерация',
      description: 'Создавай сайты из простого описания на русском языке'
    },
    {
      icon: 'Code',
      title: 'Чистый код',
      description: 'React, TypeScript, Tailwind — современный стек технологий'
    },
    {
      icon: 'Zap',
      title: 'Мгновенный результат',
      description: 'От идеи до готового сайта за минуты, а не дни'
    },
    {
      icon: 'Palette',
      title: 'Гибкая настройка',
      description: 'Изменяй дизайн, структуру и функционал в режиме диалога'
    },
    {
      icon: 'Globe',
      title: 'Публикация в один клик',
      description: 'Быстрый деплой на собственном домене или поддомене'
    },
    {
      icon: 'Plug',
      title: 'API-интеграции',
      description: 'Подключай внешние сервисы и расширяй возможности'
    }
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'assistant', content: 'Отличная идея! Начинаю создавать твой сайт...' }
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      
      <div className="relative">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Site Builder
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Возможности
              </a>
              <Button variant="outline" size="sm">
                <Icon name="Github" size={16} className="mr-2" />
                GitHub
              </Button>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                <span className="text-sm text-muted-foreground">Создавай сайты через диалог с ИИ</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Твой сайт готов
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  за 5 минут
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Просто опиши, что нужно — и получи готовый сайт на современном стеке. 
                Без программирования, быстрее конструкторов в 30 раз.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="MessageSquare" size={20} className="text-primary" />
                  <h3 className="font-semibold">Попробуй прямо сейчас</h3>
                </div>
                
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Опиши свой сайт..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-background border-border"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </Card>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">Примеры запросов:</p>
                {examplePrompts.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start text-left hover:bg-muted/50 hover:border-primary/50 transition-all"
                    onClick={() => setInput(prompt)}
                  >
                    <Icon name="Lightbulb" size={16} className="mr-2 text-secondary" />
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Возможности платформы
              </h2>
              <p className="text-xl text-muted-foreground">
                Всё необходимое для создания современных веб-приложений
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-card/30 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:scale-105 group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готов создать свой сайт?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Начни прямо сейчас — это бесплатно и займёт пару минут
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать создание
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="PlayCircle" size={20} className="mr-2" />
                Смотреть демо
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/50 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={14} className="text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  © 2025 AI Site Builder. Создавай будущее.
                </span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Документация
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Поддержка
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
