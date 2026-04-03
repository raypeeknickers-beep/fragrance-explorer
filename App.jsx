import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Pyramid, Fingerprint, User } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// --- DATA ARCHIVE ---
const fragrances = [
  { 
    id: 1, 
    name: "Sauvage Elixir", 
    brand: "Dior", 
    image: "https://shop.dior.ch/cdn/shop/products/Y0996460_C099600157_E01_ZHC.jpg", 
    topNotes: ["Cinnamon", "Nutmeg", "Cardamom"], 
    middleNotes: ["Lavender"], 
    baseNotes: ["Licorice", "Sandalwood", "Amber"], 
    longevity: "12h+", season: "Winter/Fall", occasion: "Night",
    dupe: { name: "Lattafa Asad", brand: "Lattafa", price: "28 CHF" }
  },
  { 
    id: 2, 
    name: "Aventus", 
    brand: "Creed", 
    image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front_1000x.jpg", 
    topNotes: ["Pineapple", "Bergamot"], 
    middleNotes: ["Birch", "Patchouli"], 
    baseNotes: ["Musk", "Oak Moss"], 
    longevity: "10h+", season: "Spring/Summer", occasion: "Success",
    dupe: { name: "Club de Nuit Intense", brand: "Armaf", price: "35 CHF" }
  }
];

const creators = [
  { 
    id: "noel", 
    name: "Noel Thomas", 
    tagline: "THE OUTFIT & THE SCENT.", 
    desc: "A visionary in aesthetic curation, Noel Thomas bridges the gap between high-fashion silhouettes and niche perfumery. His approach focuses on the 'total look,' where a fragrance is not just an accessory, but the invisible fabric that completes an outfit's silhouette. Specializing in avant-garde houses and clean, minimalist profiles." 
  },
  { 
    id: "jeremy", 
    name: "Jeremy Fragrance", 
    tagline: "POWER & COMPLIMENTS.", 
    desc: "The most recognizable face in global perfumery. Jeremy's philosophy is rooted in performance, sillage, and the social impact of scent. He focuses on fragrances that command attention and provide the ultimate confidence boost in high-stakes environments." 
  },
  { 
    id: "cologneboy", 
    name: "TheCologneBoy", 
    tagline: "MODERN ESSENTIALS.", 
    desc: "The pulse of the new generation of collectors. Known for identifying trending 'bangers' and providing real-world feedback on how scents perform in everyday social settings. His expertise lies in finding high-value fragrances that punch far above their price point." 
  }
];

// --- COMPONENTS ---

const Navigation = () => (
  <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/40 backdrop-blur-3xl">
    <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
      <NavLink to="/" className="flex flex-col leading-tight">
        <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
        <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
      </NavLink>
      <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500 border-b border-amber-500/50 pb-1" : "text-gray-600"}>Archive</NavLink>
        <NavLink to="/creators" className={({ isActive }) => isActive ? "text-amber-500 border-b border-amber-500/50 pb-1" : "text-gray-600"}>Creators</NavLink>
      </div>
    </div>
  </nav>
);

const CreatorsHub = () => {
  const [selectedId, setSelectedId] = useState(creators[0].id);
  const current = creators.find(c => c.id === selectedId);

  return (
    <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* SIDEBAR SELECTOR */}
        <div className="w-full lg:w-1/3 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Select Curator</p>
          {creators.map((c) => (
            <button 
              key={c.id} 
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-8 border transition-all duration-500 ${selectedId === c.id ? 'bg-amber-500/5 border-amber-500/30' : 'bg-transparent border-white/5 hover:border-white/20'}`}
            >
              <h3 className={`text-xl font-light tracking-widest uppercase ${selectedId === c.id ? 'text-white' : 'text-gray-500'}`}>{c.name}</h3>
              <p className="text-[9px] text-amber-500/60 font-bold tracking-[0.2em] mt-2">{c.tagline}</p>
            </button>
          ))}
        </div>

        {/* DESCRIPTION PANEL */}
        <div className="flex-1 bg-white/[0.02] border border-white/5 p-16 lg:p-24 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <User className="text-amber-500/20 mb-8" size={40} />
              <p className="text-amber-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Curator Profile</p>
              <h2 className="text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-12 italic">
                {current.name}
              </h2>
              <div className="w-20 h-[1px] bg-amber-500/50 mb-12" />
              <p className="text-xl text-gray-400 font-extralight leading-relaxed max-w-2xl">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* BACKGROUND TEXT DECORATION */}
          <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/[0.02] pointer-events-none uppercase select-none">
            {current.id}
          </div>
        </div>
      </div>
    </main>
  );
};

// ... (DiscoverPage and FragranceModal remain the same as previous HD versions)

export default function App() {
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-[#030303] text-[#f0f0f0]">
        <Navigation />
        <Routes>
          <Route path="/" element={<DiscoverPage setSelectedFragrance={setSelectedFragrance} fragrances={fragrances} />} />
          <Route path="/creators" element={<CreatorsHub />} />
        </Routes>
        <FragranceModal selectedFragrance={selectedFragrance} setSelectedFragrance={setSelectedFragrance} />
      </div>
    </Router>
  );
}
