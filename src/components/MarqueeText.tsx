
import { useState, useEffect } from 'react';

const MarqueeText = () => {
  const [greetingText, setGreetingText] = useState('');
  
  useEffect(() => {
    const updateGreeting = () => {
      const today = new Date();
      const month = today.getMonth();
      const day = today.getDate();
      
      // Российские праздники
      if (month === 0 && day === 1) return "С Новым Годом! 🎄";
      if (month === 0 && day === 7) return "С Рождеством Христовым! ☦️";
      if (month === 0 && day === 14) return "Со Старым Новым годом! 🎊";
      if (month === 0 && day === 25) return "С Днём российского студенчества! 📚";
      if (month === 1 && day === 14) return "С Днём всех влюбленных! ❤️";
      if (month === 1 && day === 23) return "С Днём защитника Отечества! 🛡️";
      if (month === 2 && day === 1) return "С началом весны! 🌷";
      if (month === 2 && day === 8) return "С Международным женским днём! 💐";
      if (month === 3 && day === 12) return "С Днём космонавтики! 🚀";
      if (month === 4 && day === 1) return "С Праздником Весны и Труда! 🌸";
      if (month === 4 && day === 9) return "С Днём Победы! 🎖️";
      if (month === 5 && day === 12) return "С Днём России! 🇷🇺";
      if (month === 6 && day === 8) return "С Днём семьи, любви и верности! 👨‍👩‍👧‍👦";
      if (month === 8 && day === 1) return "С Днём знаний! 📝";
      if (month === 9 && day === 5) return "С Днём учителя! 👨‍🏫👩‍🏫";
      if (month === 10 && day === 4) return "С Днём народного единства! 🤝";
      if (month === 10 && day === 27) return "С Днём матери! 💖";
      
      // Православные праздники (примерные даты для 2024 года)
      if (month === 0 && day === 19) return "С Крещением Господним! 💧☦️";
      if (month === 1 && day === 15) return "Со Сретением Господним! ☦️🕯️";
      if (month === 3 && day === 7) return "С Благовещением Пресвятой Богородицы! 🕊️";
      if (month === 4 && day === 5) return "Светлой Пасхи! ☦️";
      if (month === 5 && day === 16) return "С Вознесением Господним! ☁️☦️";
      if (month === 5 && day === 23) return "Со Святой Троицей! 🕊️";
      if (month === 7 && day === 19) return "С Преображением Господним! ✨";
      if (month === 7 && day === 28) return "С Успением Пресвятой Богородицы! 🙏";
      if (month === 8 && day === 21) return "С Рождеством Пресвятой Богородицы! 👼";
      if (month === 8 && day === 27) return "С Воздвижением Креста Господня! ☦️";
      if (month === 9 && day === 14) return "С Покровом Пресвятой Богородицы! 🙏";
      if (month === 11 && day === 4) return "С Введением во храм Пресвятой Богородицы! 🕯️";
      
      // Национальные и международные праздники
      if (month === 1 && day === 8) return "С Днём российской науки! 🧪";
      if (month === 1 && day === 21) return "С Международным днём родного языка! 📖";
      if (month === 3 && day === 18) return "С Международным днём памятников! 🏛️";
      if (month === 4 && day === 18) return "С Международным днём музеев! 🏛️";
      if (month === 5 && day === 1) return "С Международным днём защиты детей! 👶";
      if (month === 5 && day === 6) return "С Днём русского языка! 📚";
      if (month === 5 && day === 9) return "С Международным днём друзей! 🤝";
      if (month === 6 && day === 30) return "С Международным днём дружбы! 🤝";
      if (month === 7 && day === 22) return "С Днём Государственного флага России! 🇷🇺";
      if (month === 9 && day === 31) return "С Днём народного единства! 🤝";
      if (month === 11 && day === 12) return "С Днём Конституции России! 📜";
      
      // Профессиональные праздники, актуальные для образования
      if (month === 0 && day === 13) return "С Днём российской печати! 📰";
      if (month === 4 && day === 27) return "С Всероссийским днём библиотек! 📚";
      if (month === 5 && day === 27) return "С Днём молодёжи России! 🎓";
      if (month === 9 && day === 5) return "С Днём учителя! 👨‍🏫";
      if (month === 10 && day === 10) return "С Днём молодёжи! 🎓";
      if (month === 10 && day === 17) return "С Международным днём студентов! 👨‍🎓";
      
      // Дополнительные поздравления для проекта
      const messages = [
        "Образовательный проект \"Будущее России\" - развиваем детей вместе! 👶👧👦",
        "Вместе растим достойное будущее нашей страны! 🇷🇺",
        "Присоединяйтесь к нашему проекту \"Будущее России\"! 📢",
        "10 образовательных треков для всестороннего развития детей! 🌟",
        "Готовим детей к программе \"Орлята России\" вместе! 🦅",
        "Записывайтесь на наши занятия уже сегодня! 📝",
        "Развиваем патриотизм с дошкольного возраста! ❤️",
        "Творчество, интеллект, спорт - развиваем все направления! 🏆",
        "Проект \"Будущее России\" - старт успешного будущего! 🚀",
        "Образовательный проект \"Уроки Победы\" - сохраняем память о великом подвиге! 🎖️",
        "Наш куратор - 14-летний председатель старшеклассников наставников Орлят России! 🦅",
        "Приглашаем учеников присоединиться к движению \"Орлята России\"! 🇷🇺",
        "Развиваем личностный потенциал каждого ребёнка! 💪",
        "Учим детей любить свою Родину и гордиться ею! ❤️"
      ];
      
      // Случайное сообщение, обновляемое каждые 35 минут
      const minute = today.getMinutes();
      const messageIndex = Math.floor((minute / 35) % messages.length);
      return messages[messageIndex];
    };
    
    setGreetingText(updateGreeting());
    
    const interval = setInterval(() => {
      setGreetingText(updateGreeting());
    }, 35 * 60 * 1000); // Обновление каждые 35 минут (35 * 60 * 1000 мс)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="marquee-container overflow-hidden bg-blue-900 text-white py-2">
      <div className="marquee flex items-center justify-center text-center">
        <span className="text-sm md:text-base font-medium px-4">{greetingText}</span>
      </div>
    </div>
  );
};

export default MarqueeText;
