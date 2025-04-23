import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { InputFile } from "../ui/input-file";
import { Pencil, Save, Check, ExternalLink, RefreshCw } from "lucide-react";

const ContentManagementTab = () => {
  const [projectDescription, setProjectDescription] = useState(
    "Образовательный проект 'Будущее России' направлен на всестороннее развитие детей дошкольного возраста и их подготовку к активному участию в общественной жизни. Проект помогает детям социализироваться в обществе и осуществляет подготовку к участию в программе 'Орлята России' от ВДЦ 'Орлёнок'."
  );
  
  const [projectGoals, setProjectGoals] = useState(
    "Помочь детям социализироваться в обществе, подготовка к участию в программе 'Орлята России', формирование гражданской идентичности, развитие патриотических чувств."
  );
  
  const [projectAudience, setProjectAudience] = useState(
    "Дети дошкольного возраста от 5 до 7 лет."
  );

  const [isEditing, setIsEditing] = useState({
    tracks: false,
    marquee: false
  });

  const initialTracks = [
    { id: 1, name: "Орлёнок – Эрудит", description: "Развитие интеллектуальных способностей" },
    { id: 2, name: "Орлёнок – Хранитель", description: "Формирование бережного отношения к природе и культурному наследию" },
    { id: 3, name: "Орлёнок – Мастер", description: "Развитие творческих способностей" },
    { id: 4, name: "Орлёнок – Спортсмен", description: "Физическое развитие и приобщение к здоровому образу жизни" },
    { id: 5, name: "Орлёнок – Доброволец", description: "Развитие добровольчества и волонтёрства" },
    { id: 6, name: "Орлёнок – Эколог", description: "Формирование экологической культуры" },
    { id: 7, name: "Орлёнок – Патриот", description: "Воспитание любви к Родине, изучение истории России" },
    { id: 8, name: "Орлёнок – Лидер", description: "Развитие лидерских качеств" },
    { id: 9, name: "Орлёнок – Технолог", description: "Знакомство с современными технологиями" },
    { id: 10, name: "Орлёнок – Коммуникатор", description: "Развитие коммуникативных навыков" }
  ];

  const [tracks, setTracks] = useState(initialTracks);
  const [editingTrackId, setEditingTrackId] = useState<number | null>(null);
  const [editingTrack, setEditingTrack] = useState({
    name: "",
    description: ""
  });

  const [marqueeMessages, setMarqueeMessages] = useState([
    { id: 1, text: "Поздравляем с Днём России! 🇷🇺", isActive: true },
    { id: 2, text: "С праздником Светлой Пасхи! ☦️", isActive: true },
    { id: 3, text: "С Днём защиты детей! 👧👦", isActive: true }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedSection, setSelectedSection] = useState("");

  const handleSaveContent = () => {
    toast({
      title: "Контент сохранен",
      description: "Изменения в информации о проекте успешно сохранены",
    });
  };

  const handleEditTrack = (track: typeof tracks[0]) => {
    setEditingTrackId(track.id);
    setEditingTrack({
      name: track.name,
      description: track.description
    });
  };

  const handleSaveTrack = (id: number) => {
    setTracks(tracks.map(track => 
      track.id === id 
        ? { ...track, name: editingTrack.name, description: editingTrack.description } 
        : track
    ));
    setEditingTrackId(null);
    
    toast({
      title: "Трек обновлен",
      description: "Информация о треке успешно обновлена",
    });
  };

  const handleAddMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Ошибка",
        description: "Текст сообщения не может быть пустым",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(0, ...marqueeMessages.map(m => m.id)) + 1;
    setMarqueeMessages([
      ...marqueeMessages,
      { id: newId, text: newMessage, isActive: true }
    ]);
    setNewMessage("");
    
    toast({
      title: "Сообщение добавлено",
      description: "Новое сообщение добавлено в бегущую строку"
    });
  };

  const toggleMessageActive = (id: number) => {
    setMarqueeMessages(marqueeMessages.map(msg => 
      msg.id === id ? { ...msg, isActive: !msg.isActive } : msg
    ));
    
    const message = marqueeMessages.find(msg => msg.id === id);
    toast({
      title: message?.isActive ? "Сообщение отключено" : "Сообщение активировано",
      description: "Статус сообщения в бегущей строке изменен"
    });
  };

  const deleteMessage = (id: number) => {
    setMarqueeMessages(marqueeMessages.filter(msg => msg.id !== id));
    
    toast({
      title: "Сообщение удалено",
      description: "Сообщение удалено из бегущей строки"
    });
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
  };

  const handleUpdateImage = () => {
    if (!selectedImage) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedSection) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите раздел",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Изображение обновлено",
      description: `Изображение для раздела "${selectedSection}" успешно обновлено`
    });
    
    setSelectedImage(null);
    setSelectedSection("");
  };

  const resetToDefaults = () => {
    setTracks(initialTracks);
    toast({
      title: "Сброс выполнен",
      description: "Информация о треках сброшена до значений по умолчанию"
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Управление контентом сайта</h2>
      
      <Tabs defaultValue="main" className="space-y-4">
        <TabsList>
          <TabsTrigger value="main">Основная информация</TabsTrigger>
          <TabsTrigger value="tracks">Образовательные треки</TabsTrigger>
          <TabsTrigger value="marquee">Бегущая строка</TabsTrigger>
          <TabsTrigger value="images">Изображения</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Редактирование информации о проекте</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectDescription">Описание проекта</Label>
                <Textarea 
                  id="projectDescription"
                  rows={5}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectGoals">Цели проекта</Label>
                  <Textarea 
                    id="projectGoals"
                    rows={3}
                    value={projectGoals}
                    onChange={(e) => setProjectGoals(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectAudience">Целевая аудитория</Label>
                  <Textarea 
                    id="projectAudience"
                    rows={3}
                    value={projectAudience}
                    onChange={(e) => setProjectAudience(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveContent} className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracks">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Управление образовательными треками</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetToDefaults}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Сбросить к исходным
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {tracks.map((track) => (
                  <div 
                    key={track.id} 
                    className="border rounded-md p-4 hover:bg-gray-50 transition-colors"
                  >
                    {editingTrackId === track.id ? (
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor={`track-${track.id}-name`}>Название трека</Label>
                          <Input 
                            id={`track-${track.id}-name`}
                            value={editingTrack.name}
                            onChange={(e) => setEditingTrack({ ...editingTrack, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`track-${track.id}-desc`}>Описание трека</Label>
                          <Input 
                            id={`track-${track.id}-desc`}
                            value={editingTrack.description}
                            onChange={(e) => setEditingTrack({ ...editingTrack, description: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingTrackId(null)}
                          >
                            Отмена
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleSaveTrack(track.id)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Сохранить
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{track.name}</h4>
                          <p className="text-sm text-gray-600">
                            {track.description}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEditTrack(track)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="marquee">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Управление бегущей строкой</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Добавить новое сообщение</Label>
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите текст сообщения"
                    className="flex-grow"
                  />
                  <Button onClick={handleAddMessage}>Добавить</Button>
                </div>
                <p className="text-sm text-gray-600">
                  Совет: добавьте эмодзи чтобы сделать сообщения более заметными. Например: 🇷🇺 ☦️ 🎄 🎓
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Текущие сообщения</h4>
                <div className="space-y-2">
                  {marqueeMessages.map((message) => (
                    <div key={message.id} className="flex justify-between items-center border p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${message.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span>{message.text}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleMessageActive(message.id)}
                        >
                          {message.isActive ? 'Отключить' : 'Включить'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteMessage(message.id)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm">
                  <strong>Информация:</strong> Бегущая строка показывается в верхней части сайта и автоматически обновляется каждые 2 часа, показывая разные сообщения из списка активных.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="images">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Обновление изображений на сайте</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-section">Выберите раздел для обновления изображения</Label>
                <Select value={selectedSection} onValueChange={handleSectionChange}>
                  <SelectTrigger id="image-section">
                    <SelectValue placeholder="Выберите раздел" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Шапка сайта (баннер)</SelectItem>
                    <SelectItem value="about">Блок "О проекте"</SelectItem>
                    <SelectItem value="curator">Фото куратора</SelectItem>
                    <SelectItem value="tracks">Образовательные треки (общее)</SelectItem>
                    <SelectItem value="footer">Подвал сайта</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="section-image">Выберите новое изображение</Label>
                <InputFile 
                  id="section-image"
                  accept=".jpg,.jpeg,.png,.webp"
                  buttonText="Выбрать изображение"
                  onFileSelect={handleFileSelect}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Рекомендуемый размер: 1200×600 пикселей, формат: JPG или PNG
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <Button onClick={handleUpdateImage}>
                  Обновить изображение
                </Button>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary inline-flex items-center"
                >
                  Просмотреть текущие изображения
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementTab;
