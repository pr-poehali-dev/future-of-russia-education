import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Logo from './Logo';
import MarqueeText from './MarqueeText';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'О проекте', href: '/#about' },
    { name: 'Треки', href: '/#tracks' },
    { name: 'Галерея', href: '/gallery' },
    { name: 'Куратор', href: '/#curator' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-primary text-white py-1">
        <div className="container mx-auto">
          <MarqueeText />
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo className="z-20" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Link 
              to="/dashboard"
              className="text-primary font-medium flex items-center"
            >
              <User className="mr-1 h-4 w-4" />
              Панель управления
            </Link>
          ) : (
            <Link 
              to="/login"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Вход
            </Link>
          )}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-20"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-10 md:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.href}
                  className="text-gray-900 text-xl font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <Link 
                  to="/dashboard"
                  className="text-primary text-xl font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-2 h-5 w-5" />
                  Панель управления
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="text-gray-900 text-xl font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Вход
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
