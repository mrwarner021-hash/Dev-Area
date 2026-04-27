import { motion } from 'motion/react';
import { Zap, Globe, Sparkles, Layers } from 'lucide-react';

const features = [
  {
    title: "Precision Engineering",
    desc: "Crafted with the highest attention to detail, ensuring every interaction feels purposeful.",
    icon: Zap,
    color: "bg-blue-500",
    size: "md:col-span-2"
  },
  {
    title: "Global Reach",
    desc: "Optimized for performance across all regions and networks.",
    icon: Globe,
    color: "bg-amber-500",
    size: "md:col-span-1"
  },
  {
    title: "Pure Aesthetics",
    desc: "Visuals that transcend the screen to create lasting impressions.",
    icon: Sparkles,
    color: "bg-purple-500",
    size: "md:col-span-1"
  },
  {
    title: "Infinite Layers",
    desc: "Deep architectural stack designed for scalability and robustness.",
    icon: Layers,
    color: "bg-emerald-500",
    size: "md:col-span-2"
  }
];

export default function Features() {
  return (
    <section id="innovation" className="py-32 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-bold tracking-tighter mb-8 leading-none">REFINING THE{"\n"}DIGITAL INTERFACE.</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              We don't just build websites; we design digital landscapes that react, evolve, and engage users on a primal level.
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.4em] font-bold text-amber-500/50 [writing-mode:vertical-rl] hidden md:block">
            Standard 2026 / v1.4
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`${f.size} group relative overflow-hidden bg-white/5 border border-white/10 p-12 flex flex-col justify-between min-h-[400px] rounded-3xl transition-all hover:bg-white/10`}
            >
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-12`}>
                <f.icon className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed uppercase text-[10px] tracking-widest">{f.desc}</p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t border-r border-white/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
