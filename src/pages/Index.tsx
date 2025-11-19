import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  type: 'cottage' | 'villa';
  name: string;
  location: string;
  price: number;
  guests: number;
  bedrooms: number;
  area: number;
  image: string;
  features: string[];
  rating: number;
  reviews: number;
}

const properties: Property[] = [
  {
    id: 1,
    type: 'cottage',
    name: 'Fjord View Cottage',
    location: 'Согне-фьорд',
    price: 15000,
    guests: 6,
    bedrooms: 3,
    area: 120,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/82b3f375-cd82-44ee-b2a1-6c51fe1980cf.jpg',
    features: ['Камин', 'Сауна', 'Вид на фьорд', 'Терраса'],
    rating: 4.9,
    reviews: 127
  },
  {
    id: 2,
    type: 'villa',
    name: 'Mountain Luxury Villa',
    location: 'Ставангер',
    price: 35000,
    guests: 10,
    bedrooms: 5,
    area: 250,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/6d9179be-b3fd-4a86-9392-83a407e43714.jpg',
    features: ['Бассейн', 'Сауна', 'Панорамные окна', 'Джакузи', 'Бильярд'],
    rating: 5.0,
    reviews: 89
  },
  {
    id: 3,
    type: 'cottage',
    name: 'Forest Hideaway',
    location: 'Берген',
    price: 12000,
    guests: 4,
    bedrooms: 2,
    area: 90,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/e566c6ec-18cd-4e65-b934-9434bae71174.jpg',
    features: ['Камин', 'Лес рядом', 'Барбекю'],
    rating: 4.8,
    reviews: 94
  },
  {
    id: 4,
    type: 'villa',
    name: 'Seaside Modern Villa',
    location: 'Олесунн',
    price: 28000,
    guests: 8,
    bedrooms: 4,
    area: 200,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/82b3f375-cd82-44ee-b2a1-6c51fe1980cf.jpg',
    features: ['Вид на море', 'Сауна', 'Терраса', 'Кухня шеф-повара'],
    rating: 4.9,
    reviews: 73
  },
  {
    id: 5,
    type: 'cottage',
    name: 'Northern Lights Cabin',
    location: 'Тромсё',
    price: 18000,
    guests: 5,
    bedrooms: 2,
    area: 100,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/6d9179be-b3fd-4a86-9392-83a407e43714.jpg',
    features: ['Северное сияние', 'Камин', 'Уединение', 'Собачьи упряжки'],
    rating: 5.0,
    reviews: 156
  },
  {
    id: 6,
    type: 'villa',
    name: 'Royal Fjord Estate',
    location: 'Гейрангер-фьорд',
    price: 45000,
    guests: 12,
    bedrooms: 6,
    area: 320,
    image: 'https://cdn.poehali.dev/projects/43a82843-c16a-49a3-beec-21876b3121b3/files/e566c6ec-18cd-4e65-b934-9434bae71174.jpg',
    features: ['Частный пляж', 'Спа-центр', 'Винный погреб', 'Кинотеатр', 'Тренажерный зал'],
    rating: 5.0,
    reviews: 52
  }
];

