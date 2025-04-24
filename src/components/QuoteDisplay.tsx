
import { useState, useEffect } from 'react';

// Эти цитаты также содержатся в MarqueeText, но отдельно для переиспользования
export const quotes = [
  {
    text: "Чем сильнее страна, тем независимее ее внешняя политика.",
    author: "В.В. Путин",
    country: "🇷🇺"
  },
  {
    text: "Патриотизм – это не просто красивые слова. Это прежде всего дело, служение своей Родине.",
    author: "В.В. Путин",
    country: "🇷🇺"
  },
  {
    text: "Нельзя достичь благополучия, если за порогом твоего дома разруха, нищета и бесправие.",
    author: "В.В. Путин",
    country: "🇷🇺"
  },
  {
    text: "Только по-настоящему независимый человек может быть патриотом.",
    author: "А.Г. Лукашенко",
    country: "🇧🇾"
  },
  {
    text: "Мы не имеем права предать память тех, кто сохранил для нас нашу историю, нашу культуру и нашу страну.",
    author: "А.Г. Лукашенко",
    country: "🇧🇾"
  },
  {
    text: "Воспитание детей — самая важная область нашей жизни.",
    author: "А.С. Макаренко",
    country: "📚"
  },
  {
    text: "Учитель прикасается к вечности; никто не может сказать, где кончается его влияние.",
    author: "Г. Адамс",
    country: "👨‍🏫"
  },
  {
    text: "Кто не идет вперед, тот идет назад: стоячего положения нет.",
    author: "В.Г. Белинский",
    country: "🚶"
  },
  {
    text: "Гордиться славою своих предков не только можно, но и должно.",
    author: "А.С. Пушкин",
    country: "📜"
  },
  {
    text: "Мы должны строить своё будущее на прочном фундаменте. И такой фундамент – это патриотизм.",
    author: "В.В. Путин",
    country: "🇷🇺"
  },
  {
    text: "Россия была, есть и будет крепка традиционными ценностями.",
    author: "В.В. Путин",
    country: "🇷🇺"
  },
  {
    text: "Важно не количество знаний, а качество их. Можно знать очень многое, не зная самого нужного.",
    author: "Л.Н. Толстой",
    country: "📚"
  },
  {
    text: "Образование — величайшее благо для человека. Без образования люди грубы и бедны.",
    author: "Н.Г. Чернышевский",
    country: "🎓"
  },
  {
    text: "Учиться надо всю жизнь, до последнего дыхания.",
    author: "Сюнь-цзы",
    country: "📖"
  },
  {
    text: "Школа должна воспитывать людей, умеющих думать, а не только владеющих знаниями.",
    author: "В.А. Сухомлинский",
    country: "🧠"
  },
  {
    text: "Беларусь — это страна, которая ценит мир, стабильность и согласие.",
    author: "А.Г. Лукашенко",
    country: "🇧🇾"
  },
  {
    text: "История доказала, что у нас хватит сил сохранить свою независимость.",
    author: "А.Г. Лукашенко",
    country: "🇧🇾"
  },
  {
    text: "Нравственность — это разум сердца.",
    author: "Генрих Гейне",
    country: "❤️"
  },
  {
    text: "Тот, кто не помнит своего прошлого, осужден на то, чтобы пережить его вновь.",
    author: "Джордж Сантаяна",
    country: "🕰️"
  },
  {
    text: "Культура — это память. Поэтому она связана с историей, всегда подразумевает непрерывность нравственной, интеллектуальной, духовной жизни человека, общества и человечества.",
    author: "Ю.М. Лотман",
    country: "🏛️"
  },
  {
    text: "Если вы удачно выберете труд и вложите в него свою душу, то счастье само отыщет вас.",
    author: "К.Д. Ушинский",
    country: "🌟"
  },
  {
    text: "Наука есть ясное познание истины, просвещение разума.",
    author: "М.В. Ломоносов",
    country: "💡"
  }
];

const QuoteDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState<typeof quotes[0]>();
  
  // Эффект, который обновляет цитату каждые 60 секунд
  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };
    
    // Устанавливаем начальную цитату
    setCurrentQuote(getRandomQuote());
    
    // Обновляем цитату каждые 60 секунд
    const interval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!currentQuote) return null;
  
  return (
    <div className="bg-gray-100 py-8 px-4 my-8 rounded-lg shadow-sm">
      <div className="max-w-3xl mx-auto text-center">
        <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          "{currentQuote.text}"
        </blockquote>
        <div className="flex items-center justify-center">
          <cite className="text-gray-600 not-italic font-semibold">
            — {currentQuote.author} {currentQuote.country}
          </cite>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
