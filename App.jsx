import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles, MoveRight, Layers, Fingerprint } from 'lucide-react';

// --- DATA SECTION WITH SWISS PRICING ---
const fragrances = [
  { 
    id: 1, 
    name: "Sauvage", 
    brand: "Dior", 
    image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw646927a3/assets/Y0996004/Y0996004_E01.jpg", 
    topNotes: ["Calabrian Bergamot", "Pepper"], 
    middleNotes: ["Sichuan Pepper", "Lavender", "Pink Pepper"], 
    baseNotes: ["Ambroxan", "Cedar", "Labdanum"], 
    longevity: "8-10h", 
    season: "All Year", 
    occasion: "Versatile",
    dupe: { name: "Afnan Modest Une", brand: "Afnan", price: "32 CHF" }
  },
  { 
    id: 2, 
    name: "Aventus", 
    brand: "Creed", 
    image: "https://fimgs.net/mdimg/perfume/m.9828.jpg", 
    topNotes: ["Pineapple", "Bergamot"], 
    middleNotes: ["Birch", "Patchouli", "Jasmine"], 
    baseNotes: ["Musk", "Ambergris", "Vanilla"], 
    longevity: "10h+", 
    season: "Spring/Summer", 
    occasion: "Success",
    dupe: { name: "Club de Nuit Intense Man", brand: "Armaf", price: "35 CHF" }
  },
  { 
    id: 3, 
    name: "Bleu de Chanel", 
    brand: "Chanel", 
    image: "https://www.chanel.com/images/t_one/t_fragrance_v2/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_620/bleu-de-chanel-eau-de-parfum-spray-100ml-v3-packshot-107360-9533350281246.jpg", 
    topNotes: ["Grapefruit", "Lemon", "Mint"], 
    middleNotes: ["Ginger", "Nutmeg", "Jasmine"], 
    baseNotes: ["Incense", "Sandalwood", "Cedar"], 
    longevity: "8-9h", 
    season: "All Year", 
    occasion: "Professional",
    dupe: { name: "Missoni Parfum Pour Homme", brand: "Missoni", price: "40 CHF" }
  },
  { 
    id: 4, 
    name: "Tobacco Vanille", 
    brand: "Tom Ford", 
    image: "https://fimgs.net/mdimg/perfume/m.1825.jpg", 
    topNotes: ["Tobacco Leaf", "Spices"], 
    middleNotes: ["Vanilla", "Cacao", "Tonka Bean"], 
    baseNotes: ["Dried Fruits", "Woody Notes"], 
    longevity: "12h+", 
    season: "Winter", 
    occasion: "Luxury Evening",
    dupe: { name: "Amber Oud Tobacco Edition", brand: "Al Haramain", price: "55 CHF" }
  },
  { 
    id: 5, 
    name: "Naxos", 
    brand: "Xerjoff", 
    image: "https://fimgs.net/mdimg/perfume/m.30454.jpg", 
    topNotes: ["Lavender", "Bergamot"], 
    middleNotes: ["Honey", "Cinnamon", "Cashmeran"], 
    baseNotes: ["Tobacco", "Vanilla", "Tonka Bean"], 
    longevity: "12h+", 
    season: "Winter/Fall", 
    occasion: "Signature",
    dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }
  }
];

