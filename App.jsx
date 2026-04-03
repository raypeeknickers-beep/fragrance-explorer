import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles, MoveRight } from 'lucide-react';

// --- DATA SECTION ---
const fragrances = [
  { id: 1, name: "Sauvage", brand: "Dior", image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw646927a3/assets/Y0996004/Y0996004_E01.jpg", topNotes: ["Calabrian Bergamot", "Pepper"], middleNotes: ["Sichuan Pepper", "Lavender"], baseNotes: ["Ambroxan", "Cedar"], longevity: "8-10h", season: "All Year", occasion: "Versatile" },
  { id: 2, name: "Aventus", brand: "Creed", image: "https://fimgs.net/mdimg/perfume/m.9828.jpg", topNotes: ["Pineapple", "Black Currant"], middleNotes: ["Birch", "Patchouli"], baseNotes: ["Musk", "Oak Moss"], longevity: "10h+", season: "Spring/Summer", occasion: "Success" },
  { id: 3, name: "Bleu de Chanel", brand: "Chanel", image: "https://www.chanel.com/images/t_one/t_fragrance_v2/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_620/bleu-de-chanel-eau-de-parfum-spray-100ml-v3-packshot-107360-9533350281246.jpg", topNotes: ["Grapefruit", "Lemon"], middleNotes: ["Ginger", "Nutmeg"], baseNotes: ["Incense", "Sandalwood"], longevity: "8-9h", season: "All Year", occasion: "Professional" },
  { id: 4, name: "Eros", brand: "Versace", image: "https://fimgs.net/mdimg/perfume/m.16657.jpg", topNotes: ["Mint", "Green Apple"], middleNotes: ["Tonka Bean", "Geranium"], baseNotes: ["Madagascar Vanilla", "Cedar"], longevity: "10h", season: "Winter", occasion: "Night Out" },
  { id: 5, name: "Tobacco Vanille", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.1825.jpg", topNotes: ["Tobacco Leaf", "Spice"], middleNotes: ["Vanilla", "Cacao"], baseNotes: ["Dried Fruits", "Woody Notes"], longevity: "12h+", season: "Winter", occasion: "Formal Luxury" },
  { id: 6, name: "Naxos", brand: "Xerjoff", image: "https://fimgs.net/mdimg/perfume/m.30454.jpg", topNotes: ["Lavender", "Bergamot"], middleNotes: ["Honey", "Cinnamon"], baseNotes: ["Tobacco", "Vanilla"], longevity: "12h", season: "Fall/Winter", occasion: "Signature" },
];

const creators = [
  { name: "Jeremy Fragrance", desc: "The world's most recognizable fragrance personality, focusing on power and mass-appeal.", bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000" },
  { name: "TheCologneBoy", desc: "Specialist in street reactions and identifying what scents genuinely attract attention in the real world.", bgImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2000" },
  { name: "Noel Thomas", desc: "Curator of niche aesthetics, focusing on the artistry and 'vibe' of high-end perfumery.", bgImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000" }
];

// --- STYLES ---
const glassStyle = "bg-white/[0.02] border border-white/10 backdrop-blur-md";

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
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] font-light selection:bg-amber-200/20 overflow-x-hidden">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-[0.4em] text-white">FRAGRANCE</span>
            <span className="text-[10px] tracking-[0.8em] text-amber-500 font-black ml-1">EXPLORER</span>
          </div>
          
          <div className="flex gap-12 text-[11px] tracking-[0.3em] font-bold uppercase">
            <button onClick={() => setActiveTab('discover')} className={`transition-all ${activeTab === 'discover' ? 'text-white border-b border-amber-500 pb-1' : 'text-gray-500 hover:text-white'}`}>Discover</button>
            <button onClick={() => setActiveTab('creators')} className={`transition-all ${activeTab === 'creators' ? 'text-white border-b border-amber-500 pb-1' : 'text-gray-500 hover:text-white'}`}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-10 max-w-[1600px] mx-auto">
        {activeTab === 'discover' ? (
          <>
            {/* SEARCH BAR */}
            <div className="relative max-w-3xl mx-auto mb-32">
              <input 
                type="text" 
                placeholder="SEARCH SCENTS..." 
                className="w-full bg-transparent border-b border-white/20 py-6 px-4 focus:outline-none focus:border-amber-500 transition-all text-2xl font-extralight tracking-widest placeholder:text-gray-800 uppercase"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
            </div>

            {/* GRID */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              <AnimatePresence mode='popLayout'>
                {filteredFragrances.map((frag) => (
                  <motion.div
                    key={frag.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -15 }}
                    onClick={() => setSelectedFragrance(frag)}
                    className={`group cursor-pointer rounded-sm overflow-hidden p-10 transition-all duration-500 ${glassStyle}`}
                  >
                    <div className="aspect-[3/4] mb-12 flex items-center justify-center relative">
                      {/* Suble Glow behind bottle */}
                      <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full group-hover:bg-amber-500/10 transition-colors" />
                      <img src={frag.image} alt={frag.name} className="h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" />
                    </div>
                    <div className="border-t border-white/5 pt-6 text-center">
                      <p className="text-[10px] text-amber-500 font-black tracking-[0.4em] mb-2 uppercase">{frag.brand}</p>
                      <h3 className="text-xl font-medium tracking-tight text-white group-hover:tracking-widest transition-all duration-500 uppercase">{frag.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          /* CREATORS TAB */
          <div className="grid grid-cols-1 gap-20">
            {creators.map((creator, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative h-[70vh] w-full flex items-center px-20 overflow-hidden rounded-lg border border-white/5"
                key={i}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale opacity-20 transition-all duration-1000 hover:grayscale-0 hover:opacity-40" 
                  style={{ backgroundImage: `url(${creator.bgImage})` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
                
                <div className="relative z-10 max-w-xl">
                  <h2 className="text-7xl font-bold mb-6 tracking-tighter text-white uppercase italic">{creator.name}</h2>
                  <p className="text-lg text-gray-400 font-light leading-relaxed mb-8">{creator.desc}</p>
                  <button className="flex items-center gap-4 text-xs tracking-[0.5em] font-bold text-amber-500 uppercase hover:text-white transition-colors group">
                    View Favorites <MoveRight className="group-hover:translate-x-4 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFragrance && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className="bg-[#0a0a0a] max-w-6xl w-full h-[85vh] rounded-sm overflow-hidden flex flex-col md:flex-row relative border border-white/10"
            >
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-10 right-10 z-50 text-white/50 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>
              
              <div className="flex-1 bg-white p-20 flex items-center justify-center">
                <img src={selectedFragrance.image} className="max-h-full object-contain drop-shadow-2xl scale-125" />
              </div>
              
              <div className="flex-1 p-20 flex flex-col justify-center">
                <p className="text-amber-500 font-black tracking-[0.5em] text-xs uppercase mb-4">{selectedFragrance.brand}</p>
                <h2 className="text-6xl font-bold mb-12 tracking-tighter text-white uppercase">{selectedFragrance.name}</h2>
                
                <div className="space-y-12">
                  <div>
                    <h4 className="text-[10px] tracking-[0.4em] text-gray-500 uppercase mb-6 font-bold flex items-center gap-3">
                      <Sparkles size={14} className="text-amber-500" /> Scent Profile
                    </h4>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-2">Opening</p>
                        <p className="text-sm tracking-wide">{selectedFragrance.topNotes.join(' • ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase mb-2">Heart</p>
                        <p className="text-sm tracking-wide">{selectedFragrance.middleNotes.join(' • ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-12 border-t border-white/5">
                    <div className="text-center group">
                      <Clock size={20} className="mx-auto mb-3 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Duration</p>
                      <p className="text-sm text-white">{selectedFragrance.longevity}</p>
                    </div>
                    <div className="text-center group">
                      <Calendar size={20} className="mx-auto mb-3 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Season</p>
                      <p className="text-sm text-white">{selectedFragrance.season}</p>
                    </div>
                    <div className="text-center group">
                      <Wind size={20} className="mx-auto mb-3 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Occasion</p>
                      <p className="text-sm text-white">{selectedFragrance.occasion}</p>
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
