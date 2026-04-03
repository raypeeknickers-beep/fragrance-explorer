import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Pyramid, Fingerprint, User, ShieldCheck } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// --- THE EXPANDED ARCHIVE (12 FRAGRANCES) ---
const fragrances = [
  { id: 1, name: "Sauvage Elixir", brand: "Dior", image: "https://shop.dior.ch/cdn/shop/products/Y0996460_C099600157_E01_ZHC.jpg", topNotes: ["Cinnamon", "Cardamom"], middleNotes: ["Lavender"], baseNotes: ["Licorice", "Sandalwood"], longevity: "12h+", season: "Winter/Fall", occasion: "Evening", dupe: { name: "Lattafa Asad", brand: "Lattafa", price: "28 CHF" }},
  { id: 2, name: "Aventus", brand: "Creed", image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front_1000x.jpg", topNotes: ["Pineapple", "Bergamot"], middleNotes: ["Birch", "Patchouli"], baseNotes: ["Musk", "Oak Moss"], longevity: "10h+", season: "Spring/Summer", occasion: "Success", dupe: { name: "Club de Nuit Intense", brand: "Armaf", price: "35 CHF" }},
  { id: 3, name: "Tobacco Vanille", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.1825.jpg", topNotes: ["Tobacco Leaf"], middleNotes: ["Vanilla", "Cacao"], baseNotes: ["Dried Fruits"], longevity: "12h+", season: "Winter", occasion: "Luxury Night", dupe: { name: "Amber Oud Tobacco", brand: "Al Haramain", price: "55 CHF" }},
  { id: 4, name: "Naxos", brand: "Xerjoff", image: "https://www.xerjoff.com/1529-large_default/naxos.jpg", topNotes: ["Lavender", "Lemon"], middleNotes: ["Honey", "Cinnamon"], baseNotes: ["Tobacco", "Vanilla"], longevity: "12h+", season: "Fall/Winter", occasion: "Signature", dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }},
  { id: 5, name: "Le Male Elixir", brand: "Jean Paul Gaultier", image: "https://www.jeanpaulgaultier.com/dw/image/v2/BCXQ_PRD/on/demandware.static/-/Sites-jpg-master-catalog/default/dw204f1642/2023/LE_MALE/ELIXIR/JPG_LE_MALE_ELIXIR_90ML_01.jpg", topNotes: ["Mint", "Lavender"], middleNotes: ["Benzoin", "Vanilla"], baseNotes: ["Honey", "Tobacco"], longevity: "11h", season: "Winter", occasion: "Date Night", dupe: { name: "Ramz Silver", brand: "Lattafa", price: "22 CHF" }},
  { id: 6, name: "Layton", brand: "Parfums de Marly", image: "https://fimgs.net/mdimg/perfume/m.40344.jpg", topNotes: ["Apple", "Lavender"], middleNotes: ["Geranium", "Violet"], baseNotes: ["Vanilla", "Cardamom"], longevity: "9h", season: "Fall/Winter", occasion: "Versatile", dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }},
  { id: 7, name: "Angels' Share", brand: "Kilian Paris", image: "https://fimgs.net/mdimg/perfume/m.62615.jpg", topNotes: ["Cognac"], middleNotes: ["Cinnamon", "Oak"], baseNotes: ["Praline", "Vanilla"], longevity: "10h", season: "Winter", occasion: "Evening", dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }},
  { id: 8, name: "Ganymede", brand: "Marc-Antoine Barrois", image: "https://fimgs.net/mdimg/perfume/m.54733.jpg", topNotes: ["Mandarin", "Saffron"], middleNotes: ["Violet", "Osmanthus"], baseNotes: ["Akigalawood"], longevity: "14h+", season: "All Year", occasion: "Avant-Garde", dupe: { name: "North Stag Sept VII", brand: "Paris Corner", price: "52 CHF" }},
  { id: 9, name: "Ombré Leather", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.49238.jpg", topNotes: ["Cardamom"], middleNotes: ["Leather", "Jasmine"], baseNotes: ["Amber", "Moss"], longevity: "9h", season: "Fall/Winter", occasion: "Bold", dupe: { name: "Afkar", brand: "Lattafa", price: "34 CHF" }},
  { id: 10, name: "Most Wanted Parfum", brand: "Azzaro", image: "https://fimgs.net/mdimg/perfume/m.73970.jpg", topNotes: ["Ginger"], middleNotes: ["Woody Notes"], baseNotes: ["Bourbon Vanilla"], longevity: "10h", season: "Winter", occasion: "Night Out", dupe: { name: "Ansaam Silver", brand: "Lattafa", price: "32 CHF" }},
  { id: 11, name: "MYSLF", brand: "Yves Saint Laurent", image: "https://fimgs.net/mdimg/perfume/m.84074.jpg", topNotes: ["Bergamot"], middleNotes: ["Orange Blossom"], baseNotes: ["Ambrofix", "Patchouli"], longevity: "8h", season: "Spring/Summer", occasion: "Modern Daily", dupe: { name: "Sheikh Al Shuyukh", brand: "Lattafa", price: "25 CHF" }},
  { id: 12, name: "Baccarat Rouge 540", brand: "MFK", image: "https://fimgs.net/mdimg/perfume/m.33531.jpg", topNotes: ["Saffron", "Jasmine"], middleNotes: ["Amberwood"], baseNotes: ["Fir Resin"], longevity: "12h+", season: "All Year", occasion: "Status", dupe: { name: "Club de Nuit Untold", brand: "Armaf", price: "48 CHF" }}
];

