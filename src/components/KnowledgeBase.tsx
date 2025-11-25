import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
}

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([
    {
      id: '1',
      title: 'Как работают промпты',
      content: 'Промпты — это инструкции для ИИ. Чем точнее описание, тем лучше результат. Используйте конкретные детали и примеры.',
      category: 'prompts',
      tags: ['основы', 'промпты'],
      createdAt: '2025-11-20'
    },
    {
      id: '2',
      title: 'Структура React компонентов',
      content: 'Компоненты в React — это переиспользуемые блоки UI. Используйте функциональные компоненты с хуками для управления состоянием.',
      category: 'technical',
      tags: ['react', 'компоненты'],
      createdAt: '2025-11-21'
    },
    {
      id: '3',
      title: 'Цветовая схема проекта',
      content: 'Используем темную тему с акцентами: primary (#0EA5E9), secondary (#8B5CF6), background (#1A1F2C). Все цвета определены в CSS переменных.',
      category: 'design',
      tags: ['дизайн', 'цвета'],
      createdAt: '2025-11-22'
    },
    {
      id: '4',
      title: 'API интеграции',
      content: 'Для внешних API используем fetch с async/await. Всегда обрабатывайте ошибки и добавляйте loading состояния.',
      category: 'technical',
      tags: ['api', 'интеграция'],
      createdAt: '2025-11-23'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'Все документы', icon: 'FileText', color: 'text-foreground' },
    { id: 'prompts', name: 'Промпты', icon: 'MessageSquare', color: 'text-primary' },
    { id: 'technical', name: 'Технические', icon: 'Code', color: 'text-secondary' },
    { id: 'design', name: 'Дизайн', icon: 'Palette', color: 'text-accent' },
    { id: 'general', name: 'Общее', icon: 'BookOpen', color: 'text-muted-foreground' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddDocument = () => {
    if (!newDoc.title || !newDoc.content) return;

    const document: KnowledgeDocument = {
      id: Date.now().toString(),
      title: newDoc.title,
      content: newDoc.content,
      category: newDoc.category,
      tags: newDoc.tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDocuments([document, ...documents]);
    setNewDoc({ title: '', content: '', category: 'general', tags: '' });
    setIsAddingDoc(false);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category || categories[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">База знаний</h2>
          <p className="text-muted-foreground">
            Обучай ИИ специфике твоего проекта
          </p>
        </div>
        
        <Dialog open={isAddingDoc} onOpenChange={setIsAddingDoc}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Добавить документ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Новый документ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  placeholder="Название документа"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select value={newDoc.category} onValueChange={(value) => setNewDoc({ ...newDoc, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Содержание</Label>
                <Textarea
                  id="content"
                  placeholder="Опиши знания для ИИ..."
                  value={newDoc.content}
                  onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="tags">Теги (через запятую)</Label>
                <Input
                  id="tags"
                  placeholder="react, компоненты, ui"
                  value={newDoc.tags}
                  onChange={(e) => setNewDoc({ ...newDoc, tags: e.target.value })}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingDoc(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddDocument}>
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по документам, тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="gap-2">
              <Icon name={category.icon} size={16} className={category.color} />
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4 mt-6">
            {filteredDocuments.length === 0 ? (
              <Card className="p-12 text-center bg-card/30 backdrop-blur border-border/50">
                <Icon name="FileQuestion" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'Документы не найдены' : 'Пока нет документов в этой категории'}
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDocuments.map((doc, idx) => {
                  const categoryInfo = getCategoryIcon(doc.category);
                  return (
                    <Card
                      key={doc.id}
                      className="p-6 bg-card/30 backdrop-blur border-border/50 hover:border-primary/50 transition-all group animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${categoryInfo.color}`}>
                            <Icon name={categoryInfo.icon} size={16} />
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {doc.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{doc.createdAt}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {doc.content}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-border/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Как использовать базу знаний?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Добавляйте документы о специфике вашего проекта</li>
              <li>• ИИ будет учитывать эту информацию при генерации кода</li>
              <li>• Используйте теги для быстрого поиска нужных документов</li>
              <li>• Обновляйте знания по мере развития проекта</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
