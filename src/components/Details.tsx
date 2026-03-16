import { useEffect, useRef, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function Details() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const openMap = () => {
    window.open('https://yandex.ru/maps/?text=Никоси+Реутов+Юбилейный+проспект+70', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`font-[var(--font-serif)] text-4xl md:text-5xl font-bold text-center mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ color: 'var(--color-gold)' }}
        >
          Где и когда
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className={`flex items-start gap-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="animate-icon-rotate">
              <Clock size={32} className="text-[var(--color-gold)] flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-[var(--font-serif)] text-2xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                Сбор гостей
              </h3>
              <p className="text-lg" style={{ color: 'var(--color-terracotta)' }}>
                16:00
              </p>
            </div>
          </div>

          <div
            className={`flex items-start gap-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="animate-icon-rotate">
              <MapPin size={32} className="text-[var(--color-gold)] flex-shrink-0" />
            </div>
            <div>
              <h3 className="font-[var(--font-serif)] text-2xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                Место проведения
              </h3>
              <p className="text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                Ресторан «Никоси»
              </p>
              <p className="text-base" style={{ color: 'var(--color-terracotta)', opacity: 0.9 }}>
                г. Реутов, Юбилейный проспект, 70
              </p>
            </div>
          </div>
        </div>

        <div
          className={`text-center transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <button
            onClick={openMap}
            className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: 'var(--color-gold)',
              boxShadow: '0 4px 15px rgba(201, 169, 97, 0.3)'
            }}
          >
            Показать на карте
          </button>
        </div>

        <div
          className={`mt-16 p-8 rounded-xl border transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '0.4s',
            backgroundColor: 'var(--color-light-bg)',
            borderColor: 'var(--color-beige)'
          }}
        >
          <h3 className="font-[var(--font-serif)] text-2xl font-semibold mb-4 text-center" style={{ color: 'var(--color-gold)' }}>
            Пожелания гостям
          </h3>
          <p className="text-center mb-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text)' }}>
            Ваше присутствие — главный подарок. Если хотите сделать приятное — конверт с тёплыми словами будет кстати.
          </p>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-beige)' }}>
            <p className="font-semibold mb-2 text-center" style={{ color: 'var(--color-terracotta)' }}>
              Дресс-код: Elegant Casual
            </p>
            <p className="text-center text-sm md:text-base" style={{ color: 'var(--color-text)', opacity: 0.85 }}>
              Приветствуются пастельные, бежевые, золотистые и приглушённые оттенки.<br />
              Избегайте белого (цвет невесты) и чёрного.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes iconRotate {
          from {
            transform: rotate(-10deg);
            opacity: 0;
          }
          to {
            transform: rotate(0deg);
            opacity: 1;
          }
        }

        .animate-icon-rotate {
          animation: iconRotate 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
