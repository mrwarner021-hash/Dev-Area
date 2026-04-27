import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';
import CMS from './components/CMS';

export default function App() {
  const [isCMS, setIsCMS] = useState(false);

  useEffect(() => {
    // Hidden shortcut for CMS access: Press C + M + S simultaneously
    // Or just use the URL hash #cms
    const handleHash = () => setIsCMS(window.location.hash === '#cms');
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (isCMS) return <CMS />;

  return (
    <ThemeProvider>
      <div className="bg-black min-h-screen selection:bg-amber-500 selection:text-black">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Showcase />
          <Testimonials />
          <Blog />
          <Inquiry />
        </main>
        <Footer />
        
        {/* Secret CMS Access Hint */}
        <div className="fixed bottom-4 right-4 opacity-5 hover:opacity-100 transition-opacity">
          <a href="#cms" className="text-[10px] text-white uppercase tracking-widest font-bold border border-white/20 px-3 py-1 rounded">
            Access CMS
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}
