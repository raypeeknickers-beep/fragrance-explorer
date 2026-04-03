import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Clock, MapPin, Zap, Wind } from 'lucide-react';

const fragrances = [
  { 
    id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", 
    topNotes: "Cinnamon, Nutmeg, Cardamom", 
    middleNotes: "Lavender, Grapefruit",
    longevity: "12h+ (Beast)", season: "Winter/Fall", occasion: "Evening/Special",
    dupe: "Lattafa Asad"
  },
  { 
    id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", 
    topNotes: "Mint, Lavender", 
    middleNotes: "Vanilla, Honey, Tobacco",
    longevity: "10h (Strong)", season: "Winter/Fall", occasion: "Night Out",
    dupe: "Ramz Silver"
  },
  { 
    id: 20, type: "Arabian", name: "9PM", brand: "Afnan", 
    topNotes: "Apple, Cinnamon, Wild Lavender", 
    middleNotes: "Orange Blossom, Lily-of-the-Valley",
    longevity: "9h (Very Good)", season: "All Seasons", occasion: "Casual/Date",
    dupe: "Ultra Male Alt"
  },
  { 
    id: 31, type: "Niche", name: "Aventus", brand: "Creed", 
    topNotes: "Pineapple, Bergamot, Blackcurrant", 
    middleNotes: "Birch, Patchouli, Moroccan Jasmine",
    longevity: "8h (Good)", season: "Spring/Summer", occasion: "Professional/Signature",
    dupe: "Club de Nuit Intense"
  },
  { 
    id: 34, type: "Niche", name: "Angels' Share", brand: "Kilian", 
    topNotes: "Cognac", 
    middleNotes: "Cinnamon, Tonka Bean, Oak",
    longevity: "9h (Long Lasting)", season: "Winter", occasion: "Date Night",
    dupe: "Lattafa Khamrah"
  },
  // ... Imagine 95 more entries following this exact structure
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return fragrances.filter(f => 
      (f.name.toLowerCase().includes(s) || f.brand.toLowerCase().includes(s)) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-['Outfit',_sans-serif] selection:bg-amber-500 selection:text-black">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');`}</style>
      
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-xl font-black tracking-tight">EXPLORER</span>
            <span className="text-[7px] tracking-[0.4em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-widest">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-500"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-500"}>News</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-16 space-y-10 text-center">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search the vault..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-lg outline-none focus:border-amber-500 transition-all" 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-[10px] rounded-full font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((f) => (
                  <div 
                    key={f.id} 
                    onClick={() => setSelected(f)}
                    className="group bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] hover:border-amber-500/30 transition-all cursor-pointer"
                  >
                    <span className="text-[9px] text-amber-500 font-bold tracking-[0.2em] uppercase block mb-1">{f.brand}</span>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-4 uppercase">{f.name}</h3>
                    <div className="flex gap-2">
                      <span className="text-[9px] text-gray-500 border border-white/10 px-2 py-0.5 rounded-full uppercase">{f.season}</span>
                      <span className="text-[9px] text-gray-500 border border-white/10 px-2 py-0.5 rounded-full uppercase">{f.longevity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-2xl mx-auto py-20 text-center">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Coming Soon</h2>
              <p className="text-gray-500">Live release feed for the Swiss market is currently being indexed.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative">
              <button onClick={() => setSelected(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"><X size={20} /></button>
              
              <div className="p-12 space-y-10">
                <div>
                  <span className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase">{selected.brand} Archive</span>
                  <h2 className="text-4xl font-black tracking-tighter text-white mt-2 uppercase">{selected.name}</h2>
                </div>

                <div className="space-y-6 text-sm">
                  <div className="space-y-1">
                    <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">Top Notes:</span>
                    <p className="text-white text-lg font-light leading-snug">{selected.topNotes}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">Middle Notes:</span>
                    <p className="text-white text-lg font-light leading-snug">{selected.middleNotes}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <Clock size={14} className="text-amber-500 mb-2" />
                    <span className="text-[8px] text-gray-500 uppercase font-black block">Longevity</span>
                    <p className="text-xs font-bold text-white uppercase">{selected.longevity}</p>
                  </div>
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <Zap size={14} className="text-amber-500 mb-2" />
                    <span className="text-[8px] text-gray-500 uppercase font-black block">Top Dupe</span>
                    <p className="text-xs font-bold text-white uppercase">{selected.dupe}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <div className="flex-1">
                    <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Season</span>
                    <p className="text-xs text-white uppercase">{selected.season}</p>
                  </div>
                  <div className="flex-1">
                    <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Occasion</span>
                    <p className="text-xs text-white uppercase">{selected.occasion}</p>
                  </div>
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
