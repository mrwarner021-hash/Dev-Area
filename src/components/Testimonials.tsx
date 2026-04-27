import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { db, collection, onSnapshot, query, orderBy } from '../lib/firebase';
import { Testimonial } from '../types';

function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
  console.error(`Firestore Error [${operationType}] at ${path}:`, error);
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const path = 'testimonials';
    const q = query(collection(db, path), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(data);
    }, (error) => {
      handleFirestoreError(error, 'LIST', path);
    });

    return () => unsubscribe();
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="flex flex-col items-center text-center mb-20">
          <Quote className="text-amber-500 w-12 h-12 mb-8 opacity-50" />
          <h2 className="text-5xl font-bold tracking-tight">VOICES OF TRUST</h2>
        </div>

        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl w-full text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="text-amber-500 fill-amber-500 w-5 h-5" />
                ))}
              </div>
              
              <blockquote className="text-3xl md:text-4xl font-serif italic leading-snug mb-12 text-white/90">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex flex-col items-center">
                <img 
                  src={testimonials[currentIndex].avatarUrl} 
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mb-4 grayscale hover:grayscale-0 transition-all duration-500 border-2 border-white/10 p-1"
                  referrerPolicy="no-referrer"
                />
                <h4 className="font-bold text-xl">{testimonials[currentIndex].name}</h4>
                <p className="text-white/40 text-sm uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-0 md:px-12 pointer-events-none">
            <button 
              onClick={prev}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all pointer-events-auto"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={next}
              className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all pointer-events-auto"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'w-12 bg-amber-500' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
