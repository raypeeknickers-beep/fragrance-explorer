import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Pyramid, Fingerprint, ShieldCheck, Target, Crown, Zap } from 'lucide-react';

const fragrances = [
  // DESIGNER - Official High-Res Links
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw1578e19c/assets/Y0996460/Y0996460_E01.jpg", topNotes: ["Cinnamon"], middleNotes: ["Lavender"], baseNotes: ["Sandalwood"], dupe: { name: "Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", image: "https://www.jeanpaulgaultier.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-jpg-master-catalog/default/dw1857997a/images/le-male/le-male-elixir-parfum-intense-125ml/JPG_Le_Male_Elixir_125ml_01.png", topNotes: ["Mint"], middleNotes: ["Lavender"], baseNotes: ["Honey"], dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 3, type: "Designer", name: "Most Wanted", brand: "Azzaro", image: "https://www.azzaro.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-azzaro-master-catalog/default/dw7697380d/images/the-most-wanted/the-most-wanted-parfum-100ml/Azzaro_The_Most_Wanted_Parfum_100ml_01.png", topNotes: ["Ginger"], middleNotes: ["Wood"], baseNotes: ["Vanilla"], dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", image: "https://www.yslbeauty.co.uk/dw/image/v2/AAKI_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw20689694/Fragrance/MYSLF/MYSLF_Eau_de_Parfum_100ml.png", topNotes: ["Bergamot"], middleNotes: ["Orange Blossom"], baseNotes: ["Ambrofix"], dupe: { name: "Sheikh Al Shuyukh", brand: "Lattafa", price: "25 CHF" }},
  
  // NICHE - Official High-Res Links
  { id: 6, type: "Niche", name: "Aventus", brand: "Creed", image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front.jpg", topNotes: ["Pineapple"], middleNotes: ["Birch"], baseNotes: ["Musk"], dupe: { name: "Club de Nuit", brand: "Armaf", price: "35 CHF" }},
  { id: 7, type: "Niche", name: "Naxos", brand: "Xerjoff", image: "https://www.xerjoff.com/1529-large_default/naxos.jpg", topNotes: ["Honey"], middleNotes: ["Tobacco"], baseNotes: ["Vanilla"], dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }},
  { id: 8, type: "Niche", name: "Layton", brand: "PDM", image: "https://parfums-de-marly.com/cdn/shop/files/Layton_125ml_Front.png", topNotes: ["Apple"], middleNotes: ["Lavender"], baseNotes: ["Vanilla"], dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }},
  { id: 9, type: "Niche", name: "Angels' Share", brand: "Kilian", image: "https://www.bykilian.com/dw/image/v2/AAKV_PRD/on/demandware.static/-/Sites-kilian-master-catalog/default/dw3d179667/images/large/K_N5ER010000_3700550218203_01.png", topNotes: ["Cognac"], middleNotes: ["Cinnamon"], baseNotes: ["Praline"], dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }},
  
  // ARABIAN / DUPES - High Res Verified
  { id: 20, type: "Dupes", name: "9PM", brand: "Afnan", image: "https://fimgs.net/mdimg/perfume/m.64205.jpg", topNotes: ["Apple"], middleNotes: ["Cinnamon"], baseNotes: ["Vanilla"], dupe: { name: "Ultra Male Alt", brand: "Afnan", price: "30 CHF" }},
  { id: 17, type: "Dupes", name: "Asad", brand: "Lattafa", image: "https://lattafa.com/wp-content/uploads/2022/01/Asad-100ml.png", topNotes: ["Black Pepper"], middleNotes: ["Coffee"], baseNotes: ["Vanilla"], dupe: { name: "Sauvage Alt", brand: "Lattafa", price: "28 CHF" }},
  { id: 13, type: "Arabian", name: "Khamrah", brand: "Lattafa", image: "https://lattafa.com/wp-content/uploads/2022/10/Khamrah-100ml.png", topNotes: ["Cinnamon"], middleNotes: ["Dates"], baseNotes: ["Vanilla"], dupe: { name: "Angel's Share Alt", brand: "Lattafa", price: "45 CHF" }},
  { id: 19, type: "Arabian", name: "Hawas", brand: "Rasasi", image: "https://www.rasasi.com/wp-content/uploads/2018/12/Hawas-for-Him.png", topNotes: ["Apple"], middleNotes: ["Plum"], baseNotes: ["Ambergris"], dupe: { name: "Invictus Alt", brand: "Rasasi", price: "55 CHF" }}
];

const creators = [
  { id: "noel", name: "Noel Thomas", profileImg: "/channels4_profile.jpg", icon: <Target size={20}/>, tagline: "THE TOTAL LOOK.", desc: "Noel Thomas bridges the gap between high-fashion silhouettes and niche perfumery." },
  { id: "jeremy", name: "Jeremy Fragrance", profileImg: "https://fimgs.net/mdimg/perfume/m.1.jpg", icon: <Crown size={20}/>, tagline: "POWER.", desc: "The global authority on performance and compliments." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [selectedFrag, setSelectedFrag] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return fragrances.filter(f => {
      const matchS = f.name.toLowerCase().includes(search.toLowerCase());
      const matchF = filter === 'All' || f.type === filter;
      return matchS && matchF;
    });
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
        {activeTab === 'archive' ? (
          <>
            <div className="flex flex-col items-center mb-24 space-y-12">
              <input type="text" placeholder="SEARCH..." className="bg-transparent border-b border-white/10 py-4 w-full max-w-lg text-center text-xl uppercase tracking-widest outline-none focus:border-amber-500 transition-colors" onChange={(e) => setSearch(e.target.value)} />
              <div className="flex gap-4">
                {["All", "Arabian", "Niche", "Designer", "Dupes"].map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1 text-[10px] border tracking-widest uppercase ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtered.map((f) => (
                <div key={f.id} onClick={() => setSelectedFrag(f)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-8 hover:bg-white/[0.03] transition-all">
                  <div className="aspect-[3/4] mb-6 flex items-center justify-center bg-white rounded-sm p-4 overflow-hidden">
                    <img src={f.image} className="h-full object-contain group-hover:scale-105 transition-transform duration-500" alt={f.name} />
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-amber-500 font-bold tracking-widest uppercase mb-1">{f.brand}</p>
                    <h3 className="text-md font-light tracking-widest uppercase text-white">{f.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {creators.map(c => (
              <div key={c.id} className="bg-white/[0.02] border border-white/5 p-12 flex items-center gap-8">
                <img src={c.profileImg} className="w-24 h-24 rounded-full border border-amber-500/30 object-cover" alt={c.name} />
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white">{c.name}</h3>
                  <p className="text-amber-500 text-[10px] font-bold tracking-widest mb-4">{c.tagline}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFrag && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#080808] max-w-5xl w-full h-[70vh] border border-white/10 flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedFrag(null)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={32} /></button>
              <div className="flex-1 bg-white p-12 flex items-center justify-center">
                <img src={selectedFrag.image} className="max-h-full object-contain" alt={selectedFrag.name} />
              </div>
              <div className="flex-1 p-12">
                <p className="text-amber-500 font-bold tracking-widest text-[10px] uppercase mb-4">{selectedFrag.brand}</p>
                <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-8">{selectedFrag.name}</h2>
                <div className="space-y-6">
                   <div className="bg-amber-500/[0.05] border border-amber-500/10 p-6">
                      <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-2">Value Replication</h4>
                      <p className="text-white/80 italic">"{selectedFrag.dupe.name} by {selectedFrag.dupe.brand} - {selectedFrag.dupe.price}"</p>
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
