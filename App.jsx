import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles, MoveRight, Fingerprint, Pyramid } from 'lucide-react';

// --- HD DATA SECTION ---
const fragrances = [
  { 
    id: 1, 
    name: "Sauvage Elixir", 
    brand: "Dior", 
    image: "https://shop.dior.ch/cdn/shop/products/Y0996460_C099600157_E01_ZHC.jpg", 
    topNotes: ["Calabrian Bergamot", "Nutmeg", "Cinnamon", "Cardamom"], 
    middleNotes: ["Lavender"], 
    baseNotes: ["Ambroxan", "Licorice", "Sandalwood", "Amber", "Patchouli"], 
    longevity: "12h+", 
    season: "Winter/Fall", 
    occasion: "Signature",
    dupe: { name: "Lattafa Asad", brand: "Lattafa", price: "28 CHF" }
  },
  { 
    id: 2, 
    name: "Aventus", 
    brand: "Creed", 
    image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front_1000x.jpg", 
    topNotes: ["Pineapple", "Black Currant", "Bergamot", "Apple"], 
    middleNotes: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"], 
    baseNotes: ["Musk", "Oak Moss", "Ambergris", "Vanilla"], 
    longevity: "9-11h", 
    season: "Spring/Summer", 
    occasion: "Success",
    dupe: { name: "Club de Nuit Intense Man", brand: "Armaf", price: "35 CHF" }
  },
  { 
    id: 3, 
    name: "Tobacco Vanille", 
    brand: "Tom Ford", 
    image: "https://fimgs.net/mdimg/perfume/m.1825.jpg", 
    topNotes: ["Tobacco Leaf", "Spicy Notes"], 
    middleNotes: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"], 
    baseNotes: ["Dried Fruits", "Woody Notes"], 
    longevity: "12h+", 
    season: "Winter", 
    occasion: "Formal",
    dupe: { name: "Amber Oud Tobacco Edition", brand: "Al Haramain", price: "58 CHF" }
  },
  { 
    id: 4, 
    name: "Naxos", 
    brand: "Xerjoff", 
    image: "https://fimgs.net/mdimg/perfume/m.30454.jpg", 
    topNotes: ["Lavender", "Bergamot", "Lemon"], 
    middleNotes: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"], 
    baseNotes: ["Tobacco Leaf", "Vanilla", "Tonka Bean"], 
    longevity: "12h+", 
    season: "Fall/Winter", 
    occasion: "Luxury",
    dupe: { name: "Voux Elegante", brand: "Emir", price: "42 CHF" }
  }
];

