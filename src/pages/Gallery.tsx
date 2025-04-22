import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  // Временные данные для галереи
  // В реальном приложении эти данные будут загружаться с сервера
  const photos = [
    { id: 1, title: "Творческое занятие", src: "/placeholder.svg" },
    { id: 2, title: "Патриотический урок", src: "/placeholder.svg" },
    { id: 3, title: "Экологическая экскурсия", src: "/placeholder.svg" },
    { id: 4, title: "Спортивные игры", src: "/placeholder.svg" },
    { id: 5, title: "Технологический кружок", src: "/placeholder.svg" },
    { id: 6, title: "Коммуникативный тренинг", src: "/placeholder.svg" },
  ];
  
  const videos = [
    { id: 1, title: "Вводный урок по треку 'Творчество'", src: "/placeholder.svg", duration: "5:24" },
    { id: 2, title: "Мастер-класс по социализации", src: "/placeholder.svg", duration: "12:10" },
    { id: 3, title: "Подготовка к программе 'Орлята России'", src: "/placeholder.svg", duration: "8:43" },
  ];
  
  const documents = [
    { id: 1, title: "Методическое пособие по треку 'Творчество'", type: "PDF", size: "2.4 MB" },
    { id: 2, title: "План занятий по этике", type: "DOCX", size: "1.8 MB" },
    { id: 3, title: "Материалы по экологическому воспитанию", type: "PDF", size: "3.2 MB" },
    { id: 4, title: "Рекомендации по подготовке к 'Орлята России'", type: "PDF", size: "5.1 MB" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Галерея материалов</h1>
          
          <Tabs defaultValue="photos" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="photos">Фотографии</TabsTrigger>
              <TabsTrigger value="videos">Видео</TabsTrigger>
              <TabsTrigger value="documents">Документы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={photo.src} 
                        alt={photo.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="font-medium">{photo.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={video.src} 
                          alt={video.title}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-primary bg-opacity-80 w-12 h-12 flex items-center justify-center text-white cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <div className="space-y-4">
                {documents.map((doc) => (
                  <Card key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary bg-opacity-10 p-3 rounded text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-gray-500">
                          {doc.type} · {doc.size}
                        </p>
                      </div>
                      <button className="text-primary hover:text-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
