import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fingerprint, Target, Crown, Zap } from 'lucide-react';

// Using local paths ensures Vercel will ALWAYS find the file.
const fragrances = [
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", image: "/sauvage.png", dupe: { name: "Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", image: "/lemale.png", dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 3, type: "Designer", name: "Most Wanted", brand: "Azzaro", image: "/mostwanted.png", dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", image: "/myslf.png", dupe: { name: "Sheikh Al Shuyukh", brand: "Lattafa", price: "25 CHF" }},
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", image: "/ombre.png", dupe: { name: "Afkar", brand: "Lattafa", price: "34 CHF" }},
  { id: 6, type: "Niche", name: "Aventus", brand: "Creed", image: "/aventus.png", dupe: { name: "Club de Nuit", brand: "Armaf", price: "35 CHF" }},
  { id: 7, type: "Niche", name: "Naxos", brand: "Xerjoff", image: "/naxos.png", dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }},
  { id: 8, type: "Niche", name: "Layton", brand: "PDM", image: "/layton.png", dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }},
  { id: 9, type: "Niche", name: "Angels' Share", brand: "Kilian", image: "/angels.png", dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }},
  { id: 10, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", image: "/ganymede.png", dupe: { name: "Sept VII", brand: "Paris Corner", price: "52 CHF" }},
  { id: 20, type: "Dupes", name: "9PM", brand: "Afnan", image: "/9pm.png", dupe: { name: "Ultra Male Alt", brand: "Afnan", price: "30 CHF" }},
  { id: 17, type: "Dupes", name: "Asad", brand: "Lattafa", image: "/asad.png", dupe: { name: "Sauvage Alt", brand: "Lattafa", price: "28 CHF" }},
  { id: 13, type: "Arabian", name: "Khamrah", brand: "Lattafa", image: "/khamrah.png", dupe: { name: "Angel's Share Alt", brand: "Lattafa", price: "45 CHF" }},
  { id: 19, type: "Arabian", name: "Hawas", brand: "Rasasi", image: "/hawas.png", dupe: { name: "Invictus Alt", brand: "Rasasi", price: "55 CHF" }},
  // Add remaining 6 items following this pattern...
];

const creators = [
  { id: "noel", name: "Noel Thomas", profileImg: "/channels4_profile.jpg", icon: <Target size={20}/>, tagline: "THE TOTAL LOOK." },
  { id: "jeremy", name: "Jeremy Fragrance", profileImg: "/jeremy.jpg", icon: <Crown size={20}/>, tagline: "POWER." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [selectedFrag, setSelectedFrag] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return fragrances.filter(f => 
      f.name.toLowerCase().includes(search.toLowerCase()) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f0f0f0] font-light">
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/60 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
            <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-600"}>Archive</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? "text-amber-500" : "text-gray-600"}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center mb-24 space-y-12">
          <input 
            type="text" 
            placeholder="SEARCH ARCHIVE..." 
            className="bg-transparent border-b border-white/10 py-4 w-full max-w-lg text-center text-xl uppercase tracking-widest outline-none focus:border-amber-500 transition-colors" 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <div className="flex gap-4">
            {["All", "Arabian", "Niche", "Designer", "Dupes"].map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-6 py-1 text-[10px] border tracking-widest uppercase transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((f) => (
            <div key={f.id} onClick={() => setSelectedFrag(f)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-8 hover:bg-white/[0.03] transition-all">
              <div className="aspect-[3/4] mb-6 flex items-center justify-center bg-zinc-900 rounded-sm p-4 overflow-hidden">
                <img 
                  src={f.image} 
                  className="h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  alt={f.name} 
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300x400?text=Image+Missing'}
                />
              </div>
              <div className="text-center">
                <p className="text-[8px] text-amber-500 font-bold tracking-widest uppercase mb-1">{f.brand}</p>
                <h3 className="text-md font-light tracking-widest uppercase text-white">{f.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedFrag && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#080808] max-w-5xl w-full h-[70vh] border border-white/10 flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedFrag(null)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"><X size={32} /></button>
              <div className="flex-1 bg-white p-12 flex items-center justify-center">
                <img src={selectedFrag.image} className="max-h-full object-contain" alt={selectedFrag.name} />
              </div>
              <div className="flex-1 p-12 overflow-y-auto">
                <p className="text-amber-500 font-bold tracking-widest text-[10px] uppercase mb-4">{selectedFrag.brand} • {selectedFrag.type}</p>
                <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-8 leading-tight">{selectedFrag.name}</h2>
                <div className="bg-amber-500/[0.05] border border-amber-500/10 p-6">
                  <div className="flex items-center gap-2 text-amber-500 mb-2">
                    <Fingerprint size={16} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Value Alternative</h4>
                  </div>
                  <p className="text-white/80 italic">"{selectedFrag.dupe.name} by {selectedFrag.dupe.brand} — {selectedFrag.dupe.price}"</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const container = document.getElementById('root');
if (container) { createRoot(container).render(<App />); }
