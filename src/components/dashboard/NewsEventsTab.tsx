import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InputFile } from "@/components/ui/input-file";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { FormEvent } from "react";

const NewsEventsTab = () => {
  const handleNewsSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Новость опубликована",
      description: "Информация успешно размещена на сайте",
    });
  };

  return (
    <div className="space-y-6">
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
            <InputFile 
              id="newsImage"
              accept=".jpg,.jpeg,.png"
              buttonText="Выбрать изображение"
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
    </div>
  );
};

export default NewsEventsTab;
