import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, FileText, Video, Home, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface UserInfo {
  name: string;
  role: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Проверка авторизации при загрузке страницы
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Получение данных пользователя
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const handleFileUpload = (type: string) => {
    toast({
      title: "Файл загружен",
      description: `${type} успешно добавлен в библиотеку`,
    });
  };
  
  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Новость опубликована",
      description: "Информация успешно размещена на сайте",
    });
  };
  
  if (!user) {
    return null; // Или показать загрузку
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Панель управления</h1>
              <p className="text-gray-600 mt-1">
                Добро пожаловать, {user.name} | {user.role}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={() => navigate("/")} variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                На сайт
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="upload">Загрузка материалов</TabsTrigger>
              <TabsTrigger value="content">Управление контентом</TabsTrigger>
              <TabsTrigger value="news">Новости и события</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <h2 className="text-xl font-bold">Загрузка образовательных материалов</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <FileText className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-medium mb-2">Документы</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Загрузите методические материалы в формате PDF, DOCX
                    </p>
                    <Input 
                      type="file" 
                      className="mb-2" 
                      accept=".pdf,.doc,.docx"
                    />
                    <Button onClick={() => handleFileUpload("Документ")}>
                      Загрузить
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Image className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-medium mb-2">Изображения</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Загрузите фотографии мероприятий в формате JPG, PNG
                    </p>
                    <Input 
                      type="file" 
                      className="mb-2" 
                      accept=".jpg,.jpeg,.png"
                    />
                    <Button onClick={() => handleFileUpload("Изображение")}>
                      Загрузить
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Video className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-medium mb-2">Видео</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Загрузите обучающие видео в формате MP4
                    </p>
                    <Input 
                      type="file" 
                      className="mb-2" 
                      accept=".mp4,.mov,.avi"
                    />
                    <Button onClick={() => handleFileUpload("Видео")}>
                      Загрузить
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <h2 className="text-xl font-bold">Управление контентом сайта</h2>
              
              <Card className="p-6">
                <h3 className="font-medium mb-4">Редактирование информации о проекте</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectDescription">Описание проекта</Label>
                    <Textarea 
                      id="projectDescription"
                      rows={5}
                      defaultValue="Образовательный проект 'Будущее России' направлен на всестороннее развитие детей дошкольного возраста и их подготовку к активному участию в общественной жизни..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectGoals">Цели проекта</Label>
                      <Textarea 
                        id="projectGoals"
                        rows={3}
                        defaultValue="Помочь детям социализироваться в обществе, подготовка к участию в программе 'Орлята России'..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="projectAudience">Целевая аудитория</Label>
                      <Textarea 
                        id="projectAudience"
                        rows={3}
                        defaultValue="Дети дошкольного возраста от 5 до 7 лет..."
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full md:w-auto">
                    Сохранить изменения
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className="space-y-6">
              <h2 className="text-xl font-bold">Новости и события</h2>
              
              <Card className="p-6">
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="newsTitle">Заголовок</Label>
                    <Input 
                      id="newsTitle"
                      placeholder="Введите заголовок новости или события"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="newsContent">Содержание</Label>
                    <Textarea 
                      id="newsContent"
                      rows={6}
                      placeholder="Введите текст новости или описание события..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="newsImage">Изображение</Label>
                    <Input 
                      id="newsImage"
                      type="file" 
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Upload className="mr-2 h-4 w-4" />
                      Опубликовать
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
