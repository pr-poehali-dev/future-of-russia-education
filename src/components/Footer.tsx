
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo />
            <p className="text-sm text-gray-600 mt-2">
              Образовательный проект для дошкольников
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} Образовательный проект "Будущее России"
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Все права защищены
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
