import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Pyramid, Fingerprint, ShieldCheck, Target, Crown, Zap, Filter } from 'lucide-react';

// --- THE EXPANDED ARCHIVE (20 FRAGRANCES) ---
const fragrances = [
  // DESIGNER
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw1578e19c/assets/Y0996460/Y0996460_E01.jpg", topNotes: ["Cinnamon"], middleNotes: ["Lavender"], baseNotes: ["Sandalwood"], longevity: "12h+", season: "Winter", dupe: { name: "Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", image: "https://fimgs.net/mdimg/perfume/m.79355.jpg", topNotes: ["Mint"], middleNotes: ["Lavender"], baseNotes: ["Honey"], longevity: "11h", season: "Winter", dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 3, type: "Designer", name: "Most Wanted", brand: "Azzaro", image: "https://fimgs.net/mdimg/perfume/m.73970.jpg", topNotes: ["Ginger"], middleNotes: ["Woody Notes"], baseNotes: ["Vanilla"], longevity: "10h", season: "Winter", dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", image: "https://fimgs.net/mdimg/perfume/m.84074.jpg", topNotes: ["Bergamot"], middleNotes: ["Orange Blossom"], baseNotes: ["Ambrofix"], longevity: "8h", season: "Spring", dupe: { name: "Sheikh Al Shuyukh", brand: "Lattafa", price: "25 CHF" }},
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.49238.jpg", topNotes: ["Cardamom"], middleNotes: ["Leather"], baseNotes: ["Amber"], longevity: "9h", season: "Fall", dupe: { name: "Afkar", brand: "Lattafa", price: "34 CHF" }},

  // NICHE
  { id: 6, type: "Niche", name: "Aventus", brand: "Creed", image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front_1000x.jpg", topNotes: ["Pineapple"], middleNotes: ["Birch"], baseNotes: ["Musk"], longevity: "10h", season: "Summer", dupe: { name: "Club de Nuit", brand: "Armaf", price: "35 CHF" }},
  { id: 7, type: "Niche", name: "Naxos", brand: "Xerjoff", image: "https://www.xerjoff.com/1529-large_default/naxos.jpg", topNotes: ["Honey"], middleNotes: ["Tobacco"], baseNotes: ["Vanilla"], longevity: "12h", season: "Winter", dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }},
  { id: 8, type: "Niche", name: "Layton", brand: "PDM", image: "https://fimgs.net/mdimg/perfume/m.40344.jpg", topNotes: ["Apple"], middleNotes: ["Lavender"], baseNotes: ["Vanilla"], longevity: "9h", season: "Fall", dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }},
  { id: 9, type: "Niche", name: "Angels' Share", brand: "Kilian", image: "https://fimgs.net/mdimg/perfume/m.62615.jpg", topNotes: ["Cognac"], middleNotes: ["Cinnamon"], baseNotes: ["Praline"], longevity: "10h", season: "Winter", dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }},
  { id: 10, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", image: "https://fimgs.net/mdimg/perfume/m.54733.jpg", topNotes: ["Saffron"], middleNotes: ["Violet"], baseNotes: ["Akigalawood"], longevity: "14h+", season: "Year-Round", dupe: { name: "Sept VII", brand: "Paris Corner", price: "52 CHF" }},
  { id: 11, type: "Niche", name: "Side Effect", brand: "Initio", image: "https://fimgs.net/mdimg/perfume/m.42258.jpg", topNotes: ["Rum"], middleNotes: ["Tobacco"], baseNotes: ["Cinnamon"], longevity: "11h", season: "Winter", dupe: { name: "After Effect", brand: "FW", price: "50 CHF" }},
  { id: 12, type: "Niche", name: "Hacivat", brand: "Nishane", image: "https://fimgs.net/mdimg/perfume/m.44174.jpg", topNotes: ["Pineapple"], middleNotes: ["Jasmine"], baseNotes: ["Oakmoss"], longevity: "12h+", season: "Summer", dupe: { name: "Imperium", brand: "Electimuss", price: "110 CHF" }},

  // ARABIAN / DUPES (Specialized)
  { id: 13, type: "Arabian", name: "Khamrah", brand: "Lattafa", image: "https://fimgs.net/mdimg/perfume/m.75831.jpg", topNotes: ["Cinnamon"], middleNotes: ["Dates"], baseNotes: ["Vanilla"], longevity: "11h", season: "Winter", dupe: { name: "Original Design", brand: "Lattafa", price: "45 CHF" }},
  { id: 14, type: "Arabian", name: "Turathi Blue", brand: "Afnan", image: "https://fimgs.net/mdimg/perfume/m.68213.jpg", topNotes: ["Grapefruit"], middleNotes: ["Woody"], baseNotes: ["Musk"], longevity: "9h", season: "Summer", dupe: { name: "Tygar Clone", brand: "Afnan", price: "35 CHF" }},
  { id: 15, type: "Arabian", name: "Club de Nuit Iconic", brand: "Armaf", image: "https://fimgs.net/mdimg/perfume/m.78010.jpg", topNotes: ["Grapefruit"], middleNotes: ["Ginger"], baseNotes: ["Sandalwood"], longevity: "10h", season: "Summer", dupe: { name: "Blue de Chanel Alt", brand: "Armaf", price: "40 CHF" }},
  { id: 16, type: "Dupes", name: "Detour Noir", brand: "Al Haramain", image: "https://fimgs.net/mdimg/perfume/m.69317.jpg", topNotes: ["Apple"], middleNotes: ["Lavender"], baseNotes: ["Vanilla"], longevity: "9h", season: "Fall", dupe: { name: "Layton Alt", brand: "Al Haramain", price: "38 CHF" }},
  { id: 17, type: "Dupes", name: "Asad", brand: "Lattafa", image: "https://fimgs.net/mdimg/perfume/m.70420.jpg", topNotes: ["Black Pepper"], middleNotes: ["Coffee"], baseNotes: ["Vanilla"], longevity: "10h", season: "Winter", dupe: { name: "Sauvage Elixir Alt", brand: "Lattafa", price: "28 CHF" }},
  { id: 18, type: "Arabian", name: "Shaghaf Oud", brand: "Swiss Arabian", image: "https://fimgs.net/mdimg/perfume/m.51230.jpg", topNotes: ["Saffron"], middleNotes: ["Oud", "Rose"], baseNotes: ["Praline"], longevity: "15h+", season: "Winter", dupe: { name: "Oud Bouquet Alt", brand: "Swiss Arabian", price: "45 CHF" }},
  { id: 19, type: "Arabian", name: "Hawas", brand: "Rasasi", image: "https://fimgs.net/mdimg/perfume/m.33588.jpg", topNotes: ["Apple"], middleNotes: ["Plum"], baseNotes: ["Ambergris"], longevity: "10h", season: "Summer", dupe: { name: "Invictus Aqua Alt", brand: "Rasasi", price: "55 CHF" }},
  { id: 20, type: "Dupes", name: "9PM", brand: "Afnan", image: "https://fimgs.net/mdimg/perfume/m.64205.jpg", topNotes: ["Apple"], middleNotes: ["Cinnamon"], baseNotes: ["Vanilla"], longevity: "10h", season: "Winter", dupe: { name: "Ultra Male Alt", brand: "Afnan", price: "30 CHF" }}
];

