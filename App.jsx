import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fingerprint, Target, Crown, Bell, Flame } from 'lucide-react';

const fragrances = [
  // CORRECTED IMAGES (Using high-reliability CDN links)
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw1578e19c/assets/Y0996460/Y0996460_E01.jpg", dupe: { name: "Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", image: "https://www.jeanpaulgaultier.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-jpg-master-catalog/default/dw1857997a/images/le-male/le-male-elixir-parfum-intense-125ml/JPG_Le_Male_Elixir_125ml_01.png", dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 3, type: "Designer", name: "Most Wanted", brand: "Azzaro", image: "https://www.azzaro.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-azzaro-master-catalog/default/dw7697380d/images/the-most-wanted/the-most-wanted-parfum-100ml/Azzaro_The_Most_Wanted_Parfum_100ml_01.png", dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 20, type: "Dupes", name: "9PM", brand: "Afnan", image: "https://fimgs.net/mdimg/perfume/m.64205.jpg", dupe: { name: "Ultra Male Alt", brand: "Afnan", price: "30 CHF" }}, // FIXED IMAGE
  { id: 6, type: "Niche", name: "Aventus", brand: "Creed", image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front.jpg", dupe: { name: "Club de Nuit", brand: "Armaf", price: "35 CHF" }},
  { id: 17, type: "Dupes", name: "Asad", brand: "Lattafa", image: "https://fimgs.net/mdimg/perfume/m.70420.jpg", dupe: { name: "Sauvage Alt", brand: "Lattafa", price: "28 CHF" }},
];

const newsDrops = [
  { id: 1, date: "APRIL 2026", name: "Eros Energy", brand: "Versace", status: "JUST DROPPED", desc: "The new citrus-heavy addition to the Eros line is now hitting Swiss shelves." },
  { id: 2, date: "MAY 2026", name: "Absolu Aventus", brand: "Creed", status: "RESTOCKING", desc: "Limited quantities are arriving at boutique retailers in Zurich next month." }
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
          <div className="flex gap-10 text-[9px] tracking-[0.4em] font-black uppercase">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-600"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-600"}>News</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? "text-amber-500" : "text-gray-600"}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center mb-24 space-y-12">
                <input type="text" placeholder="SEARCH ARCHIVE..." className="bg-transparent border-b border-white/10 py-4 w-full max-w-lg text-center text-xl uppercase tracking-widest outline-none focus:border-amber-500 transition-colors" onChange={(e) => setSearch(e.target.value)} />
                <div className="flex gap-4">
                  {["All", "Arabian", "Niche", "Designer", "Dupes"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-1 text-[10px] border tracking-widest uppercase transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500 hover:text-white'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((f) => (
                  <div key={f.id} onClick={() => setSelectedFrag(f)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-8 hover:bg-white/[0.03] transition-all">
                    <div className="aspect-[3/4] mb-6 flex items-center justify-center bg-white rounded-sm p-4 overflow-hidden">
                      <img src={f.image} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={f.name} />
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] text-amber-500 font-bold tracking-widest uppercase mb-1">{f.brand}</p>
                      <h3 className="text-md font-light tracking-widest uppercase text-white">{f.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : activeTab === 'news' ? (
            <motion.div key="news" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-16 flex items-center gap-4">Upcoming Drops <Bell className="text-amber-500" size={24} /></h2>
              <div className="space-y-8">
                {newsDrops.map(drop => (
                  <div key={drop.id} className="border border-white/5 bg-white/[0.02] p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <span className="text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase">{drop.date}</span>
                      <h3 className="text-3xl font-light uppercase tracking-widest text-white mt-2">{drop.brand} <span className="font-bold">{drop.name}</span></h3>
                      <p className="text-gray-500 mt-4 max-w-md">{drop.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 border border-amber-500/20 rounded-full">
                      <Flame size={14} className="text-amber-500" />
                      <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase">{drop.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
             <div className="text-center py-20 text-gray-500 uppercase tracking-widest">Creators section active</div>
          )}
        </AnimatePresence>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFrag && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#080808] max-w-5xl w-full h-[70vh] border border-white/10 flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedFrag(null)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={32} /></button>
              <div className="flex-1 bg-white p-12 flex items-center justify-center">
                <img src={selectedFrag.image} className="max-h-full object-contain" alt={selectedFrag.name} />
              </div>
              <div className="flex-1 p-12">
                <p className="text-amber-500 font-bold tracking-widest text-[10px] uppercase mb-4">{selectedFrag.brand}</p>
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
