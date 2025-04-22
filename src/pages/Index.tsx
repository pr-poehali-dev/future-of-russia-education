
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TrackCard from "@/components/TrackCard";

const Index = () => {
  const tracks = [
    { 
      title: "Творчество", 
      description: "Развитие творческих способностей и самовыражения через рисование, лепку, аппликацию.",
      icon: "🎨"
    },
    { 
      title: "Познание", 
      description: "Изучение окружающего мира, природы и основ научных знаний в игровой форме.",
      icon: "🔍"
    },
    { 
      title: "Спорт", 
      description: "Физическое развитие, командные игры и основы здорового образа жизни.",
      icon: "⚽"
    },
    { 
      title: "Технологии", 
      description: "Знакомство с современными технологиями, робототехникой и конструированием.",
      icon: "🤖"
    },
    { 
      title: "Этика", 
      description: "Обучение основам этикета, культуры поведения и взаимоотношений со сверстниками.",
      icon: "🤝"
    },
    { 
      title: "Патриотизм", 
      description: "Знакомство с историей и культурой России, воспитание любви к Родине.",
      icon: "🇷🇺"
    },
    { 
      title: "Коммуникация", 
      description: "Развитие речи, навыков общения и работы в коллективе.",
      icon: "💬"
    },
    { 
      title: "Экология", 
      description: "Воспитание бережного отношения к природе и окружающей среде.",
      icon: "🌱"
    },
    { 
      title: "Социализация", 
      description: "Адаптация в обществе, навыки сотрудничества и взаимопомощи.",
      icon: "👪"
    },
    { 
      title: "Подготовка к школе", 
      description: "Формирование готовности к школьному обучению и программе \"Орлята России\".",
      icon: "📚"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
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
                  и поддерживает интерес детей к обучению.
                </p>
              </div>
            </div>
          </div>
        </section>
        
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
        
        {/* Куратор */}
        <section id="curator" className="py-16 bg-gray-50">
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
                        Опытный педагог и организатор образовательных программ для детей дошкольного возраста.
                      </p>
                      <p>
                        Под руководством Антона Александровича проект "Будущее России" успешно реализует комплексный 
                        подход к развитию детей и подготовке их к школьному обучению и участию в программе "Орлята России".
                      </p>
                      <p>
                        "Наша цель - помочь каждому ребенку раскрыть свой потенциал и вырасти достойным гражданином 
                        нашей великой страны".
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