const creators = [
  { id: "noel", name: "Noel Thomas", icon: <Target size={20}/>, tagline: "THE TOTAL LOOK.", desc: "Noel Thomas is the architect of the 'Complete Aesthetic.' He believes a fragrance is the final layer of a silhouette. His curation focuses on high-fashion integration, prioritizing clean, niche, and avant-garde scents that complement luxury menswear and minimalist design." },
  { id: "jeremy", name: "Jeremy Fragrance", icon: <Crown size={20}/>, tagline: "STRENGTH & POWER.", desc: "The global authority on mass-appeal. Jeremy's philosophy centers on performance, projection, and compliments. He curates scents that provide immediate confidence and command presence." },
  { id: "cologneboy", name: "TheCologneBoy", icon: <Zap size={20}/>, tagline: "CULTURAL HITS.", desc: "The bridge between street culture and luxury perfumery. He specializes in identifying trending 'bangers'—fragrances that resonate with the current generation." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [selectedCreatorId, setSelectedCreatorId] = useState(creators[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const currentCreator = creators.find(c => c.id === selectedCreatorId);
  const categories = ["All", "Arabian", "Niche", "Designer", "Dupes"];

  const filteredFragrances = useMemo(() => {
    return fragrances.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All' || f.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f0f0f0] font-light">
      
      {/* NAV */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/60 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => {setActiveTab('archive'); setFilter('All');}}>
            <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
            <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500 border-b border-amber-500 pb-1" : "text-gray-600 hover:text-white"}>Archive</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? "text-amber-500 border-b border-amber-500 pb-1" : "text-gray-600 hover:text-white"}>Creators</button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'archive' ? (
          <motion.main key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
            {/* SEARCH & SORT */}
            <div className="flex flex-col items-center mb-24 space-y-12">
              <div className="relative w-full max-w-2xl">
                <input type="text" placeholder="SEARCH ARCHIVE..." className="w-full bg-transparent border-b border-white/10 py-6 px-2 focus:outline-none focus:border-amber-500 transition-all text-2xl font-extralight tracking-widest uppercase" onChange={(e) => setSearchTerm(e.target.value)} />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFilter(cat)}
                    className={`px-8 py-2 text-[10px] font-black tracking-[0.3em] uppercase border transition-all ${filter === cat ? 'bg-amber-500 border-amber-500 text-black' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {filteredFragrances.map((frag) => (
                <motion.div key={frag.id} layout whileHover={{ y: -10 }} onClick={() => setSelectedFragrance(frag)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-10 hover:bg-white/[0.03] transition-all">
                  <div className="aspect-[3/4] mb-8 flex items-center justify-center bg-white rounded-sm p-4 overflow-hidden"><img src={frag.image} className="h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all group-hover:scale-105" /></div>
                  <div className="text-center">
                    <p className="text-[8px] text-amber-500 font-black tracking-widest uppercase mb-1">{frag.brand} • {frag.type}</p>
                    <h3 className="text-lg font-light tracking-widest uppercase text-white">{frag.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.main key="creators" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="w-full lg:w-1/3 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Official Curators</p>
                {creators.map((c) => (
                  <button key={c.id} onClick={() => setSelectedCreatorId(c.id)} className={`w-full text-left p-8 border transition-all duration-500 flex items-center gap-6 ${selectedCreatorId === c.id ? 'bg-amber-500/5 border-amber-500/30' : 'bg-transparent border-white/5 hover:border-white/20'}`}>
                    <div className={selectedCreatorId === c.id ? 'text-amber-500' : 'text-gray-700'}>{c.icon}</div>
                    <div>
                      <h3 className={`text-xl font-light tracking-widest uppercase ${selectedCreatorId === c.id ? 'text-white' : 'text-gray-500'}`}>{c.name}</h3>
                      <p className="text-[9px] text-amber-500/60 font-bold tracking-[0.2em] mt-1">{c.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-16 lg:p-24 relative overflow-hidden min-h-[500px]">
                <AnimatePresence mode="wait"><motion.div key={selectedCreatorId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                  <ShieldCheck className="text-amber-500/30 mb-8" size={40} />
                  <h2 className="text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-12 italic">{currentCreator.name}</h2>
                  <p className="text-xl text-gray-400 font-extralight leading-relaxed max-w-2xl">{currentCreator.desc}</p>
                </motion.div></AnimatePresence>
                <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/[0.02] pointer-events-none uppercase select-none">{currentCreator.id}</div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* MODAL */}
      <AnimatePresence>
        {selectedFragrance && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#080808] max-w-7xl w-full h-[90vh] border border-white/10 flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-8 right-8 text-white/30 hover:text-white z-50"><X size={32} /></button>
              <div className="flex-1 bg-white p-20 flex items-center justify-center"><img src={selectedFragrance.image} className="max-h-full object-contain scale-110" /></div>
              <div className="flex-1 p-16 overflow-y-auto">
                <p className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase mb-6">{selectedFragrance.brand} • {selectedFragrance.type}</p>
                <h2 className="text-6xl font-bold text-white uppercase tracking-tighter mb-16 leading-none">{selectedFragrance.name}</h2>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div><p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-[0.2em] mb-2">Key Notes</p><div className="flex flex-wrap gap-2">{selectedFragrance.topNotes.concat(selectedFragrance.middleNotes, selectedFragrance.baseNotes).map(n => <span key={n} className="px-4 py-1.5 bg-white/5 border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}</div></div>
                  </div>
                  <div className="bg-amber-500/[0.03] border border-amber-500/10 p-8">
                    <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><Fingerprint size={20} className="text-amber-500" /><h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Value Replica</h4></div><span className="text-amber-500 text-[10px] font-bold">{selectedFragrance.dupe.price}</span></div>
                    <p className="text-sm text-white/60 italic">"<span className="text-white font-bold">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."</p>
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
