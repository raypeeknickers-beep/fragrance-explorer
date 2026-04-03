import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles, MoveRight, Fingerprint, Pyramid } from 'lucide-react';

// --- HD DATA SECTION WITH SWISS PRICING ---
const fragrances = [
  { 
    id: 1, 
    name: "Sauvage Elixir", 
    brand: "Dior", 
    image: "http://googleusercontent.com/image_collection/image_retrieval/17281202283430654655_0", 
    topNotes: ["Cinnamon", "Nutmeg", "Cardamom", "Grapefruit"], 
    middleNotes: ["Lavender"], 
    baseNotes: ["Licorice", "Sandalwood", "Amber", "Patchouli", "Haitian Vetiver"], 
    longevity: "12h+", 
    season: "Winter/Fall", 
    occasion: "Night / Formal",
    dupe: { name: "Lattafa Asad", brand: "Lattafa", price: "28 CHF" }
  },
  { 
    id: 2, 
    name: "Aventus", 
    brand: "Creed", 
    image: "http://googleusercontent.com/image_collection/image_retrieval/17588105059401786569_1", 
    topNotes: ["Pineapple", "Bergamot", "Black Currant", "Apple"], 
    middleNotes: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"], 
    baseNotes: ["Musk", "Oak Moss", "Ambergris", "Vanilla"], 
    longevity: "10h+", 
    season: "Spring/Summer", 
    occasion: "Success / Daily",
    dupe: { name: "Club de Nuit Intense Man", brand: "Armaf", price: "35 CHF" }
  },
  { 
    id: 3, 
    name: "Tobacco Vanille", 
    brand: "Tom Ford", 
    image: "http://googleusercontent.com/image_collection/image_retrieval/3211994712521887578_0", 
    topNotes: ["Tobacco Leaf", "Spicy Notes"], 
    middleNotes: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"], 
    baseNotes: ["Dried Fruits", "Woody Notes"], 
    longevity: "12h+", 
    season: "Winter", 
    occasion: "Luxury Night Out",
    dupe: { name: "Amber Oud Tobacco Edition", brand: "Al Haramain", price: "55 CHF" }
  },
  { 
    id: 4, 
    name: "Naxos", 
    brand: "Xerjoff", 
    image: "http://googleusercontent.com/image_collection/image_retrieval/15231513181376468090_0", 
    topNotes: ["Lavender", "Bergamot", "Lemon"], 
    middleNotes: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"], 
    baseNotes: ["Tobacco Leaf", "Vanilla", "Tonka Bean"], 
    longevity: "12h+", 
    season: "Fall/Winter", 
    occasion: "Signature / Formal",
    dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }
  }
];