const creators = [
  { id: "noel", name: "Noel Thomas", tagline: "THE TOTAL LOOK.", desc: "Noel Thomas is the architect of the 'Complete Aesthetic.' He believes a fragrance is the final layer of a silhouette. His curation focuses on high-fashion integration, prioritizing clean, niche, and avant-garde scents that complement luxury menswear and minimalist design." },
  { id: "jeremy", name: "Jeremy Fragrance", tagline: "STRENGTH & POWER.", desc: "The global authority on mass-appeal. Jeremy's philosophy centers on performance, projection, and compliments. He curates scents that provide immediate confidence and command presence in any social or business environment." },
  { id: "cologneboy", name: "TheCologneBoy", tagline: "CULTURAL HITS.", desc: "The bridge between street culture and luxury perfumery. He specializes in identifying trending 'bangers'—fragrances that resonate with the current generation while maintaining high-end quality and value." }
];

// --- NAVIGATION ---
const Navigation = () => (
  <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/60 backdrop-blur-3xl">
    <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
      <NavLink to="/" className="flex flex-col leading-tight">
        <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
        <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
      </NavLink>
      <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500 border-b border-amber-500 pb-1" : "text-gray-600"}>Archive</NavLink>
        <NavLink to="/creators" className={({ isActive }) => isActive ? "text-amber-500 border-b border-amber-500 pb-1" : "text-gray-600"}>Creators</NavLink>
      </div>
    </div>
  </nav>
);

