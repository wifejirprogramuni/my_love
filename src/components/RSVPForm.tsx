import { useEffect, useRef, useState } from 'react';

export default function RSVPForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [dish, setDish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Пожалуйста, введите ваше имя');
      return;
    }
    if (!dish) {
      setErrorMessage('Пожалуйста, выберите блюдо');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('access_key', '6d7628d8-398e-43c4-a1ce-7fccfe926ec2');
      formData.append('name', name.trim());
      formData.append('dish', dish === 'salmon' ? 'Стейк из лосося' : 'Говяжьи медальоны');
      formData.append('subject', 'Новый RSVP со свадебного сайта');
      formData.append('from_name', 'Свадебный сайт');

      // Опционально: если хочешь, чтобы в письме был reply-to на email гостя — добавь поле email в форму позже

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,  // FormData автоматически ставит правильный Content-Type multipart/form-data
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setName('');
        setDish('');
      } else {
        throw new Error(data.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitStatus('error');
      setErrorMessage('Не удалось отправить. Попробуйте ещё раз или проверьте соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2
          className={`font-[var(--font-serif)] text-4xl md:text-5xl font-bold text-center mb-12 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ color: 'var(--color-gold)' }}
        >
          Подтвердите, пожалуйста, участие
        </h2>

        {submitStatus === 'success' ? (
          <div
            className="text-center p-8 rounded-xl animate-fade-in"
            style={{
              backgroundColor: 'var(--color-light-bg)',
              border: '1px solid var(--color-beige)',
            }}
          >
            <div className="text-6xl mb-4">✓</div>
            <p className="text-2xl font-[var(--font-serif)] mb-2" style={{ color: 'var(--color-gold)' }}>
              Спасибо!
            </p>
            <p className="text-lg" style={{ color: 'var(--color-text)' }}>
              Ждём вас 3 апреля
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="transition-all duration-600" style={{ transitionDelay: '0.1s' }}>
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:scale-[1.01]"
                style={{
                  borderColor: 'var(--color-beige)',
                  backgroundColor: 'var(--color-light-bg)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-beige)')}
                placeholder="Введите ваше имя"
                disabled={isSubmitting}
              />
            </div>

            <div className="transition-all duration-600" style={{ transitionDelay: '0.2s' }}>
              <label className="block text-lg font-medium mb-4" style={{ color: 'var(--color-text)' }}>
                Что предпочитаете на горячее?
              </label>
              <div className="space-y-3">
                <label
                  className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    borderColor: dish === 'salmon' ? 'var(--color-gold)' : 'var(--color-beige)',
                    backgroundColor: dish === 'salmon' ? 'var(--color-light-bg)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="dish"
                    value="salmon"
                    checked={dish === 'salmon'}
                    onChange={(e) => setDish(e.target.value)}
                    className="w-5 h-5 mr-3"
                    disabled={isSubmitting}
                  />
                  <span className="text-lg">Стейк из лосося</span>
                </label>

                <label
                  className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    borderColor: dish === 'beef' ? 'var(--color-gold)' : 'var(--color-beige)',
                    backgroundColor: dish === 'beef' ? 'var(--color-light-bg)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="dish"
                    value="beef"
                    checked={dish === 'beef'}
                    onChange={(e) => setDish(e.target.value)}
                    className="w-5 h-5 mr-3"
                    disabled={isSubmitting}
                  />
                  <span className="text-lg">Говяжьи медальоны</span>
                </label>
              </div>
            </div>

            {errorMessage && (
              <div
                className="p-4 rounded-lg animate-shake"
                style={{
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  color: '#c33',
                }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: 'var(--color-gold)',
                boxShadow: '0 4px 15px rgba(201, 169, 97, 0.3)',
              }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}