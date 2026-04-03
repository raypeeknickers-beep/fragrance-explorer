import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles, MoveRight, Fingerprint, Pyramid } from 'lucide-react';

// --- ULTRA-HD DATA ARCHIVE ---
const fragrances = [
  { 
    id: 1, 
    name: "Sauvage Elixir", 
    brand: "Dior", 
    image: "https://www.dior.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master_dior/default/dw1578e19c/assets/Y0996460/Y0996460_E01.jpg", 
    topNotes: ["Cinnamon", "Nutmeg", "Cardamom", "Grapefruit"], 
    middleNotes: ["Lavender"], 
    baseNotes: ["Licorice", "Sandalwood", "Amber", "Patchouli", "Haitian Vetiver"], 
    longevity: "12h+", season: "Winter/Fall", occasion: "Night / Formal",
    dupe: { name: "Lattafa Asad", brand: "Lattafa", price: "28 CHF" }
  },
  { 
    id: 2, 
    name: "Aventus", 
    brand: "Creed", 
    image: "https://www.creedfragrance.com/cdn/shop/files/Aventus_100ml_Bottle_Front_1000x.jpg", 
    topNotes: ["Pineapple", "Bergamot", "Black Currant", "Apple"], 
    middleNotes: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"], 
    baseNotes: ["Musk", "Oak Moss", "Ambergris", "Vanilla"], 
    longevity: "10h+", season: "Spring/Summer", occasion: "Success",
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
    longevity: "12h+", season: "Winter", occasion: "Luxury Night Out",
    dupe: { name: "Amber Oud Tobacco Edition", brand: "Al Haramain", price: "55 CHF" }
  },
  { 
    id: 4, 
    name: "Naxos", 
    brand: "Xerjoff", 
    image: "https://www.xerjoff.com/1529-large_default/naxos.jpg", 
    topNotes: ["Lavender", "Bergamot", "Lemon"], 
    middleNotes: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"], 
    baseNotes: ["Tobacco Leaf", "Vanilla", "Tonka Bean"], 
    longevity: "12h+", season: "Fall/Winter", occasion: "Signature",
    dupe: { name: "Voux Elegante", brand: "Emir", price: "45 CHF" }
  },
  { 
    id: 5, 
    name: "Le Male Elixir", 
    brand: "Jean Paul Gaultier", 
    image: "https://www.jeanpaulgaultier.com/dw/image/v2/BCXQ_PRD/on/demandware.static/-/Sites-jpg-master-catalog/default/dw204f1642/2023/LE_MALE/ELIXIR/JPG_LE_MALE_ELIXIR_90ML_01.jpg", 
    topNotes: ["Lavender", "Mint"], 
    middleNotes: ["Vanilla", "Benzoin"], 
    baseNotes: ["Honey", "Tonka Bean", "Tobacco"], 
    longevity: "11h", season: "Winter", occasion: "Date Night",
    dupe: { name: "Lattafa Ramz Silver", brand: "Lattafa", price: "22 CHF" }
  },
  { 
    id: 6, 
    name: "Layton", 
    brand: "Parfums de Marly", 
    image: "https://fimgs.net/mdimg/perfume/m.40344.jpg", 
    topNotes: ["Apple", "Lavender", "Bergamot", "Mandarin Orange"], 
    middleNotes: ["Geranium", "Violet", "Jasmine"], 
    baseNotes: ["Vanilla", "Cardamom", "Sandalwood", "Pepper", "Guaiac Wood"], 
    longevity: "9-10h", season: "Fall/Winter", occasion: "Versatile Luxury",
    dupe: { name: "Detour Noir", brand: "Al Haramain", price: "38 CHF" }
  },
  { 
    id: 7, 
    name: "Baccarat Rouge 540", 
    brand: "Maison Francis Kurkdjian", 
    image: "https://fimgs.net/mdimg/perfume/m.33531.jpg", 
    topNotes: ["Saffron", "Jasmine"], 
    middleNotes: ["Amberwood", "Ambergris"], 
    baseNotes: ["Fir Resin", "Cedar"], 
    longevity: "12h+", season: "All Year", occasion: "Status",
    dupe: { name: "Club de Nuit Untold", brand: "Armaf", price: "48 CHF" }
  },
  { 
    id: 8, 
    name: "Angels' Share", 
    brand: "Kilian Paris", 
    image: "https://fimgs.net/mdimg/perfume/m.62615.jpg", 
    topNotes: ["Cognac"], 
    middleNotes: ["Cinnamon", "Tonka Bean", "Oak"], 
    baseNotes: ["Praline", "Vanilla", "Sandalwood"], 
    longevity: "10h", season: "Winter", occasion: "Evening Luxury",
    dupe: { name: "Khamrah", brand: "Lattafa", price: "42 CHF" }
  },
  { 
    id: 9, 
    name: "Ganimede", 
    brand: "Marc-Antoine Barrois", 
    image: "https://fimgs.net/mdimg/perfume/m.54733.jpg", 
    topNotes: ["Mandarin", "Saffron"], 
    middleNotes: ["Violet", "Osmanthus"], 
    baseNotes: ["Akigalawood", "Immortelle"], 
    longevity: "14h+", season: "All Year", occasion: "Avant-Garde",
    dupe: { name: "North Stag Sept VII", brand: "Paris Corner", price: "52 CHF" }
  },
  { 
    id: 10, 
    name: "Ombré Leather", 
    brand: "Tom Ford", 
    image: "https://fimgs.net/mdimg/perfume/m.49238.jpg", 
    topNotes: ["Cardamom"], 
    middleNotes: ["Leather", "Jasmine Sambac"], 
    baseNotes: ["Amber", "Moss", "Patchouli"], 
    longevity: "9h", season: "Fall/Winter", occasion: "Signature / Bold",
    dupe: { name: "Afkar", brand: "Lattafa", price: "34 CHF" }
  }
];

