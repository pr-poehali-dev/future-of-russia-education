import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Image, Video, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UploadMaterialsTab = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = (type: string) => {
    if (!selectedFile) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл для загрузки",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите название материала",
        variant: "destructive",
      });
      return;
    }

    if (!section) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите раздел для публикации",
        variant: "destructive",
      });
      return;
    }

    // Имитация загрузки файла
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFile(null);
      setTitle("");
      setDescription("");
      setSection("");
      
      toast({
        title: "Файл загружен",
        description: `${type} успешно добавлен в раздел "${section}"`,
      });
    }, 1500);
  };

  // Общие секции для всех типов материалов
  const sections = [
    { value: "main", label: "Главная страница" },
    { value: "tracks", label: "Образовательные треки" },
    { value: "gallery", label: "Галерея материалов" },
    { value: "events", label: "Мероприятия и новости" },
    { value: "methodology", label: "Методические материалы" },
  ];

  // Дополнительные секции для разных типов материалов
  const documentSections = [
    ...sections,
    { value: "orlata", label: "Орлята России" },
    { value: "teaching", label: "Учебные пособия" },
  ];

  const imageSections = [
    ...sections,
    { value: "activities", label: "Активности" },
    { value: "achievements", label: "Достижения" },
  ];

  const videoSections = [
    ...sections,
    { value: "tutorials", label: "Обучающие видео" },
    { value: "interviews", label: "Интервью" },
  ];

  const UploadForm = ({ type, icon, sectionsOptions }: { 
    type: string; 
    icon: React.ReactNode; 
    sectionsOptions: { value: string; label: string }[];
  }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-medium text-lg">{type}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor={`${type.toLowerCase()}-title`}>Название материала</Label>
          <Input 
            id={`${type.toLowerCase()}-title`} 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название материала"
          />
        </div>
        
        <div>
          <Label htmlFor={`${type.toLowerCase()}-description`}>Описание (необязательно)</Label>
          <Input 
            id={`${type.toLowerCase()}-description`} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте краткое описание"
          />
        </div>
        
        <div>
          <Label htmlFor={`${type.toLowerCase()}-section`}>Раздел для публикации</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger id={`${type.toLowerCase()}-section`}>
              <SelectValue placeholder="Выберите раздел" />
            </SelectTrigger>
            <SelectContent>
              {sectionsOptions.map((section) => (
                <SelectItem key={section.value} value={section.value}>
                  {section.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor={`${type.toLowerCase()}-file`}>Файл</Label>
          <InputFile 
            id={`${type.toLowerCase()}-file`}
            accept={
              type === "Документы" ? ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" :
              type === "Изображения" ? ".jpg,.jpeg,.png,.gif,.webp" :
              ".mp4,.mov,.avi,.webm"
            }
            buttonText="Выбрать файл"
            onFileSelect={handleFileSelect}
          />
        </div>
        
        <Button 
          onClick={() => handleUpload(type)} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Загрузка...
            </>
          ) : (
            "Загрузить материал"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Загрузка образовательных материалов</h2>
      
      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="images">Изображения</TabsTrigger>
          <TabsTrigger value="videos">Видео</TabsTrigger>
        </TabsList>
        
        <Card className="p-6">
          <TabsContent value="documents">
            <UploadForm 
              type="Документы" 
              icon={<FileText className="h-6 w-6 text-primary" />} 
              sectionsOptions={documentSections} 
            />
          </TabsContent>
          
          <TabsContent value="images">
            <UploadForm 
              type="Изображения" 
              icon={<Image className="h-6 w-6 text-primary" />} 
              sectionsOptions={imageSections} 
            />
          </TabsContent>
          
          <TabsContent value="videos">
            <UploadForm 
              type="Видео" 
              icon={<Video className="h-6 w-6 text-primary" />} 
              sectionsOptions={videoSections} 
            />
          </TabsContent>
        </Card>
      </Tabs>
      
      <Card className="p-6 bg-blue-50">
        <div className="flex gap-3 items-start">
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Советы по загрузке материалов</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Максимальный размер файла: 100MB</li>
              <li>Поддерживаемые форматы документов: PDF, DOCX, PPT, XLS</li>
              <li>Поддерживаемые форматы изображений: JPG, PNG, GIF, WebP</li>
              <li>Поддерживаемые форматы видео: MP4, MOV, AVI, WebM</li>
              <li>Для изображений рекомендуемое разрешение не менее 1200×800 пикселей</li>
              <li>Для видео рекомендуемое разрешение не менее 720p</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UploadMaterialsTab;