const creators = [
  { name: "Jeremy Fragrance", desc: "The world's #1 fragrance icon.", bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000" },
  { name: "Noel Thomas", desc: "The authority on aesthetic niche perfumery.", bgImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000" }
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
      
      {/* MINIMALIST NAV */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.03] bg-black/40 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-[1px] bg-amber-500/50 rotate-[30deg]"></div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-[0.6em] uppercase">Explorer</span>
              <span className="text-[7px] tracking-[0.5em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
            </div>
          </div>
          <div className="flex gap-14 text-[9px] tracking-[0.4em] font-black uppercase">
            <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-amber-500' : 'text-gray-600 hover:text-white transition-all'}>The Collection</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'text-amber-500' : 'text-gray-600 hover:text-white transition-all'}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-20 px-12 max-w-[1600px] mx-auto">
        {activeTab === 'discover' ? (
          <>
            {/* SEARCH */}
            <div className="relative max-w-4xl mx-auto mb-40 text-center">
              <input 
                type="text" 
                placeholder="Find a masterpiece..." 
                className="w-full bg-transparent border-b border-white/5 py-8 px-4 focus:outline-none focus:border-amber-500/50 transition-all text-4xl font-extralight tracking-tighter uppercase placeholder:text-white/5"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute -bottom-10 left-0 text-[10px] tracking-[0.5em] text-white/20 uppercase">Alphabetical Database v2.0</div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
              <AnimatePresence mode='popLayout'>
                {filteredFragrances.map((frag) => (
                  <motion.div
                    key={frag.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ y: -20 }}
                    onClick={() => setSelectedFragrance(frag)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/5] mb-10 bg-white/[0.02] border border-white/[0.05] flex items-center justify-center relative overflow-hidden rounded-sm transition-colors group-hover:bg-white/[0.04]">
                       {/* High Quality Image Rendering */}
                       <img 
                        src={frag.image} 
                        alt={frag.name} 
                        className="h-[80%] object-contain z-10 transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="px-2">
                      <p className="text-[10px] text-amber-500 font-black tracking-[0.4em] mb-2 uppercase">{frag.brand}</p>
                      <h3 className="text-2xl font-light tracking-tight text-white uppercase">{frag.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* CREATORS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {creators.map((c, i) => (
              <div key={i} className="relative h-[80vh] bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-20 group-hover:opacity-40 scale-105 group-hover:scale-100" style={{backgroundImage: `url(${c.bgImage})`}} />
                <div className="relative h-full flex flex-col justify-end p-20">
                  <h2 className="text-8xl font-black uppercase italic tracking-tighter leading-none mb-6 text-white">{c.name.split(' ')[0]}<br/>{c.name.split(' ')[1]}</h2>
                  <p className="max-w-xs text-gray-500 text-sm font-medium tracking-wide leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFragrance && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/98 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#050505] max-w-7xl w-full h-[90vh] rounded-sm overflow-hidden border border-white/10 flex flex-col md:flex-row relative">
              
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-12 right-12 z-50 text-white/20 hover:text-white transition-colors hover:rotate-90 duration-300"><X size={40} strokeWidth={1} /></button>

              {/* IMAGE SIDE */}
              <div className="flex-1 bg-white flex items-center justify-center relative p-20">
                <img src={selectedFragrance.image} className="max-h-full object-contain z-10 drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] scale-110" />
                <div className="absolute top-10 left-10 text-[10px] tracking-[0.8em] text-black/20 font-bold uppercase">HD Digital Archive</div>
              </div>

              {/* INFO SIDE */}
              <div className="flex-1 p-20 overflow-y-auto bg-[#080808]">
                <p className="text-amber-500 font-black tracking-[0.6em] text-[11px] uppercase mb-6">{selectedFragrance.brand}</p>
                <h2 className="text-7xl font-bold text-white uppercase tracking-tighter mb-20 leading-none">{selectedFragrance.name}</h2>

                <div className="space-y-20">
                  {/* SCENT ARCHITECTURE SECTION */}
                  <div className="space-y-12">
                    <div className="flex items-center gap-4 text-white/20">
                      <Pyramid size={20} />
                      <span className="text-[10px] tracking-[0.5em] font-black uppercase">Scent Architecture</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-10">
                      <div className="group">
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4">Top Notes <span className="text-white/10 ml-2">— Initial Impression</span></p>
                        <div className="flex flex-wrap gap-3">
                          {selectedFragrance.topNotes.map(n => <span key={n} className="px-5 py-2 bg-white/5 border border-white/5 text-xs text-white/80 rounded-full group-hover:border-amber-500/30 transition-colors">{n}</span>)}
                        </div>
                      </div>

                      <div className="group">
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4">Middle Notes <span className="text-white/10 ml-2">— The Heart</span></p>
                        <div className="flex flex-wrap gap-3">
                          {selectedFragrance.middleNotes.map(n => <span key={n} className="px-5 py-2 bg-white/5 border border-white/5 text-xs text-white/80 rounded-full group-hover:border-amber-500/30 transition-colors">{n}</span>)}
                        </div>
                      </div>

                      <div className="group">
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4">Base Notes <span className="text-white/10 ml-2">— The Dry Down</span></p>
                        <div className="flex flex-wrap gap-3">
                          {selectedFragrance.baseNotes.map(n => <span key={n} className="px-5 py-2 bg-white/5 border border-white/5 text-xs text-white/80 rounded-full group-hover:border-amber-500/30 transition-colors">{n}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DUPE REPLICA */}
                  {selectedFragrance.dupe && (
                    <div className="bg-amber-500/[0.02] border border-amber-500/10 p-12 relative">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <Fingerprint className="text-amber-500" size={24} />
                          <p className="text-[11px] font-black tracking-[0.5em] uppercase">Best Value Replica</p>
                        </div>
                        <div className="text-xl font-bold text-white">{selectedFragrance.dupe.price}</div>
                      </div>
                      <p className="text-lg text-white/70 font-extralight leading-relaxed italic">
                        "The most accurate reconstruction of this profile is found in <span className="text-amber-500 font-bold border-b border-amber-500/30">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."
                      </p>
                    </div>
                  )}

                  {/* SPECS */}
                  <div className="grid grid-cols-3 gap-10 border-t border-white/5 pt-16">
                    <div>
                      <Clock className="text-amber-500/40 mb-4" />
                      <p className="text-[9px] font-black tracking-widest text-gray-600 uppercase mb-2">Duration</p>
                      <p className="text-sm font-bold">{selectedFragrance.longevity}</p>
                    </div>
                    <div>
                      <Calendar className="text-amber-500/40 mb-4" />
                      <p className="text-[9px] font-black tracking-widest text-gray-600 uppercase mb-2">Season</p>
                      <p className="text-sm font-bold">{selectedFragrance.season}</p>
                    </div>
                    <div>
                      <Wind className="text-amber-500/40 mb-4" />
                      <p className="text-[9px] font-black tracking-widest text-gray-600 uppercase mb-2">Occasion</p>
                      <p className="text-sm font-bold">{selectedFragrance.occasion}</p>
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
