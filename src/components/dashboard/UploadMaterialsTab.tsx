import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { FileText, Image, Video } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const UploadMaterialsTab = () => {
  const handleFileUpload = (type: string) => {
    toast({
      title: "Файл загружен",
      description: `${type} успешно добавлен в библиотеку`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Загрузка образовательных материалов</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-medium mb-2">Документы</h3>
            <p className="text-sm text-gray-600 mb-4">
              Загрузите методические материалы в формате PDF, DOCX
            </p>
            <InputFile 
              accept=".pdf,.doc,.docx"
              buttonText="Выбрать файл"
              className="mb-2"
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
            <InputFile 
              accept=".jpg,.jpeg,.png"
              buttonText="Выбрать файл"
              className="mb-2"
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
            <InputFile 
              accept=".mp4,.mov,.avi"
              buttonText="Выбрать файл"
              className="mb-2"
            />
            <Button onClick={() => handleFileUpload("Видео")}>
              Загрузить
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UploadMaterialsTab;
