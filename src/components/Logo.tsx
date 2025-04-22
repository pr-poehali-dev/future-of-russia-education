
import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = '/logo-b.svg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className={`flex items-center ${className}`}>
      {imageLoaded ? (
        <img 
          src="/logo-b.svg" 
          alt="Будущее России" 
          className="h-10 w-auto"
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-full animate-pulse"></div>
          <span className="font-bold text-lg text-primary">Будущее России</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
