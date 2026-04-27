import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';
import { db, collection, onSnapshot, query, orderBy } from '../lib/firebase';
import { BlogPost, Category } from '../types';

function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
  console.error(`Firestore Error [${operationType}] at ${path}:`, error);
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<Category | 'All'>('All');

  useEffect(() => {
    const path = 'blog';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      } as BlogPost));
      setPosts(data);
    }, (error) => {
      handleFirestoreError(error, 'LIST', path);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <section id="culture" className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <h2 className="text-7xl font-bold tracking-tighter text-white uppercase">Insights</h2>
          
          <div className="flex flex-wrap gap-4">
            {['All', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full border text-xs uppercase tracking-widest font-bold transition-all ${
                  filter === cat 
                  ? 'bg-amber-500 border-amber-500 text-black' 
                  : 'border-white/20 text-white/40 hover:border-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/5] rounded-3xl bg-neutral-900 border border-white/5">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>

              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold">
                <span className="flex items-center gap-1"><Calendar size={12} className="text-amber-500" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><User size={12} className="text-amber-500" /> {post.author}</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2 leading-tight transition-colors group-hover:text-amber-500">
                {post.title}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                Read Article <ArrowUpRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
