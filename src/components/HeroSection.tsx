
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary py-16 md:py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Образовательный проект<br />
            "Будущее России"
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Помогаем детям дошкольного возраста социализироваться в обществе
            и готовим к участию в программе "Орлята России"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-primary hover:bg-gray-100"
              size="lg"
              onClick={() => {
                const element = document.getElementById('about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Узнать больше
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              size="lg"
              onClick={() => {
                const element = document.getElementById('tracks');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Наши треки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
