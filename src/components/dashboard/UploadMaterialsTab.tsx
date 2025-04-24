
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { UploadCloud, FileText, FilePlus2, FileVideo2, ImageIcon, Folder, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type MaterialType = "document" | "image" | "video";

interface MaterialItem {
  id: number;
  name: string;
  type: MaterialType;
  date: Date;
  category: string;
  target: string[];
  description: string;
  size: string;
  link: string;
}

const UploadMaterialsTab = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [targets, setTargets] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadType, setUploadType] = useState<MaterialType>("document");

  // Пример данных о загруженных материалах
  const [materials, setMaterials] = useState<MaterialItem[]>([
    {
      id: 1,
      name: "Методичка по треку Эрудит.pdf",
      type: "document",
      date: new Date(2023, 5, 15),
      category: "Методические материалы",
      target: ["Трек «Орлёнок – Эрудит»"],
      description: "Подробное руководство для проведения занятий",
      size: "2.4 MB",
      link: "#"
    },
    {
      id: 2,
      name: "Презентация о России.pptx",
      type: "document",
      date: new Date(2023, 6, 2),
      category: "Презентации",
      target: ["Трек «Орлёнок – Патриот»"],
      description: "Презентация о регионах России",
      size: "5.7 MB",
      link: "#"
    },
    {
      id: 3,
      name: "Видео мастер-класс.mp4",
      type: "video",
      date: new Date(2023, 7, 10),
      category: "Видеоматериалы",
      target: ["Трек «Орлёнок – Мастер»"],
      description: "Обучающий мастер-класс по рисованию",
      size: "125.8 MB",
      link: "#"
    },
    {
      id: 4,
      name: "Фотоотчет о мероприятии.jpg",
      type: "image",
      date: new Date(2023, 8, 5),
      category: "Фотоматериалы",
      target: ["Главная страница", "Галерея"],
      description: "Фотографии с мероприятия",
      size: "3.2 MB",
      link: "#"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<MaterialType | "all">("all");
  const [isExpanded, setIsExpanded] = useState<{[key: number]: boolean}>({});

  const handleFileSelect = (files: FileList | null) => {
    setSelectedFiles(files);
  };

  const handleTargetChange = (value: string) => {
    if (targets.includes(value)) {
      setTargets(targets.filter(t => t !== value));
    } else {
      setTargets([...targets, value]);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setTargets([]);
    setSelectedFiles(null);
  };

  const handleUpload = () => {
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Укажите название материала",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Ошибка",
        description: "Прикрепите файл(ы)",
        variant: "destructive",
      });
      return;
    }

    if (targets.length === 0) {
      toast({
        title: "Ошибка",
        description: "Выберите хотя бы один раздел для отображения",
        variant: "destructive",
      });
      return;
    }

    // Имитация загрузки файла
    const newMaterials: MaterialItem[] = Array.from(selectedFiles).map((file, index) => {
      const getTypeFromFile = (file: File): MaterialType => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        return 'document';
      };

      const getFileSizeString = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };

      return {
        id: Date.now() + index,
        name: file.name,
        type: getTypeFromFile(file),
        date: new Date(),
        category: category || 'Общие материалы',
        target: [...targets],
        description: description || `Файл ${file.name}`,
        size: getFileSizeString(file.size),
        link: URL.createObjectURL(file)
      };
    });

    setMaterials([...newMaterials, ...materials]);
    clearForm();

    toast({
      title: "Материал загружен",
      description: `Файл${selectedFiles.length > 1 ? 'ы' : ''} успешно загружен${selectedFiles.length > 1 ? 'ы' : ''}`,
    });
  };

  const toggleExpand = (id: number) => {
    setIsExpanded({...isExpanded, [id]: !isExpanded[id]});
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter(material => material.id !== id));
    
    toast({
      title: "Материал удален",
      description: "Материал успешно удален из библиотеки",
    });
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || material.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIconByType = (type: MaterialType) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'image': return <ImageIcon className="h-5 w-5 text-green-500" />;
      case 'video': return <FileVideo2 className="h-5 w-5 text-red-500" />;
    }
  };

  const getUploadTitle = () => {
    switch (uploadType) {
      case 'document': return 'Загрузка документов';
      case 'image': return 'Загрузка изображений';
      case 'video': return 'Загрузка видеоматериалов';
    }
  };

  const getUploadDescription = () => {
    switch (uploadType) {
      case 'document': 
        return 'Загрузите документы в формате PDF, DOCX, PPT для учебных материалов';
      case 'image': 
        return 'Загрузите фотографии и изображения для галереи и разделов сайта';
      case 'video': 
        return 'Загрузите видеоматериалы для образовательных треков';
    }
  };

  const getAcceptTypes = () => {
    switch (uploadType) {
      case 'document': 
        return '.pdf,.doc,.docx,.ppt,.pptx,.xlsx,.txt';
      case 'image': 
        return '.jpg,.jpeg,.png,.gif,.webp';
      case 'video': 
        return '.mp4,.webm,.avi,.mov';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Управление образовательными материалами</h2>
      
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Загрузка материалов</TabsTrigger>
          <TabsTrigger value="library">Библиотека материалов</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card className="p-6">
            <Tabs defaultValue="document" onValueChange={(value) => setUploadType(value as MaterialType)}>
              <TabsList className="mb-4">
                <TabsTrigger value="document">
                  <FileText className="mr-2 h-4 w-4" />
                  Документы
                </TabsTrigger>
                <TabsTrigger value="image">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Изображения
                </TabsTrigger>
                <TabsTrigger value="video">
                  <FileVideo2 className="mr-2 h-4 w-4" />
                  Видео
                </TabsTrigger>
              </TabsList>
              
              <h3 className="font-medium mb-4">{getUploadTitle()}</h3>
              <p className="text-muted-foreground mb-4">{getUploadDescription()}</p>
            
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-title">Название материала</Label>
                  <Input 
                    id="material-title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите название материала"
                  />
                </div>
                
                <div>
                  <Label htmlFor="material-description">Описание (необязательно)</Label>
                  <Textarea 
                    id="material-description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите краткое описание материала"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="material-category">Категория материала</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="material-category">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Методические материалы">Методические материалы</SelectItem>
                      <SelectItem value="Презентации">Презентации</SelectItem>
                      <SelectItem value="Учебные пособия">Учебные пособия</SelectItem>
                      <SelectItem value="Фотоматериалы">Фотоматериалы</SelectItem>
                      <SelectItem value="Видеоматериалы">Видеоматериалы</SelectItem>
                      <SelectItem value="Расписания занятий">Расписания занятий</SelectItem>
                      <SelectItem value="Дипломы и сертификаты">Дипломы и сертификаты</SelectItem>
                      <SelectItem value="Общие материалы">Общие материалы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Accordion type="single" collapsible className="border rounded-md">
                  <AccordionItem value="target-sections">
                    <AccordionTrigger className="px-4">
                      Выберите разделы для отображения
                      {targets.length > 0 && (
                        <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                          {targets.length}
                        </span>
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 px-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Разделы сайта</h4>
                          <div className="space-y-1">
                            {["Главная страница", "Галерея", "Расписание занятий", "О проекте"].map((section) => (
                              <label key={section} className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  className="rounded text-primary w-4 h-4"
                                  checked={targets.includes(section)}
                                  onChange={() => handleTargetChange(section)}
                                />
                                <span className="text-sm">{section}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Образовательные треки</h4>
                          <div className="space-y-1">
                            {[
                              "Трек «Орлёнок – Эрудит»",
                              "Трек «Орлёнок – Хранитель»",
                              "Трек «Орлёнок – Мастер»",
                              "Трек «Орлёнок – Спортсмен»",
                              "Трек «Орлёнок – Доброволец»",
                              "Трек «Орлёнок – Эколог»",
                              "Трек «Орлёнок – Патриот»",
                              "Трек «Орлёнок – Лидер»",
                              "Трек «Орлёнок – Технолог»",
                              "Трек «Орлёнок – Коммуникатор»"
                            ].map((track) => (
                              <label key={track} className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  className="rounded text-primary w-4 h-4"
                                  checked={targets.includes(track)}
                                  onChange={() => handleTargetChange(track)}
                                />
                                <span className="text-sm">{track}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div>
                  <Label htmlFor="material-file">Выберите файл{uploadType === 'image' ? '(ы)' : ''}</Label>
                  <InputFile 
                    id="material-file"
                    accept={getAcceptTypes()}
                    buttonText={`Выбрать файл${uploadType === 'image' ? 'ы' : ''}`}
                    onFileSelect={handleFileSelect}
                    multiple={uploadType === 'image'}
                    showPreview={uploadType === 'image'}
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button onClick={handleUpload} className="flex-1">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Загрузить материал
                  </Button>
                  
                  <Button variant="outline" onClick={clearForm}>
                    Очистить форму
                  </Button>
                </div>
              </div>
            </Tabs>
          </Card>
        </TabsContent>
        
        <TabsContent value="library">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Библиотека материалов</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск материалов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Select 
                  value={filterType} 
                  onValueChange={(value) => setFilterType(value as MaterialType | "all")}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Все типы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="document">Документы</SelectItem>
                    <SelectItem value="image">Изображения</SelectItem>
                    <SelectItem value="video">Видео</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                {filteredMaterials.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <FilePlus2 className="mx-auto h-10 w-10 mb-3 opacity-20" />
                    <p>Материалы не найдены</p>
                    {searchTerm && <p className="text-sm">Попробуйте изменить параметры поиска</p>}
                  </div>
                ) : (
                  filteredMaterials.map((material) => (
                    <div 
                      key={material.id} 
                      className="border rounded-md overflow-hidden"
                    >
                      <div 
                        className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                        onClick={() => toggleExpand(material.id)}
                      >
                        <div className="flex items-center gap-3">
                          {getIconByType(material.type)}
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Intl.DateTimeFormat('ru-RU').format(material.date)} • {material.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {isExpanded[material.id] ? 
                            <ChevronUp className="h-5 w-5" /> : 
                            <ChevronDown className="h-5 w-5" />
                          }
                        </div>
                      </div>
                      
                      {isExpanded[material.id] && (
                        <div className="p-3 border-t space-y-3">
                          <div>
                            <p className="text-sm font-medium">Описание:</p>
                            <p className="text-sm">{material.description}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Категория:</p>
                            <p className="text-sm">{material.category}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium">Отображается в разделах:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {material.target.map((target) => (
                                <span 
                                  key={target} 
                                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  {target}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild
                            >
                              <a 
                                href={material.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-1 h-4 w-4" />
                                Просмотреть
                              </a>
                            </Button>
                            
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteMaterial(material.id)}
                            >
                              Удалить
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadMaterialsTab;