// --- DISCOVER PAGE ---
const DiscoverPage = ({ setSelectedFragrance }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => fragrances.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.brand.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  return (
    <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
      <div className="relative max-w-2xl mx-auto mb-32">
        <input type="text" placeholder="SEARCH ARCHIVE..." className="w-full bg-transparent border-b border-white/10 py-6 px-2 focus:outline-none focus:border-amber-500 transition-all text-2xl font-extralight tracking-widest uppercase" onChange={(e) => setSearchTerm(e.target.value)} />
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <AnimatePresence mode='popLayout'>
          {filtered.map((frag) => (
            <motion.div key={frag.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ y: -10 }} onClick={() => setSelectedFragrance(frag)} className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-10 hover:bg-white/[0.03] transition-all">
              <div className="aspect-[3/4] mb-8 flex items-center justify-center"><img src={frag.image} className="h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all group-hover:scale-105" /></div>
              <div className="text-center"><p className="text-[9px] text-amber-500 font-bold tracking-widest uppercase mb-1">{frag.brand}</p><h3 className="text-lg font-light tracking-widest uppercase text-white">{frag.name}</h3></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};

// --- CREATORS HUB ---
const CreatorsHub = () => {
  const [selectedId, setSelectedId] = useState(creators[0].id);
  const current = creators.find(c => c.id === selectedId);

  return (
    <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-1/3 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Select Curator</p>
          {creators.map((c) => (
            <button key={c.id} onClick={() => setSelectedId(c.id)} className={`w-full text-left p-8 border transition-all duration-500 ${selectedId === c.id ? 'bg-amber-500/5 border-amber-500/30' : 'bg-transparent border-white/5 hover:border-white/20'}`}>
              <h3 className={`text-xl font-light tracking-widest uppercase ${selectedId === c.id ? 'text-white' : 'text-gray-500'}`}>{c.name}</h3>
              <p className="text-[9px] text-amber-500/60 font-bold tracking-[0.2em] mt-2">{c.tagline}</p>
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white/[0.02] border border-white/5 p-16 lg:p-24 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div key={selectedId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <ShieldCheck className="text-amber-500/30 mb-8" size={40} />
              <p className="text-amber-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Official Curator</p>
              <h2 className="text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-12 italic">{current.name}</h2>
              <div className="w-20 h-[1px] bg-amber-500/40 mb-12" />
              <p className="text-xl text-gray-400 font-extralight leading-relaxed max-w-2xl">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
          <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/[0.02] pointer-events-none uppercase select-none">{current.id}</div>
        </div>
      </div>
    </main>
  );
};

// --- FRAGRANCE MODAL (Minimalist Scent Architecture) ---
const FragranceModal = ({ selectedFragrance, setSelectedFragrance }) => {
  if (!selectedFragrance) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#080808] max-w-7xl w-full h-[90vh] border border-white/10 flex flex-col md:flex-row relative">
        <button onClick={() => setSelectedFragrance(null)} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={32} /></button>
        <div className="flex-1 bg-white p-20 flex items-center justify-center"><img src={selectedFragrance.image} className="max-h-full object-contain scale-110 drop-shadow-2xl" /></div>
        <div className="flex-1 p-16 overflow-y-auto custom-scrollbar">
          <p className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase mb-6">{selectedFragrance.brand}</p>
          <h2 className="text-6xl font-bold text-white uppercase tracking-tighter mb-16 leading-none">{selectedFragrance.name}</h2>
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 text-white/20 mb-6"><Pyramid size={18} /><span className="text-[10px] tracking-[0.5em] font-black uppercase">Scent Pyramid</span></div>
              <div className="space-y-6">
                <div><p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-[0.2em] mb-2">The Opening</p><div className="flex flex-wrap gap-2">{selectedFragrance.topNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/5 border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}</div></div>
                <div><p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-[0.2em] mb-2">The Heart</p><div className="flex flex-wrap gap-2">{selectedFragrance.middleNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/5 border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}</div></div>
                <div><p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-[0.2em] mb-2">The Base</p><div className="flex flex-wrap gap-2">{selectedFragrance.baseNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/5 border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}</div></div>
              </div>
            </div>
            <div className="bg-amber-500/[0.03] border border-amber-500/10 p-8">
              <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><Fingerprint size={20} className="text-amber-500" /><h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Replica Discovery</h4></div><span className="text-amber-500 text-[10px] font-bold">{selectedFragrance.dupe.price}</span></div>
              <p className="text-sm text-white/60 italic font-extralight">"Accurate profile match: <span className="text-white font-bold">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  return (
    <Router>
      <div className="min-h-screen bg-[#030303] text-[#f0f0f0] font-light">
        <Navigation />
        <Routes>
          <Route path="/" element={<DiscoverPage setSelectedFragrance={setSelectedFragrance} />} />
          <Route path="/creators" element={<CreatorsHub />} />
        </Routes>
        <FragranceModal selectedFragrance={selectedFragrance} setSelectedFragrance={setSelectedFragrance} />
      </div>
    </Router>
  );
}

const container = document.getElementById('root');
if (container) { createRoot(container).render(<App />); }
