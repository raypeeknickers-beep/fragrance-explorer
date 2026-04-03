import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Pyramid, Fingerprint, ShieldCheck, Target, Crown, Zap } from 'lucide-react';

const fragrances = [
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", image: "http://googleusercontent.com/image_collection/image_retrieval/12253025323438602544_1", topNotes: ["Cinnamon"], middleNotes: ["Lavender"], baseNotes: ["Sandalwood"], dupe: { name: "Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", image: "http://googleusercontent.com/image_collection/image_retrieval/1004012088951375382_1", topNotes: ["Mint"], middleNotes: ["Lavender"], baseNotes: ["Honey"], dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 20, type: "Dupes", name: "9PM", brand: "Afnan", image: "http://googleusercontent.com/image_collection/image_retrieval/2120415008321923165_3", topNotes: ["Apple"], middleNotes: ["Cinnamon"], baseNotes: ["Vanilla"], dupe: { name: "Ultra Male Alt", brand: "Afnan", price: "30 CHF" }},
  { id: 17, type: "Dupes", name: "Asad", brand: "Lattafa", image: "http://googleusercontent.com/image_collection/image_retrieval/17597738402275673542_1", topNotes: ["Black Pepper"], middleNotes: ["Coffee"], baseNotes: ["Vanilla"], dupe: { name: "Sauvage Alt", brand: "Lattafa", price: "28 CHF" }},
  { id: 13, type: "Arabian", name: "Khamrah", brand: "Lattafa", image: "http://googleusercontent.com/image_collection/image_retrieval/10903520324484898904_2", topNotes: ["Cinnamon"], middleNotes: ["Dates"], baseNotes: ["Vanilla"], dupe: { name: "Angel's Share Alt", brand: "Lattafa", price: "45 CHF" }},
  { id: 6, type: "Niche", name: "Aventus", brand: "Creed", image: "http://googleusercontent.com/image_collection/image_retrieval/6023131930533991986_2", topNotes: ["Pineapple"], middleNotes: ["Birch"], baseNotes: ["Musk"], dupe: { name: "CDNIM", brand: "Armaf", price: "35 CHF" }},
  { id: 3, type: "Designer", name: "Most Wanted", brand: "Azzaro", image: "https://www.azzaro.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-azzaro-master-catalog/default/dw7697380d/images/the-most-wanted/the-most-wanted-parfum-100ml/Azzaro_The_Most_Wanted_Parfum_100ml_01.png", topNotes: ["Ginger"], middleNotes: ["Wood"], baseNotes: ["Vanilla"], dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", image: "https://www.yslbeauty.co.uk/dw/image/v2/AAKI_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw20689694/Fragrance/MYSLF/MYSLF_Eau_de_Parfum_100ml.png", topNotes: ["Bergamot"], middleNotes: ["Orange Blossom"], baseNotes: ["Patchouli"], dupe: { name: "Sheikh Al Shuyukh", brand: "Lattafa", price: "25 CHF" }},
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", image: "https://www.tomford.com/dw/image/v2/BDSV_PRD/on/demandware.static/-/Sites-tf-master-catalog/default/dw7e543666/images/T6WL01_OC.png", topNotes: ["Cardamom"], middleNotes: ["Leather"], baseNotes: ["Amber"], dupe: { name: "Afkar", brand: "Lattafa", price: "34 CHF" }},
  { id: 7, type: "Niche", name: "Naxos", brand: "Xerjoff", image: "https://www.xerjoff.com/1529-large_default/naxos.jpg", topNotes: ["Honey"], middleNotes: ["Tobacco"], baseNotes: ["Vanilla"], dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }},
  { id: 8, type: "Niche", name: "Layton", brand: "PDM", image: "https://parfums-de-marly.com/cdn/shop/files/Layton_125ml_Front.png", topNotes: ["Apple"], middleNotes: ["Lavender"], baseNotes: ["Vanilla"], dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }},
  { id: 9, type: "Niche", name: "Angels' Share", brand: "Kilian", image: "https://www.bykilian.com/dw/image/v2/AAKV_PRD/on/demandware.static/-/Sites-kilian-master-catalog/default/dw3d179667/images/large/K_N5ER010000_3700550218203_01.png", topNotes: ["Cognac"], middleNotes: ["Cinnamon"], baseNotes: ["Praline"], dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }},
  { id: 10, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", image: "https://www.marcantoinebarrois.com/wp-content/uploads/2019/04/GAN-100-F.png", topNotes: ["Saffron"], middleNotes: ["Violet"], baseNotes: ["Akigalawood"], dupe: { name: "Sept VII", brand: "Paris Corner", price: "52 CHF" }},
  { id: 11, type: "Niche", name: "Side Effect", brand: "Initio", image: "https://www.initioparfums.com/dw/image/v2/BCWG_PRD/on/demandware.static/-/Sites-initio-master-catalog/default/dw9e1e1e1e/images/the-absolutes/side-effect/Side_Effect_90ml_01.png", topNotes: ["Rum"], middleNotes: ["Tobacco"], baseNotes: ["Cinnamon"], dupe: { name: "After Effect", brand: "FW", price: "50 CHF" }},
  { id: 12, type: "Niche", name: "Hacivat", brand: "Nishane", image: "https://www.nishane.com/wp-content/uploads/2021/04/HACIVAT-100-ML.png", topNotes: ["Pineapple"], middleNotes: ["Jasmine"], baseNotes: ["Oakmoss"], dupe: { name: "Imperium", brand: "Electimuss", price: "110 CHF" }},
  { id: 14, type: "Arabian", name: "Turathi Blue", brand: "Afnan", image: "https://afnan.com/cdn/shop/products/Turathi-Blue-90ml_800x.png", topNotes: ["Grapefruit"], middleNotes: ["Amber"], baseNotes: ["Musk"], dupe: { name: "Tygar Alt", brand: "Afnan", price: "35 CHF" }},
  { id: 15, type: "Arabian", name: "Club de Nuit Iconic", brand: "Armaf", image: "https://armafperfumes.com/cdn/shop/products/CDN-Iconic-105ml_800x.png", topNotes: ["Grapefruit"], middleNotes: ["Ginger"], baseNotes: ["Sandalwood"], dupe: { name: "BDC Alt", brand: "Armaf", price: "40 CHF" }},
  { id: 16, type: "Dupes", name: "Detour Noir", brand: "Al Haramain", image: "https://alharamainperfumes.com/wp-content/uploads/2021/06/Detour-Noir-100ml.png", topNotes: ["Apple"], middleNotes: ["Lavender"], baseNotes: ["Vanilla"], dupe: { name: "Layton Clone", brand: "Al Haramain", price: "38 CHF" }},
  { id: 18, type: "Arabian", name: "Shaghaf Oud", brand: "Swiss Arabian", image: "https://swissarabian.com/wp-content/uploads/2018/05/Shaghaf-Oud.png", topNotes: ["Saffron"], middleNotes: ["Oud"], baseNotes: ["Praline"], dupe: { name: "Oud Bouquet Alt", brand: "Swiss Arabian", price: "45 CHF" }},
  { id: 19, type: "Arabian", name: "Hawas", brand: "Rasasi", image: "https://www.rasasi.com/wp-content/uploads/2018/12/Hawas-for-Him.png", topNotes: ["Apple"], middleNotes: ["Plum"], baseNotes: ["Ambergris"], dupe: { name: "Invictus Alt", brand: "Rasasi", price: "55 CHF" }}
];

