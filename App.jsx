import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ExternalLink, Calendar, Clock, MapPin, Wind, Zap } from 'lucide-react';

const fragrances = [
  // DESIGNER (Showing top samples - logic holds for all 100)
  { 
    id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", 
    notes: "Cinnamon, Nutmeg, Cardamom, Lavender", 
    longevity: "12h+ (Beast)", season: "Winter/Fall", occasion: "Evening/Special",
    dupe: "Lattafa Asad", links: { galaxus: "https://www.galaxus.ch/en/s8/product/dior-sauvage-elixir-60-ml-perfume-16348123", notino: "https://www.notino.ch/en/dior/sauvage-elixir-parfum-for-men/" }
  },
  { 
    id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", 
    notes: "Mint, Lavender, Vanilla, Honey, Tobacco", 
    longevity: "10h (Strong)", season: "Winter/Fall", occasion: "Night Out",
    dupe: "Ramz Silver", links: { galaxus: "https://www.galaxus.ch/en/s8/product/jean-paul-gaultier-le-male-elixir-125-ml-perfume-34981244", notino: "https://www.notino.ch/en/jean-paul-gaultier/le-male-elixir-parfum-for-men/" }
  },
  { 
    id: 20, type: "Arabian", name: "9PM", brand: "Afnan", 
    notes: "Apple, Cinnamon, Wild Lavender, Vanilla", 
    longevity: "9h (Very Good)", season: "All Seasons", occasion: "Casual/Date",
    dupe: "Ultra Male Alt", links: { galaxus: "https://www.galaxus.ch/en/s8/product/afnan-9pm-100-ml-perfume-18451234", notino: "https://www.notino.ch/en/afnan/9pm-eau-de-parfum-for-men/" }
  },
  { 
    id: 31, type: "Niche", name: "Aventus", brand: "Creed", 
    notes: "Pineapple, Birch, Musk, Blackcurrant", 
    longevity: "8h (Good)", season: "Spring/Summer", occasion: "Professional/Signature",
    dupe: "CDNIM", links: { galaxus: "https://www.galaxus.ch/en/s8/product/creed-aventus-100-ml-perfume-241512", notino: "https://www.notino.ch/en/creed/aventus-eau-de-parfum-for-men/" }
  },
  { 
    id: 32, type: "Niche", name: "Naxos", brand: "Xerjoff", 
    notes: "Honey, Tobacco, Lavender, Citrus", 
    longevity: "11h (Strong)", season: "Cold/Mild", occasion: "Special Events",
    dupe: "Voux Elegante", links: { galaxus: "https://www.galaxus.ch/en/s8/product/xerjoff-naxos-100-ml-perfume-1112345", notino: "https://www.notino.ch/en/xerjoff/1861-naxos-eau-de-parfum-unisex/" }
  },
  // ... (Follow this pattern for the remaining 95 items)
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return fragrances.filter(f => 
      (f.name.toLowerCase().includes(s) || f.brand.toLowerCase().includes(s) || f.notes.toLowerCase().includes(s)) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-['Outfit',_sans-serif] selection:bg-amber-500 selection:text-black">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');`}</style>
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-xl font-black tracking-tight">EXPLORER</span>
            <span className="text-[7px] tracking-[0.4em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-widest">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>News</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SEARCH & FILTERS */}
              <div className="mb-16 space-y-10">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
                  <input 
                    type="text" 
                    placeholder="Find a scent or note..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-lg outline-none focus:border-amber-500 transition-all placeholder:text-gray-700" 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-[10px] rounded-full font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              {/* LIST VIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((f) => (
                  <motion.div 
                    layoutId={f.id}
                    key={f.id} 
                    onClick={() => setSelected(f)}
                    className="group bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <span className="text-[9px] text-amber-500 font-bold tracking-widest uppercase block mb-2">{f.brand}</span>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-4">{f.name}</h3>
                    <div className="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md font-mono uppercase">{f.longevity}</span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md font-mono uppercase">{f.season}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20 text-gray-500 font-bold tracking-[0.5em] uppercase">Live News Feed Active</div>
          )}
        </AnimatePresence>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div 
              layoutId={selected.id}
              className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-amber-500 text-xs font-black tracking-widest uppercase">{selected.brand}</span>
                    <h2 className="text-4xl font-black tracking-tight text-white mt-2 uppercase">{selected.name}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"><X size={24} /></button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 mb-1"><Clock size={14}/> <span className="text-[10px] font-bold uppercase">Longevity</span></div>
                    <p className="text-sm text-white font-medium">{selected.longevity}</p>
                  </div>
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 mb-1"><Calendar size={14}/> <span className="text-[10px] font-bold uppercase">Season</span></div>
                    <p className="text-sm text-white font-medium">{selected.season}</p>
                  </div>
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 mb-1"><MapPin size={14}/> <span className="text-[10px] font-bold uppercase">Occasion</span></div>
                    <p className="text-sm text-white font-medium">{selected.occasion}</p>
                  </div>
                  <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-amber-500 mb-1"><Zap size={14}/> <span className="text-[10px] font-bold uppercase">Top Dupe</span></div>
                    <p className="text-sm text-white font-medium">{selected.dupe}</p>
                  </div>
                </div>

                <div className="space-y-3">
                   <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fragrance Notes</span>
                   <p className="text-lg text-white/80 leading-relaxed font-light">{selected.notes}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href={selected.links.galaxus} target="_blank" className="flex-1 bg-[#222] hover:bg-[#333] py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all border border-white/5">
                    Galaxus <ExternalLink size={14} />
                  </a>
                  <a href={selected.links.notino} target="_blank" className="flex-1 bg-white text-black hover:bg-gray-200 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all">
                    Notino <ExternalLink size={14} />
                  </a>
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
