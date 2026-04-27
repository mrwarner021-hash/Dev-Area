import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
    >
      <div className="text-white font-sans font-bold text-2xl tracking-tighter">
        DEVAREA<span className="text-amber-500">.</span>
      </div>
      
      <div className="hidden md:flex items-center gap-12">
        {[
          { name: 'Innovation', href: '#innovation' },
          { name: 'Showcase', href: '#showcase' },
          { name: 'Insights', href: '#culture' },
          { name: 'Inquiry', href: '#connect' }
        ].map((item) => (
          <a 
            key={item.name}
            href={item.href}
            className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-medium"
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white/80 hover:text-white text-xs uppercase tracking-widest font-semibold border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
          Inquiry
        </button>
      </div>
    </motion.nav>
  );
}