const creators = [
  { name: "Jeremy Fragrance", desc: "World-renowned icon specializing in mass-appeal and power fragrances.", bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000" },
  { name: "Noel Thomas", desc: "The authority on aesthetic niche perfumery and luxury scent discovery.", bgImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000" }
];

function FragranceExplorer() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  const filteredFragrances = useMemo(() => {
    return fragrances.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f0f0f0] font-light selection:bg-amber-500/40">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/40 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
            <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
            <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-amber-500 border-b border-amber-500/50 pb-1' : 'text-gray-600 hover:text-white transition-all'}>Archive</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'text-amber-500 border-b border-amber-500/50 pb-1' : 'text-gray-600 hover:text-white transition-all'}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
        {activeTab === 'discover' ? (
          <>
            <div className="relative max-w-2xl mx-auto mb-32">
              <input 
                type="text" 
                placeholder="SEARCH ARCHIVE..." 
                className="w-full bg-transparent border-b border-white/10 py-6 px-2 focus:outline-none focus:border-amber-500 transition-all text-2xl font-extralight tracking-widest uppercase placeholder:text-gray-800"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
              <AnimatePresence mode='popLayout'>
                {filteredFragrances.map((frag) => (
                  <motion.div
                    key={frag.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -15 }}
                    onClick={() => setSelectedFragrance(frag)}
                    className="group cursor-pointer bg-white/[0.01] border border-white/[0.05] p-10 transition-all duration-500 hover:bg-white/[0.03]"
                  >
                    <div className="aspect-[3/4] mb-10 flex items-center justify-center relative">
                      <img src={frag.image} alt={frag.name} className="h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl" />
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-amber-500 font-bold tracking-[0.4em] mb-2 uppercase">{frag.brand}</p>
                      <h3 className="text-xl font-light tracking-widest uppercase text-white">{frag.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {creators.map((c, i) => (
              <div key={i} className="relative h-[60vh] rounded-sm overflow-hidden border border-white/5 group">
                <div className="absolute inset-0 bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 transition-all duration-1000" style={{backgroundImage: `url(${c.bgImage})`}} />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="relative h-full flex flex-col justify-center p-20">
                  <h2 className="text-6xl font-bold uppercase italic tracking-tighter mb-4 text-white">{c.name}</h2>
                  <p className="max-w-md text-gray-500 font-light leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFragrance && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#050505] max-w-7xl w-full h-[90vh] rounded-sm overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl relative">
              
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-10 right-10 z-50 text-white/20 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>

              {/* LEFT: IMAGE AREA */}
              <div className="flex-1 bg-white p-20 flex items-center justify-center relative overflow-hidden">
                <img src={selectedFragrance.image} className="max-h-full object-contain relative z-10 drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] scale-110" />
                <div className="absolute top-8 left-8 text-black/[0.05] font-black text-6xl pointer-events-none uppercase">{selectedFragrance.brand}</div>
              </div>

              {/* RIGHT: DATA AREA */}
              <div className="flex-1 p-16 md:p-20 overflow-y-auto custom-scrollbar bg-[#080808]">
                <p className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase mb-6">{selectedFragrance.brand}</p>
                <h2 className="text-6xl font-bold text-white uppercase tracking-tighter mb-20 leading-none">{selectedFragrance.name}</h2>

                <div className="space-y-16">
                  {/* SCENT ARCHITECTURE - SEPARATED NOTES */}
                  <div className="space-y-12">
                    <div className="flex items-center gap-4 text-white/20">
                      <Pyramid size={18} />
                      <span className="text-[10px] tracking-[0.5em] font-black uppercase">Scent Architecture</span>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4 underline decoration-amber-500/20 underline-offset-8">Top Notes</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedFragrance.topNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4 underline decoration-amber-500/20 underline-offset-8">Middle Notes</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedFragrance.middleNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4 underline decoration-amber-500/20 underline-offset-8">Base Notes</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedFragrance.baseNotes.map(n => <span key={n} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 text-xs text-white/80 rounded-sm italic">{n}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DUPE REPLICA SECTION */}
                  {selectedFragrance.dupe && (
                    <div className="bg-amber-500/[0.02] border border-amber-500/10 p-10 rounded-sm relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <Fingerprint size={24} className="text-amber-500" />
                            <h4 className="text-[11px] font-black tracking-[0.5em] uppercase text-white">Replica Discovery</h4>
                          </div>
                          <span className="bg-amber-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">{selectedFragrance.dupe.price}</span>
                        </div>
                        <p className="text-base text-white/60 leading-relaxed font-extralight italic">
                          "The most accurate replica of this olfactory profile is <span className="text-white font-bold border-b border-amber-500/40">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SPECS GRID */}
                  <div className="grid grid-cols-3 gap-8 py-12 border-t border-white/5">
                    <div className="text-center group">
                      <Clock size={20} className="mx-auto mb-3 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Duration</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.longevity}</p>
                    </div>
                    <div className="text-center group">
                      <Calendar size={20} className="mx-auto mb-3 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Season</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.season}</p>
                    </div>
                    <div className="text-center group">
                      <Wind size={20} className="mx-auto mb-3 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Occasion</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.occasion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<FragranceExplorer />);
}
