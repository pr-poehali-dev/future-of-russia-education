
import { useState, useEffect } from 'react';

const MarqueeText = () => {
  const [greetingText, setGreetingText] = useState('');
  
  useEffect(() => {
    const updateGreeting = () => {
      const today = new Date();
      const month = today.getMonth();
      const day = today.getDate();
      
      // Российские праздники
      if (month === 0 && day === 1) return "С Новым Годом!";
      if (month === 0 && day === 7) return "С Рождеством Христовым!";
      if (month === 1 && day === 23) return "С Днём защитника Отечества!";
      if (month === 2 && day === 8) return "С Международным женским днём!";
      if (month === 4 && day === 1) return "С Праздником Весны и Труда!";
      if (month === 4 && day === 9) return "С Днём Победы!";
      if (month === 5 && day === 12) return "С Днём России!";
      if (month === 10 && day === 4) return "С Днём народного единства!";
      
      // Православные праздники (даты примерные, т.к. многие плавающие)
      if (month === 3 && day >= 20 && day <= 30) return "Светлой Пасхи!";
      if (month === 5 && day >= 4 && day <= 20) return "Со Святой Троицей!";
      if (month === 7 && day === 19) return "С Преображением Господним!";
      if (month === 8 && day === 27) return "С Воздвижением Креста Господня!";
      if (month === 9 && day === 14) return "С Покровом Пресвятой Богородицы!";
      
      return "Образовательный проект \"Будущее России\" - развиваем детей вместе!";
    };
    
    setGreetingText(updateGreeting());
    
    const interval = setInterval(() => {
      setGreetingText(updateGreeting());
    }, 7200000); // Обновление каждые 2 часа (7200000 мс)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="marquee text-sm font-medium">
      {greetingText}
    </div>
  );
};

export default MarqueeText;
