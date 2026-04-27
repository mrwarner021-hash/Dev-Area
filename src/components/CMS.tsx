import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, LogIn, LayoutDashboard, MessageSquare, BookOpen, Settings, ExternalLink } from 'lucide-react';
import { auth, db, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy, signInWithGoogle, logout } from '../lib/firebase';
import { BlogPost, Testimonial, Category } from '../types';

function handleFirestoreError(error: unknown, operationType: string, path: string | null) {
  console.error(`Firestore Error [${operationType}] at ${path}:`, error);
}

export default function CMS() {
  const [user, setUser] = useState(auth.currentUser);
  const [activeTab, setActiveTab] = useState<'blog' | 'testimonials'>('blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => setUser(u));
    
    const qBlog = query(collection(db, 'blog'), orderBy('createdAt', 'desc'));
    const unsubscribeBlog = onSnapshot(qBlog, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
    }, error => handleFirestoreError(error, 'LIST', 'blog'));

    const qTest = query(collection(db, 'testimonials'), orderBy('name'));
    const unsubscribeTest = onSnapshot(qTest, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
    }, error => handleFirestoreError(error, 'LIST', 'testimonials'));

    return () => {
      unsubscribeAuth();
      unsubscribeBlog();
      unsubscribeTest();
    };
  }, []);

  const handleDelete = async (id: string, path: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await deleteDoc(doc(db, path, id));
    } catch (e) {
      handleFirestoreError(e, 'DELETE', path);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 p-12 rounded-[2rem] max-w-md w-full text-center"
        >
          <LayoutDashboard className="w-16 h-16 text-amber-500 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4 italic font-serif">DevArea CMS</h1>
          <p className="text-white/40 mb-12 uppercase text-[10px] tracking-[0.3em]">Authorized Personnel Only</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-amber-500 transition-colors rounded-xl"
          >
            <LogIn size={20} /> Access Control
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col p-8 bg-[#0a0a0a] sticky top-0 h-screen">
        <div className="text-2xl font-bold tracking-tighter mb-16 flex items-center gap-2">
          CMS<span className="text-amber-500">.</span>
        </div>

        <nav className="flex-1 space-y-4">
          <CMSNavLink 
            active={activeTab === 'blog'} 
            onClick={() => setActiveTab('blog')}
            icon={BookOpen}
            label="Editorial Posts"
          />
          <CMSNavLink 
            active={activeTab === 'testimonials'} 
            onClick={() => setActiveTab('testimonials')}
            icon={MessageSquare}
            label="Client Voices"
          />
          <a
            href="/"
            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] text-white/40 hover:text-white transition-all bg-white/5"
          >
            <ExternalLink size={18} /> View Live Site
          </a>
        </nav>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40 overflow-hidden">
            <img src={user.photoURL || ''} className="w-8 h-8 rounded-full border border-white/20" alt="avatar" />
            <span className="truncate">{user.displayName || user.email}</span>
          </div>
          <button 
            onClick={logout}
            className="text-left text-[10px] uppercase font-bold tracking-widest text-red-500/60 hover:text-red-500 transition-colors"
          >
            Exit Terminal
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-16 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-6xl font-bold italic font-serif mb-2">{activeTab === 'blog' ? 'Editorial' : 'Voices'}</h2>
              <p className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Refining the narrative landscape</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform flex-shrink-0">
              <Plus size={18} /> New Entry
            </button>
          </header>

          <div className="grid gap-6">
            {activeTab === 'blog' ? (
              posts.length > 0 ? posts.map(post => (
                <CMSItem 
                  key={post.id} 
                  title={post.title} 
                  meta={post.category} 
                  imageUrl={post.imageUrl}
                  onDelete={() => handleDelete(post.id!, 'blog')} 
                />
              )) : <EmptyState message="No editorial posts found." />
            ) : (
              testimonials.length > 0 ? testimonials.map(test => (
                <CMSItem 
                  key={test.id} 
                  title={test.name} 
                  meta={test.role} 
                  imageUrl={test.avatarUrl}
                  onDelete={() => handleDelete(test.id!, 'testimonials')} 
                />
              )) : <EmptyState message="No client testimonials found." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CMSItem({ title, meta, imageUrl, onDelete }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
      <div className="flex gap-6 items-center">
        {imageUrl ? (
          <img src={imageUrl} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Settings className="text-white/20" />
          </div>
        )}
        <div>
          <h4 className="text-xl font-bold mb-1 truncate max-w-md">{title}</h4>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">{meta}</p>
        </div>
      </div>
      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-4 bg-white/10 rounded-xl hover:bg-amber-500 hover:text-black transition-all">
          <Edit3 size={18} />
        </button>
        <button 
          onClick={onDelete}
          className="p-4 bg-white/10 rounded-xl hover:bg-red-500 transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
      <p className="text-white/20 italic font-serif text-2xl">{message}</p>
    </div>
  );
}

function CMSNavLink({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
        active ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );
}