// --- APP COMPONENT ---
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
            <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-amber-500' : 'text-gray-600 hover:text-white transition-all'}>Archive</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'text-amber-500' : 'text-gray-600 hover:text-white transition-all'}>Creators</button>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
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
          <div className="text-center py-20 text-gray-500 uppercase tracking-widest text-xs font-bold">Creator Profiles Coming Soon</div>
        )}
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedFragrance && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#050505] max-w-7xl w-full h-[90vh] rounded-sm overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl relative">
              
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-10 right-10 z-50 text-white/20 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>

              {/* LEFT: HD IMAGE AREA */}
              <div className="flex-1 bg-white p-20 flex items-center justify-center relative overflow-hidden">
                <img src={selectedFragrance.image} className="max-h-full object-contain relative z-10 drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] scale-110" />
                <div className="absolute top-8 left-8 text-black/[0.05] font-black text-6xl pointer-events-none uppercase">{selectedFragrance.brand.split(' ')[0]}</div>
              </div>

              {/* RIGHT: ARCHITECTURAL DATA */}
              <div className="flex-1 p-16 md:p-20 overflow-y-auto bg-[#080808]">
                <p className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase mb-6">{selectedFragrance.brand}</p>
                <h2 className="text-6xl font-bold text-white uppercase tracking-tighter mb-20 leading-none">{selectedFragrance.name}</h2>

                <div className="space-y-16">
                  {/* SEPARATED NOTES SECTION */}
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

                  {/* DUPE SECTION */}
                  {selectedFragrance.dupe && (
                    <div className="bg-amber-500/[0.02] border border-amber-500/10 p-10 rounded-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Fingerprint size={24} className="text-amber-500" />
                          <h4 className="text-[11px] font-black tracking-[0.5em] uppercase text-white">Replica Discovery</h4>
                        </div>
                        <span className="bg-amber-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase">{selectedFragrance.dupe.price}</span>
                      </div>
                      <p className="text-base text-white/60 leading-relaxed font-extralight italic">
                        "The most accurate replica for this profile is <span className="text-white font-bold border-b border-amber-500/40">{selectedFragrance.dupe.name}</span> by {selectedFragrance.dupe.brand}."
                      </p>
                    </div>
                  )}
                  
                  {/* SPECS */}
                  <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5 text-center">
                    <div>
                      <Clock size={20} className="mx-auto mb-2 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 font-bold uppercase">Power</p>
                      <p className="text-xs text-white">{selectedFragrance.longevity}</p>
                    </div>
                    <div>
                      <Calendar size={20} className="mx-auto mb-2 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 font-bold uppercase">Season</p>
                      <p className="text-xs text-white">{selectedFragrance.season}</p>
                    </div>
                    <div>
                      <Wind size={20} className="mx-auto mb-2 text-amber-500/50" />
                      <p className="text-[9px] text-gray-600 font-bold uppercase">Occasion</p>
                      <p className="text-xs text-white">{selectedFragrance.occasion}</p>
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
