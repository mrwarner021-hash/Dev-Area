import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Paintbrush, Globe, Coffee } from 'lucide-react';

const samples = [
  {
    category: "Design",
    title: "Visual Language Systems",
    desc: "Crafting distinct identities for the next generation of digital-first brands.",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
    color: "text-amber-500"
  },
  {
    category: "Technology",
    title: "Neural Interface Prototypes",
    desc: "Exploration into low-latency human-computer interaction models.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    color: "text-blue-500"
  },
  {
    category: "Culture",
    title: "Urban Digital Integration",
    desc: "Studying the impact of ambient technology on community engagement.",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000",
    color: "text-purple-500"
  },
  {
    category: "Lifestyle",
    title: "Minimalist Workspaces",
    desc: "Designing environments that prioritize focus, flow, and creative clarity.",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000",
    color: "text-emerald-500"
  }
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-amber-500 text-xs uppercase tracking-[0.5em] font-bold block mb-4">The Portfolio</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
            CURATED<br/>SAMPLES.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 bg-white/5 border border-white/5">
          {samples.map((sample, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden bg-black flex flex-col justify-end p-12"
            >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <img 
                  src={sample.image} 
                  alt={sample.title}
                  className="w-full h-full object-cover grayscale scale-105 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-white/10 ${sample.color}`}>
                    <sample.icon size={20} />
                  </div>
                  <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                    {sample.category}
                  </span>
                </div>
                
                <h3 className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-amber-500 transition-colors">
                  {sample.title}
                </h3>
                
                <p className="text-white/40 text-sm max-w-sm mb-8 leading-relaxed">
                  {sample.desc}
                </p>

                <button className="flex items-center gap-2 text-white text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-2 group-hover:border-amber-500 transition-all">
                  Exploration Info <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <div className="w-12 h-12 border-t-2 border-r-2 border-amber-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
