import { useEffect, useRef, useState } from 'react';

export default function Story() {
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

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-20 px-4 relative"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={`font-[var(--font-serif)] text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ color: 'var(--color-gold)' }}
        >
          Как всё начиналось
        </h2>

        <div
          className={`bg-[var(--color-light-bg)] rounded-xl p-8 md:p-12 border border-[var(--color-beige)] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            transitionDelay: '0.2s',
            boxShadow: '0 4px 20px rgba(201, 169, 97, 0.1)'
          }}
        >
          <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text)' }}>
            <p>
              Всё началось <strong>23 октября 2021 года</strong>.
            </p>

            <p>
              Незадолго до этого мы впервые сели в самолёт и отправились — тогда ещё просто как друзья — в Египет. Просто отдохнуть...
            </p>

            <p>
              Там мы проводили очень много времени вместе: часто сидели по ночам у бассейна, разговаривали обо всём на свете, смотрели на звёзды.
              Первый полёт за границу без родителей + максимальный релакс = история, которая осталась в сердце навсегда.
            </p>

            <p>
              Но когда мы вернулись в Россию и "розовые очки" спали, мы поняли: дело было не в очках.
              Просто встретились два человека, которые искренне любят друг друга и хотят прожить эту жизнь вместе.
            </p>

            <p>
              И вот мы уже почти <strong>5 лет вместе</strong>. И это только начало...
            </p>

            <p>
              Сейчас мы ждём малыша. Пока не знаем, кто это будет, но точно знаем: это станет одним из самых важных событий в нашей жизни.
            </p>

            <p className="text-right italic pt-4" style={{ color: 'var(--color-gold)', fontSize: '1.1rem' }}>
              С любовью, Вадим Позняк
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
