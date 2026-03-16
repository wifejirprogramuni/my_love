import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const scrollToNext = () => {
    const storySection = document.getElementById('story');
    storySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-8 left-8 w-32 h-32 opacity-[0.06]">
        <svg viewBox="0 0 100 100" className="text-[var(--color-gold)]">
          <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="70" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="absolute bottom-12 right-12 w-40 h-40 opacity-[0.06]">
        <svg viewBox="0 0 100 100" className="text-[var(--color-beige)]">
          <path d="M50 20 L55 40 L50 35 L45 40 Z M50 35 L50 60 M45 55 Q50 65 55 55"
                fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div
        className={`max-w-md w-full text-center transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0s' }}
      >
        <div className="mb-8 relative inline-block">
          <img
            src="/photo_2026-03-16_03-48-40.jpg"
            alt="Вадим и Азиза"
            className="w-72 h-72 object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            style={{
              boxShadow: '0 10px 40px rgba(201, 169, 97, 0.25)',
            }}
          />
        </div>

        <h1
          className={`font-[var(--font-serif)] text-5xl md:text-6xl font-bold mb-4 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '0.2s',
            color: 'var(--color-text)'
          }}
        >
          Вадим <span className="text-[var(--color-gold)]">&</span> Азиза
        </h1>

        <p
          className={`font-[var(--font-serif)] text-2xl md:text-3xl mb-3 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '0.4s',
            color: 'var(--color-terracotta)'
          }}
        >
          3 апреля 2026
        </p>

        <p
          className={`text-base md:text-lg mb-8 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '0.6s',
            color: 'var(--color-text)',
            opacity: 0.8
          }}
        >
          Приглашаем разделить с нами этот особенный день
        </p>

        <button
          onClick={scrollToNext}
          className="animate-bounce text-[var(--color-gold)] hover:text-[var(--color-terracotta)] transition-colors duration-300"
          aria-label="Прокрутить вниз"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
