import Hero from './components/Hero';
import Story from './components/Story';
import Details from './components/Details';
import Timer from './components/Timer';
import RSVPForm from './components/RSVPForm';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Story />
      <Details />
      <Timer />
      <RSVPForm />

      <footer className="py-8 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="text-sm" style={{ color: 'var(--color-terracotta)', opacity: 0.7 }}>
          С любовью, Вадим & Азиза
        </p>
      </footer>
    </div>
  );
}

export default App;