const Index = () => {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [propertyType, setPropertyType] = useState<'all' | 'cottage' | 'villa'>('all');

  const togglePropertySelection = (id: number) => {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(selectedProperties.filter(propId => propId !== id));
    } else if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, id]);
    }
  };

  const filteredProperties = propertyType === 'all' 
    ? properties 
    : properties.filter(p => p.type === propertyType);

  const comparisonProperties = properties.filter(p => selectedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Home" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">NordicStay</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#norway" className="hover:text-primary transition-colors">О Норвегии</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button className="hidden md:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${properties[0].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Аренда в Норвегии</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Коттеджи и виллы среди фьордов и гор. Незабываемый отдых в самом сердце скандинавской природы
          </p>
          <Button size="lg" className="text-lg px-8">
            Смотреть объекты
            <Icon name="ChevronDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">Каталог объектов</h3>
              <p className="text-muted-foreground">Выберите до 3 объектов для сравнения</p>
            </div>
            <Tabs value={propertyType} onValueChange={(v) => setPropertyType(v as any)} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="cottage">Коттеджи</TabsTrigger>
                <TabsTrigger value="villa">Виллы</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {selectedProperties.length > 0 && (
            <div className="mb-8 p-4 bg-primary/10 rounded-lg flex items-center justify-between animate-scale-in">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={20} className="text-primary" />
                <span className="font-medium">Выбрано: {selectedProperties.length} из 3</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={selectedProperties.length < 2}>
                    <Icon name="GitCompare" size={16} className="mr-2" />
                    Сравнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Сравнение объектов</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {comparisonProperties.map((property) => (
                      <div key={property.id} className="space-y-3">
                        <img 
                          src={property.image} 
                          alt={property.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <h4 className="font-semibold">{property.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Цена/ночь:</span>
                            <span className="font-medium">{property.price.toLocaleString()} ₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Гостей:</span>
                            <span>{property.guests}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Спален:</span>
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Площадь:</span>
                            <span>{property.area} м²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Рейтинг:</span>
                            <span>{property.rating} ⭐</span>
                          </div>
                          <div className="pt-2 border-t">
                            <span className="text-muted-foreground text-xs">Удобства:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {property.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card 
                key={property.id} 
                className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                  selectedProperties.includes(property.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => togglePropertySelection(property.id)}
              >
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4">
                    {property.type === 'cottage' ? 'Коттедж' : 'Вилла'}
                  </Badge>
                  {selectedProperties.includes(property.id) && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2">
                      <Icon name="Check" size={20} />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xl font-semibold">{property.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Icon name="MapPin" size={16} />
                    {property.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      <span>{property.guests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Bed" size={16} />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Maximize" size={16} />
                      <span>{property.area} м²</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-sm">
                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground">({property.reviews})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {property.price.toLocaleString()} ₽
                      </div>
                      <div className="text-xs text-muted-foreground">за ночь</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="norway" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">О Норвегии</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Icon name="Mountain" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Фьорды и горы</h4>
              <p className="text-muted-foreground">
                Уникальные природные ландшафты с величественными фьордами и заснеженными вершинами
              </p>
            </Card>
            <Card className="p-6">
              <Icon name="Sparkles" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Северное сияние</h4>
              <p className="text-muted-foreground">
                Незабываемое зрелище полярного сияния в зимние месяцы на севере страны
              </p>
            </Card>
            <Card className="p-6">
              <Icon name="Waves" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Белые ночи</h4>
              <p className="text-muted-foreground">
                Полуночное солнце летом — уникальное явление за полярным кругом
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Отзывы гостей</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Александра М.',
                rating: 5,
                text: 'Провели две недели в коттедже Fjord View. Невероятные виды, уютная атмосфера. Всё было идеально!',
                property: 'Fjord View Cottage'
              },
              {
                name: 'Дмитрий К.',
                rating: 5,
                text: 'Вилла превзошла все ожидания. Панорамные окна, современный дизайн, полное уединение.',
                property: 'Mountain Luxury Villa'
              },
              {
                name: 'Елена В.',
                rating: 5,
                text: 'Удалось увидеть северное сияние! Коттедж очень уютный, хозяева организовали всё на высшем уровне.',
                property: 'Northern Lights Cabin'
              }
            ].map((review, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.text}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{review.name}</span>
                  <Badge variant="outline">{review.property}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-3xl font-bold mb-8 text-center">Вопросы и ответы</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-background rounded-lg px-6">
              <AccordionTrigger>Как забронировать объект?</AccordionTrigger>
              <AccordionContent>
                Выберите понравившийся объект, укажите даты и количество гостей, заполните форму бронирования. 
                Мы свяжемся с вами в течение 24 часов для подтверждения.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-background rounded-lg px-6">
              <AccordionTrigger>Какие документы нужны для въезда?</AccordionTrigger>
              <AccordionContent>
                Для граждан РФ требуется шенгенская виза. Мы поможем с оформлением визовой поддержки 
                и предоставим все необходимые документы.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-background rounded-lg px-6">
              <AccordionTrigger>Включена ли уборка в стоимость?</AccordionTrigger>
              <AccordionContent>
                Итоговая уборка включена в стоимость аренды. Промежуточная уборка при аренде от 7 дней 
                оплачивается дополнительно.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-background rounded-lg px-6">
              <AccordionTrigger>Можно ли приехать с домашними животными?</AccordionTrigger>
              <AccordionContent>
                В некоторых объектах разрешено размещение с животными за дополнительную плату. 
                Уточняйте при бронировании.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Готовы забронировать?</h3>
              <p className="text-muted-foreground mb-8">
                Оставьте заявку, и мы подберем идеальный вариант для вашего отдыха в Норвегии
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Оставить заявку
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Заявка на бронирование</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Телефон</label>
                      <Input placeholder="+7 (999) 123-45-67" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пожелания</label>
                      <Textarea 
                        placeholder="Расскажите о ваших предпочтениях: даты, количество гостей, особые пожелания..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Отправить заявку
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
      </section>

      <footer id="contacts" className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={32} />
                <h4 className="text-xl font-bold">NordicStay</h4>
              </div>
              <p className="opacity-90">
                Аренда коттеджей и вилл в Норвегии
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 opacity-90">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@nordicstay.ru</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Разделы</h5>
              <div className="space-y-2 opacity-90">
                <div><a href="#catalog" className="hover:underline">Каталог</a></div>
                <div><a href="#norway" className="hover:underline">О Норвегии</a></div>
                <div><a href="#reviews" className="hover:underline">Отзывы</a></div>
                <div><a href="#faq" className="hover:underline">FAQ</a></div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Социальные сети</h5>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-75">
            <p>© 2024 NordicStay. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
