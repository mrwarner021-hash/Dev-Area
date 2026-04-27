import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="py-24 px-8 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          <div className="text-white font-sans font-bold text-6xl tracking-tighter uppercase whitespace-pre-line">
            DEVAREA{"\n"}LABS
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold mb-4">Innovation HQ</p>
            <p className="text-white text-xl font-medium">888 Immersive Blvd,<br />San Francisco, CA 94103</p>
          </div>
        </div>

        <div className="md:col-span-4 space-y-8">
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Pioneering the next generation of digital interfaces. We design for the human experience, not just the screen.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">{s[0]}</a>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          {['Experience', 'Innovation', 'Culture', 'Connect'].map(title => (
            <div key={title}>
              <h4 className="text-amber-500 text-[10px] uppercase tracking-widest font-bold mb-6">{title}</h4>
              <ul className="space-y-4">
                {[1, 2, 3].map(i => (
                  <li key={i}><a href="#" className="text-white/40 hover:text-white transition-colors text-xs font-medium uppercase tracking-[0.1em]">Link {i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:col-span-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">© 2026 LUMINA LABS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
