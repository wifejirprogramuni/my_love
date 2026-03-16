import { useEffect, useRef, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Timer() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevTimeRef = useRef<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date('2026-04-03T16:00:00+03:00').getTime();

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      prevTimeRef.current = timeLeft;
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label, index }: { value: number; label: string; index: number }) => {
    const prevValue = prevTimeRef.current[label.toLowerCase() as keyof TimeLeft];
    const hasChanged = value !== prevValue;

    return (
      <div
        className={`flex flex-col items-center p-6 rounded-xl transition-all duration-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: `${index * 0.1}s`,
          backgroundColor: 'var(--color-light-bg)',
          boxShadow: '0 4px 20px rgba(201, 169, 97, 0.15)'
        }}
      >
        <div
          className={`text-5xl md:text-6xl font-bold font-[var(--font-serif)] ${
            hasChanged ? 'animate-pulse-scale' : ''
          }`}
          style={{ color: 'var(--color-gold)' }}
        >
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-sm md:text-base mt-2" style={{ color: 'var(--color-terracotta)' }}>
          {label}
        </div>
      </div>
    );
  };

  if (isExpired) {
    return (
      <section
        ref={sectionRef}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-[var(--font-serif)] text-4xl md:text-5xl font-bold mb-8"
            style={{ color: 'var(--color-gold)' }}
          >
            Мы уже поженились!
          </h2>
          <p className="text-2xl" style={{ color: 'var(--color-terracotta)' }}>
            Спасибо, что были с нами в этот особенный день
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className={`font-[var(--font-serif)] text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ color: 'var(--color-gold)' }}
        >
          До нашего дня осталось
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <TimeBlock value={timeLeft.days} label="дней" index={0} />
          <TimeBlock value={timeLeft.hours} label="часов" index={1} />
          <TimeBlock value={timeLeft.minutes} label="минут" index={2} />
          <TimeBlock value={timeLeft.seconds} label="секунд" index={3} />
        </div>
      </div>
    </section>
  );
}
