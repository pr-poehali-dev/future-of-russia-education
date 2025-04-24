
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TrackCard from "@/components/TrackCard";
import MarqueeText from "@/components/MarqueeText";
import QuoteDisplay from "@/components/QuoteDisplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const tracks = [
    { 
      title: "Творчество", 
      description: "Развитие творческих способностей и самовыражения через рисование, лепку, аппликацию и другие виды ручного творчества. Каждый ребенок может раскрыть свой потенциал в искусстве.",
      icon: "🎨"
    },
    { 
      title: "Познание", 
      description: "Изучение окружающего мира, природы и основ научных знаний в игровой форме. Формирование любознательности, развитие памяти и мышления через интересные эксперименты.",
      icon: "🔍"
    },
    { 
      title: "Спорт", 
      description: "Физическое развитие, командные игры и основы здорового образа жизни. Дети учатся правильно выполнять упражнения, развивают координацию движений и выносливость.",
      icon: "⚽"
    },
    { 
      title: "Технологии", 
      description: "Знакомство с современными технологиями, робототехникой и конструированием. Развитие инженерного мышления и технических навыков через увлекательные проекты.",
      icon: "🤖"
    },
    { 
      title: "Этика", 
      description: "Обучение основам этикета, культуры поведения и взаимоотношений со сверстниками. Формирование моральных ценностей и норм поведения через игры и беседы.",
      icon: "🤝"
    },
    { 
      title: "Патриотизм", 
      description: "Знакомство с историей и культурой России, воспитание любви к Родине. Дети знакомятся с государственными символами, традициями и историческими событиями в доступной форме.",
      icon: "🇷🇺"
    },
    { 
      title: "Коммуникация", 
      description: "Развитие речи, навыков общения и работы в коллективе. Дети учатся выражать свои мысли, слушать друг друга и находить общий язык с окружающими.",
      icon: "💬"
    },
    { 
      title: "Экология", 
      description: "Воспитание бережного отношения к природе и окружающей среде. Формирование экологического сознания через практические занятия и проекты по охране природы.",
      icon: "🌱"
    },
    { 
      title: "Социализация", 
      description: "Адаптация в обществе, навыки сотрудничества и взаимопомощи. Формирование социальных компетенций через ролевые игры и групповые активности.",
      icon: "👪"
    },
    { 
      title: "Подготовка к школе", 
      description: "Формирование готовности к школьному обучению и программе \"Орлята России\". Развитие учебных навыков, внимания, усидчивости и мотивации к обучению.",
      icon: "📚"
    }
  ];

  const testimonials = [
    {
      name: "Анна Петрова",
      role: "Мама Артёма, 6 лет",
      text: "Мой сын с огромным удовольствием посещает занятия. За три месяца он стал более самостоятельным, научился работать в команде и проявлять инициативу. Теперь Артём с гордостью рассказывает о своей стране!"
    },
    {
      name: "Сергей Иванов",
      role: "Папа Марины, 5 лет",
      text: "Очень благодарен проекту за комплексный подход к развитию детей. Марина теперь лучше общается со сверстниками, стала более внимательной и организованной. Особенно нравятся творческие занятия."
    },
    {
      name: "Елена Соколова",
      role: "Мама Димы, 6 лет",
      text: "Проект \"Будущее России\" - это именно то, что нужно современным детям. Патриотическое воспитание, спорт, творчество - всё в игровой форме. Дима с нетерпением ждёт каждого занятия!"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <MarqueeText />
        
        {/* О проекте */}
        <section id="about" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">О проекте</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Образовательный проект "Будущее России" направлен на всестороннее развитие детей дошкольного возраста 
                  и их подготовку к активному участию в общественной жизни.
                </p>
                <p>
                  Наша программа состоит из 10 образовательных треков, каждый из которых развивает определенные навыки и качества. 
                  Мы помогаем детям успешно социализироваться и готовим их к участию в программе "Орлята России" 
                  от Всероссийского детского центра "Орлёнок".
                </p>
                <p>
                  Занятия проходят в игровой форме, что способствует лучшему усвоению материала 
                  и поддерживает интерес детей к обучению. Наши методики разработаны опытными педагогами
                  с учетом возрастных особенностей и современных образовательных стандартов.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Цитата */}
        <QuoteDisplay />
        
        {/* Треки */}
        <section id="tracks" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Образовательные треки</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track, index) => (
                <TrackCard
                  key={index}
                  title={track.title}
                  description={track.description}
                  icon={track.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Отзывы родителей */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Отзывы родителей</h2>
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-6">
                      <Card className="p-8 h-full">
                        <blockquote className="mb-4">
                          <p className="text-lg text-gray-700 italic">"{testimonial.text}"</p>
                        </blockquote>
                        <footer>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </footer>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* Куратор */}
        <section id="curator" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Куратор проекта</h2>
              <Card className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt="Блинов Антон Александрович" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Блинов Антон Александрович</h3>
                    <p className="text-secondary font-medium mb-4">Куратор образовательного проекта "Будущее России"</p>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        14-летний ученик, реализующий образовательные проекты "Будущее России" и "Уроки Победы".
                      </p>
                      <p>
                        Наставник программы "Орлята России" и Председатель старшеклассников наставников Орлят России.
                        Имеет активный опыт педагогической работы с детьми дошкольного и младшего школьного возраста.
                      </p>
                      <p>
                        "Наша цель - помочь каждому ребенку раскрыть свой потенциал и вырасти достойным гражданином 
                        нашей великой страны. Через игру и творчество мы воспитываем патриотизм, развиваем таланты и 
                        учим детей быть ответственными членами общества."
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Запись на занятия */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Присоединяйтесь к нам!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Запишите своего ребенка на занятия по проекту "Будущее России" 
              и дайте ему возможность всесторонне развиваться в дружественной среде.
            </p>
            <a 
              href="#" 
              className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Записаться на занятия
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
