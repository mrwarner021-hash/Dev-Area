import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="connect" className="py-32 px-8 bg-white text-black min-h-screen flex items-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
      >
        <div className="space-y-12">
          <motion.div variants={itemVariants}>
            <span className="text-black/30 text-xs uppercase tracking-[0.5em] font-bold block mb-4">Phase 01: Connect</span>
            <h2 className="text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 uppercase italic font-serif">
              Initiate Your<br/>
              <span className="relative inline-block">
                Transcription.
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  className="absolute bottom-2 left-0 h-2 bg-amber-500/20 -z-10"
                />
              </span>
            </h2>
            <p className="text-xl text-black/60 max-w-md leading-relaxed">
              Every great venture begins with a simple transmission. Define your parameters and let's construct the future.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            {[
              { label: 'general@devarea.io', icon: ArrowRight },
              { label: '+1 (555) 089 4422', icon: ArrowRight }
            ].map((contact, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-pointer w-fit"
              >
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <contact.icon size={18} />
                </div>
                <span className="font-bold uppercase tracking-widest text-[10px] group-hover:tracking-[0.2em] transition-all duration-500">{contact.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                className="bg-black/5 p-12 rounded-[2rem] border border-black/5 relative overflow-hidden"
              >
                {/* Background Focus Glow */}
                <motion.div 
                  animate={{ 
                    opacity: focusedField ? 0.3 : 0,
                    scale: focusedField ? 1.2 : 1 
                  }}
                  className="absolute -top-1/2 -right-1/2 w-full h-full bg-amber-500/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000"
                />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField 
                      label="Identity" 
                      placeholder="Name" 
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <InputField 
                      label="Frequency" 
                      type="email"
                      placeholder="Email Address" 
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Project Classification</label>
                    <div className="relative">
                      <select 
                        onFocus={() => setFocusedField('category')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:border-black outline-none transition-all text-black/60 focus:text-black appearance-none cursor-pointer"
                      >
                        <option>Strategy & Branding</option>
                        <option>Interface Design</option>
                        <option>System Development</option>
                        <option>Immersive Art</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                        <ArrowRight size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">The Brief</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your objectives..."
                      onFocus={() => setFocusedField('brief')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-black/20 py-4 focus:border-black outline-none transition-all placeholder:text-black/20 resize-none"
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className="group relative w-full py-6 bg-black text-white font-bold uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 overflow-hidden rounded-xl disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {loading ? (
                        <>
                          Transmitting
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send size={16} />
                          </motion.div>
                        </>
                      ) : (
                        <>Inquiry Transmission <Send size={16} className="group-hover:translate-x-2 transition-transform" /></>
                      )}
                    </span>
                    <motion.div 
                      initial={false}
                      animate={{ x: loading ? '0%' : '-100%' }}
                      className="absolute inset-0 bg-amber-600 -z-0"
                    />
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="text-center py-24 bg-black p-12 rounded-[2rem] text-white shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-24 h-24 text-amber-500 mx-auto mb-8" />
                </motion.div>
                <h3 className="text-4xl font-bold mb-4 italic font-serif">Transmission Received.</h3>
                <p className="text-white/40 mb-12 uppercase text-[10px] tracking-widest leading-loose">
                  Our systems have processed your parameters.<br/>
                  A response will be modulated within 48 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  Terminate Connection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">{label}</label>
      <input 
        required
        {...props}
        className="w-full bg-transparent border-b border-black/20 py-4 focus:border-black outline-none transition-all placeholder:text-black/20"
      />
    </div>
  );
}
