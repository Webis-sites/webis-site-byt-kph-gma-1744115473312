'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "מה שעות הפעילות של בית קפה גמא?",
      answer: "בית קפה גמא פתוח בימים א'-ה' בין השעות 07:00-23:00, בימי שישי בין השעות 07:00-16:00, ובשבת בין השעות 09:00-23:00. בחגים יתכנו שינויים בשעות הפעילות, אנא עקבו אחר העדכונים בדף הפייסבוק שלנו."
    },
    {
      id: 2,
      question: "האם ניתן להזמין מקום מראש?",
      answer: "בהחלט! ניתן להזמין מקום מראש דרך האתר שלנו, באמצעות הטלפון 03-1234567, או דרך האפליקציה שלנו. אנו ממליצים להזמין מקום מראש בסופי שבוע ובשעות העומס. הזמנות לקבוצות של 8 אנשים ומעלה מחייבות הזמנה מראש."
    },
    {
      id: 3,
      question: "האם יש לכם אירועים מיוחדים?",
      answer: "כן, בית קפה גמא מארח מגוון אירועים מיוחדים כמו ערבי מוזיקה חיה בימי חמישי, סדנאות אפייה בימי ראשון, וטעימות יין חודשיות. לוח האירועים המלא מתפרסם באתר שלנו ובדף הפייסבוק בתחילת כל חודש."
    },
    {
      id: 4,
      question: "האם יש אפשרויות לתזונה מיוחדת (טבעוני, ללא גלוטן)?",
      answer: "בהחלט! התפריט שלנו כולל מגוון אפשרויות טבעוניות, צמחוניות, ומנות ללא גלוטן. כל המנות המיוחדות מסומנות בתפריט, ואנחנו תמיד שמחים להתאים מנות לפי דרישות תזונתיות מיוחדות. אנא יידעו את המלצר/ית שלכם לגבי כל אלרגיה או העדפה תזונתית."
    },
    {
      id: 5,
      question: "האם ניתן להזמין עוגות מיוחדות לאירועים?",
      answer: "כן, הקונדיטוריה שלנו מציעה עוגות מיוחדות לימי הולדת, אירועים משפחתיים, ואירועים עסקיים. יש להזמין לפחות 48 שעות מראש. ניתן לבחור מהתפריט שלנו או ליצור עוגה מותאמת אישית. צרו קשר עם צוות הקונדיטוריה שלנו בטלפון 03-1234568."
    },
    {
      id: 6,
      question: "האם יש חנייה בקרבת מקום?",
      answer: "יש חניון ציבורי במרחק של 50 מטר מבית הקפה. לקוחות בית הקפה זכאים להנחה של 20% בחניון זה (יש לבקש שובר בקופה). בנוסף, ישנה חנייה ברחוב ללא תשלום אחרי השעה 19:00 ובימי שישי-שבת."
    },
    {
      id: 7,
      question: "האם ניתן לקיים אירועים פרטיים בבית הקפה?",
      answer: "בהחלט! בית קפה גמא מציע אפשרות לאירועים פרטיים כמו ימי הולדת, מסיבות רווקות/רווקים, אירועים עסקיים ועוד. ניתן לשכור את החלל כולו או חלק ממנו, בהתאם לגודל האירוע. אנו מציעים תפריטים מיוחדים לאירועים. לפרטים נוספים ותיאום, אנא צרו קשר עם מנהל האירועים שלנו."
    },
    {
      id: 8,
      question: "האם יש אינטרנט אלחוטי (Wi-Fi) בבית הקפה?",
      answer: "כן, בית קפה גמא מציע אינטרנט אלחוטי מהיר וחופשי לכל הלקוחות. הסיסמה מתחלפת מדי שבוע ומופיעה על הקבלה שלכם או שניתן לבקש אותה מהמלצר/ית."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl shadow-neumorphic" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">שאלות נפוצות</h2>
        
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-glass border border-white/20 overflow-hidden"
            >
              <button
                className="w-full text-right p-5 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-opacity-75"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={activeIndex === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    activeIndex === faq.id 
                      ? 'bg-secondary text-white shadow-inner' 
                      : 'bg-primary/10 text-gray-600 shadow-neumorphic-sm'
                  }`}
                >
                  {activeIndex === faq.id ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;