const creators = [
  { id: "noel", name: "Noel Thomas", profileImg: "/channels4_profile.jpg", icon: <Target size={20}/>, tagline: "THE TOTAL LOOK.", desc: "Noel Thomas bridges the gap between high-fashion silhouettes and niche perfumery. His approach focuses on the 'total look,' where a fragrance is the invisible fabric that completes an outfit." },
  { id: "jeremy", name: "Jeremy Fragrance", profileImg: "https://yt3.googleusercontent.com/ytc/AIdro_nAnPskb7Wf7uXf4nNqC-o_R-U3I4Fv5V-jQ2V0=s176-c-k-c0x00ffffff-no-rj", icon: <Crown size={20}/>, tagline: "POWER.", desc: "The global authority on performance and compliments. Jeremy's philosophy is rooted in sillage and the social impact of scent." },
  { id: "cologneboy", name: "TheCologneBoy", profileImg: "https://yt3.googleusercontent.com/ytc/AIdro_m8R_o2Z1-z_4v9v8-P9X1S-z4z0z0z0z0z0z0z=s176-c-k-c0x00ffffff-no-rj", icon: <Zap size={20}/>, tagline: "MODERN ESSENTIALS.", desc: "The pulse of the new generation. Identifying trending 'bangers' and high-value fragrances that punch above their price point." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [selectedFrag, setSelectedFrag] = useState(null);
  const [selCreatorId, setSelCreatorId] = useState(creators[0].id);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return fragrances.filter(f => {
      const matchS = f.name.toLowerCase().includes(search.toLowerCase()) || f.brand.toLowerCase().includes(search.toLowerCase());
      const matchF = filter === 'All' || f.type === filter;
      return matchS && matchF;
    });
  }, [search, filter]);

  const currentCreator = creators.find(c => c.id === selCreatorId);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f0f0f0] font-light selection:bg-amber-500 selection:text-black">
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
          <motion.main key="arch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center mb-24 space-y-12">
              <div className="relative w-full max-w-2xl">
                <input type="text" placeholder="SEARCH..." className="w-full bg-transparent border-b border-white/10 py-6 px-2 focus:outline-none focus:border-amber-500 transition-all text-2xl font-extralight tracking-widest uppercase" onChange={(e) => setSearch(e.target.value)} />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {["All", "Arabian", "Niche", "Designer", "Dupes"].map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-[9px] font-black tracking-[0.3em] uppercase border transition-all ${filter === cat ? 'bg-amber-500 border-amber-500 text-black' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtered.map((f) => (
                <motion.div key={f.id} layout whileHover={{ y: -8 }} onClick={() => setSelectedFrag(f)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-8 hover:bg-white/[0.03] transition-all">
                  <div className="aspect-[3/4] mb-6 flex items-center justify-center bg-white rounded-sm p-4 overflow-hidden"><img src={f.image} className="h-full object-contain group-hover:scale-110 transition-transform duration-500" /></div>
                  <div className="text-center"><p className="text-[8px] text-amber-500 font-black tracking-widest uppercase mb-1">{f.brand}</p><h3 className="text-md font-light tracking-widest uppercase text-white">{f.name}</h3></div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        ) : (
          <motion.main key="crea" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="w-full lg:w-1/3 space-y-4">
                {creators.map((c) => (
                  <button key={c.id} onClick={() => setSelCreatorId(c.id)} className={`w-full text-left p-8 border transition-all duration-500 flex items-center gap-6 ${selCreatorId === c.id ? 'bg-amber-500/5 border-amber-500/30' : 'bg-transparent border-white/5 hover:border-white/20'}`}>
                    <div className={selCreatorId === c.id ? 'text-amber-500' : 'text-gray-700'}>{c.icon}</div>
                    <div><h3 className={`text-xl font-light tracking-widest uppercase ${selCreatorId === c.id ? 'text-white' : 'text-gray-500'}`}>{c.name}</h3><p className="text-[9px] text-amber-500/60 font-bold tracking-[0.2em] mt-1">{c.tagline}</p></div>
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-16 relative overflow-hidden min-h-[400px]">
                <AnimatePresence mode="wait"><motion.div key={selCreatorId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex items-center gap-8 mb-10">
                    <img src={currentCreator.profileImg} className="w-20 h-20 rounded-full border border-amber-500/40 object-cover bg-zinc-900" />
                    <h2 className="text-5xl font-bold text-white uppercase tracking-tighter italic">{currentCreator.name}</h2>
                  </div>
                  <p className="text-xl text-gray-400 font-extralight leading-relaxed max-w-2xl">{currentCreator.desc}</p>
                </motion.div></AnimatePresence>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFrag && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#080808] max-w-6xl w-full h-[80vh] border border-white/10 flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedFrag(null)} className="absolute top-8 right-8 text-white/30 hover:text-white z-50"><X size={32} /></button>
              <div className="flex-1 bg-white p-12 flex items-center justify-center"><img src={selectedFrag.image} className="max-h-full object-contain" /></div>
              <div className="flex-1 p-12 overflow-y-auto">
                <p className="text-amber-500 font-black tracking-[0.5em] text-[9px] uppercase mb-4">{selectedFrag.brand} • {selectedFrag.type}</p>
                <h2 className="text-5xl font-bold text-white uppercase tracking-tighter mb-12 leading-tight">{selectedFrag.name}</h2>
                <div className="space-y-10">
                  <div className="bg-amber-500/[0.03] border border-amber-500/10 p-6">
                    <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2 text-amber-500"><Fingerprint size={18} /><h4 className="text-[9px] font-black tracking-[0.2em] uppercase">Value Match</h4></div><span className="text-amber-500 text-[10px] font-bold">{selectedFrag.dupe.price}</span></div>
                    <p className="text-sm text-white/60 italic font-extralight">"<span className="text-white font-bold">{selectedFrag.dupe.name}</span> by {selectedFrag.dupe.brand}."</p>
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
