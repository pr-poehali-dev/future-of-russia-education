import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const NewsEventsTab = () => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: "Открытый урок по треку «Творчество»", 
      date: new Date(2023, 9, 15),
      location: "Центральная площадка проекта"
    },
    {
      id: 2,
      title: "Подготовка к Орлятам России",
      date: new Date(2023, 10, 5),
      location: "Онлайн-трансляция"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    location: ""
  });

  const handleNewsImageSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setNewsImage(files[0]);
    }
  };

  const handleNewsSubmit = () => {
    if (!newsTitle.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите заголовок новости",
        variant: "destructive",
      });
      return;
    }

    if (!newsContent.trim()) {
      toast({
        title: "Ошибка",
        description: "Добавьте содержание новости",
        variant: "destructive",
      });
      return;
    }

    // Имитация публикации новости
    setTimeout(() => {
      setNewsTitle("");
      setNewsContent("");
      setNewsImage(null);
      setIsPinned(false);
      
      toast({
        title: "Новость опубликована",
        description: "Новость успешно опубликована на сайте",
      });
    }, 1000);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите название мероприятия",
        variant: "destructive",
      });
      return;
    }

    if (!newEvent.location.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите место проведения",
        variant: "destructive",
      });
      return;
    }

    // Добавляем новое мероприятие
    setEvents([
      ...events,
      {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        location: newEvent.location
      }
    ]);

    // Сбрасываем форму
    setNewEvent({
      title: "",
      date: new Date(),
      location: ""
    });

    toast({
      title: "Мероприятие добавлено",
      description: "Мероприятие успешно добавлено в календарь",
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    
    toast({
      title: "Мероприятие удалено",
      description: "Мероприятие успешно удалено из календаря",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Управление новостями и мероприятиями</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Секция добавления новости */}
        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Добавить новость</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="news-title">Заголовок новости</Label>
              <Input 
                id="news-title" 
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                placeholder="Введите заголовок новости"
              />
            </div>
            
            <div>
              <Label htmlFor="news-content">Содержание новости</Label>
              <Textarea 
                id="news-content" 
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                placeholder="Введите текст новости"
                rows={5}
              />
            </div>
            
            <div>
              <Label htmlFor="news-image">Изображение (необязательно)</Label>
              <InputFile 
                id="news-image"
                accept=".jpg,.jpeg,.png,.gif"
                buttonText="Выбрать изображение"
                onFileSelect={handleNewsImageSelect}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="pinned" 
                checked={isPinned}
                onCheckedChange={setIsPinned}
              />
              <Label htmlFor="pinned">Закрепить новость на главной странице</Label>
            </div>
            
            <div>
              <Label htmlFor="news-date">Дата публикации</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button onClick={handleNewsSubmit} className="w-full">
              Опубликовать новость
            </Button>
          </div>
        </Card>
        
        {/* Секция управления мероприятиями */}
        <Card className="p-6">
          <h3 className="font-medium text-lg mb-4">Календарь мероприятий</h3>
          
          <div className="space-y-4">
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="event-title">Название мероприятия</Label>
                <Input 
                  id="event-title" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Введите название мероприятия"
                />
              </div>
              
              <div>
                <Label htmlFor="event-date">Дата проведения</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="event-date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newEvent.date, "PPP", { locale: ru })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newEvent.date}
                      onSelect={(date) => date && setNewEvent({...newEvent, date})}
                      initialFocus
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="event-location">Место проведения</Label>
                <Input 
                  id="event-location" 
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Введите место проведения"
                />
              </div>
              
              <Button onClick={handleAddEvent} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Добавить мероприятие
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Предстоящие мероприятия</h4>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {events.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Нет запланированных мероприятий</p>
                ) : (
                  events
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">
                            {format(event.date, "d MMMM yyyy", { locale: ru })}
                          </p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewsEventsTab;
