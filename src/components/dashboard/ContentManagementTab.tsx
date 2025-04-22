import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ContentManagementTab = () => {
  const handleSaveContent = () => {
    toast({
      title: "Контент сохранен",
      description: "Изменения успешно сохранены",
    });
  };

  return (
    <div className="space-y-6">
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
          
          <Button onClick={handleSaveContent} className="w-full md:w-auto">
            Сохранить изменения
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