const creators = [
  { name: "Jeremy Fragrance", desc: "The number one fragrance icon.", bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000" },
  { name: "TheCologneBoy", desc: "Specialist in mass-appeal and street reactions.", bgImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2000" }
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
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-light selection:bg-amber-200/20">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-[0.6em] text-white uppercase">Explorer</span>
            <span className="text-[8px] tracking-[0.4em] text-amber-500 font-black uppercase">Swiss Archive</span>
          </div>
          <div className="flex gap-10 text-[10px] tracking-[0.3em] font-bold uppercase">
            <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-white border-b border-amber-500 pb-1' : 'text-gray-500 hover:text-white transition-all'}>Archive</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'text-white border-b border-amber-500 pb-1' : 'text-gray-500 hover:text-white transition-all'}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-8 max-w-[1400px] mx-auto">
        {activeTab === 'discover' ? (
          <>
            <div className="relative max-w-2xl mx-auto mb-24">
              <input 
                type="text" 
                placeholder="SEARCH ARCHIVE..." 
                className="w-full bg-transparent border-b border-white/10 py-4 px-2 focus:outline-none focus:border-amber-500 transition-all text-xl font-extralight tracking-[0.2em] uppercase placeholder:text-gray-800"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <AnimatePresence mode='popLayout'>
                {filteredFragrances.map((frag) => (
                  <motion.div
                    key={frag.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedFragrance(frag)}
                    className="group cursor-pointer bg-white/[0.01] border border-white/5 rounded-sm p-8 hover:bg-white/[0.03] transition-all"
                  >
                    <div className="aspect-[3/4] mb-8 flex items-center justify-center">
                      <img src={frag.image} alt={frag.name} className="h-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-amber-500 font-bold tracking-[0.3em] mb-1 uppercase">{frag.brand}</p>
                      <h3 className="text-lg font-light tracking-widest uppercase text-white">{frag.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          /* CREATORS TAB */
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#080808] max-w-6xl w-full h-[90vh] rounded-sm overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl relative">
              
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-10 right-10 z-50 text-white/20 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>

              {/* LEFT: IMAGE AREA */}
              <div className="flex-1 bg-white p-16 flex items-center justify-center relative overflow-hidden">
                <img src={selectedFragrance.image} className="max-h-full object-contain relative z-10" />
                <div className="absolute bottom-4 left-4 text-black/[0.03] font-black text-[12rem] leading-none pointer-events-none uppercase">{selectedFragrance.brand.split(' ')[0]}</div>
              </div>

              {/* RIGHT: DATA AREA */}
              <div className="flex-1 p-16 overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
                <p className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase mb-6">{selectedFragrance.brand}</p>
                <h2 className="text-6xl font-bold text-white uppercase tracking-tighter mb-16">{selectedFragrance.name}</h2>

                <div className="space-y-16">
                  {/* NOTES SECTION */}
                  <div className="flex items-start gap-6">
                    <div className="mt-1 text-amber-500/50"><Layers size={20} /></div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-bold">The Progression</p>
                      <div className="space-y-4">
                         <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-xs text-white/40 uppercase font-bold">Top Notes</span>
                            <span className="text-sm text-white/90">{selectedFragrance.topNotes.join(' • ')}</span>
                         </div>
                         <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-xs text-white/40 uppercase font-bold">Heart Notes</span>
                            <span className="text-sm text-white/90">{selectedFragrance.middleNotes.join(' • ')}</span>
                         </div>
                         <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-xs text-white/40 uppercase font-bold">Base Notes</span>
                            <span className="text-sm text-white/90">{selectedFragrance.baseNotes.join(' • ')}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* STATS SECTION */}
                  <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5">
                    <div className="text-center">
                      <Clock size={18} className="mx-auto mb-3 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Duration</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.longevity}</p>
                    </div>
                    <div className="text-center">
                      <Calendar size={18} className="mx-auto mb-3 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Season</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.season}</p>
                    </div>
                    <div className="text-center">
                      <Wind size={18} className="mx-auto mb-3 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest mb-1">Occasion</p>
                      <p className="text-xs text-white font-medium">{selectedFragrance.occasion}</p>
                    </div>
                  </div>

                  {/* DUPE SECTION */}
                  {selectedFragrance.dupe && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-amber-500/[0.03] border border-amber-500/10 p-10 rounded-sm relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <Fingerprint size={24} className="text-amber-500" />
                            <h4 className="text-[11px] font-black tracking-[0.4em] uppercase text-white">REPLICA DNA</h4>
                          </div>
                          <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">{selectedFragrance.dupe.price}</span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed font-light italic">
                          "The most accurate reconstruction for this profile is found in <span className="text-amber-500 font-bold">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."
                        </p>
                      </div>
                    </motion.div>
                  )}
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
