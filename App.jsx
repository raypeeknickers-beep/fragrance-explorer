import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles } from 'lucide-react';

// --- DATA SECTION ---
const fragrances = [
  { id: 1, name: "Sauvage", brand: "Dior", image: "https://fimgs.net/mdimg/perfume/m.31861.jpg", topNotes: ["Bergamot"], middleNotes: ["Sichuan Pepper", "Lavender"], baseNotes: ["Ambroxan"], longevity: "8-10h", season: "All Year", occasion: "Daily" },
  { id: 2, name: "Aventus", brand: "Creed", image: "https://fimgs.net/mdimg/perfume/m.9828.jpg", topNotes: ["Pineapple", "Bergamot"], middleNotes: ["Birch", "Patchouli"], baseNotes: ["Musk", "Ambergris"], longevity: "10h+", season: "Spring", occasion: "Success" },
  { id: 3, name: "Bleu de Chanel", brand: "Chanel", image: "https://fimgs.net/mdimg/perfume/m.25967.jpg", topNotes: ["Grapefruit", "Lemon"], middleNotes: ["Ginger", "Jasmine"], baseNotes: ["Incense", "Sandalwood"], longevity: "8h", season: "All Year", occasion: "Office" },
  { id: 4, name: "Eros", brand: "Versace", image: "https://fimgs.net/mdimg/perfume/m.16657.jpg", topNotes: ["Mint", "Apple"], middleNotes: ["Tonka Bean", "Ambroxan"], baseNotes: ["Vanilla", "Cedar"], longevity: "10h", season: "Winter", occasion: "Clubbing" },
  { id: 5, name: "Le Male Elixir", brand: "JPG", image: "https://fimgs.net/mdimg/perfume/m.79350.jpg", topNotes: ["Lavender", "Mint"], middleNotes: ["Vanilla"], baseNotes: ["Honey", "Tobacco"], longevity: "12h+", season: "Winter", occasion: "Date" },
  { id: 6, name: "Layton", brand: "Parfums de Marly", image: "https://fimgs.net/mdimg/perfume/m.40344.jpg", topNotes: ["Apple", "Lavender"], middleNotes: ["Jasmine", "Violet"], baseNotes: ["Vanilla", "Pepper"], longevity: "9h", season: "Fall", occasion: "Evening" },
  { id: 7, name: "Tobacco Vanille", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.1825.jpg", topNotes: ["Tobacco Leaf"], middleNotes: ["Vanilla", "Cacao"], baseNotes: ["Dried Fruits"], longevity: "12h", season: "Winter", occasion: "Luxury" },
  { id: 8, name: "Y EDP", brand: "YSL", image: "https://fimgs.net/mdimg/perfume/m.50705.jpg", topNotes: ["Apple", "Ginger"], middleNotes: ["Sage", "Juniper"], baseNotes: ["Amberwood"], longevity: "10h", season: "All Year", occasion: "Versatile" },
  { id: 9, name: "Naxos", brand: "Xerjoff", image: "https://fimgs.net/mdimg/perfume/m.30454.jpg", topNotes: ["Lavender", "Lemon"], middleNotes: ["Honey", "Cinnamon"], baseNotes: ["Tobacco", "Vanilla"], longevity: "12h+", season: "Fall/Winter", occasion: "Special" },
  { id: 10, name: "Stronger With You", brand: "Armani", image: "https://fimgs.net/mdimg/perfume/m.45258.jpg", topNotes: ["Cardamom"], middleNotes: ["Sage"], baseNotes: ["Chestnut", "Vanilla"], longevity: "9h", season: "Winter", occasion: "Date Night" },
  { id: 11, name: "Light Blue", brand: "D&G", image: "https://fimgs.net/mdimg/perfume/m.44527.jpg", topNotes: ["Grapefruit"], middleNotes: ["Juniper"], baseNotes: ["Musk"], longevity: "5h", season: "Summer", occasion: "Beach" },
  { id: 12, name: "Spicebomb Extreme", brand: "V&R", image: "https://fimgs.net/mdimg/perfume/m.30449.jpg", topNotes: ["Black Pepper"], middleNotes: ["Cumin"], baseNotes: ["Tobacco", "Vanilla"], longevity: "10h", season: "Winter", occasion: "Night" },
  { id: 13, name: "Ombré Leather", brand: "Tom Ford", image: "https://fimgs.net/mdimg/perfume/m.49238.jpg", topNotes: ["Cardamom"], middleNotes: ["Leather", "Jasmine"], baseNotes: ["Amber", "Moss"], longevity: "10h", season: "Fall", occasion: "Signature" },
  { id: 14, name: "The Most Wanted", brand: "Azzaro", image: "https://fimgs.net/mdimg/perfume/m.66826.jpg", topNotes: ["Cardamom"], middleNotes: ["Toffee"], baseNotes: ["Amberwood"], longevity: "9h", season: "Winter", occasion: "Date" },
  { id: 15, name: "L'Homme Ideal", brand: "Guerlain", image: "https://fimgs.net/mdimg/perfume/m.25306.jpg", topNotes: ["Citrus", "Rosemary"], middleNotes: ["Almond", "Tonka"], baseNotes: ["Leather", "Cedar"], longevity: "8h", season: "Spring/Fall", occasion: "Business" },
  { id: 16, name: "Acqua di Gio", brand: "Armani", image: "https://fimgs.net/mdimg/perfume/m.410.jpg", topNotes: ["Sea Notes", "Lime"], middleNotes: ["Jasmine", "Peach"], baseNotes: ["Cedar", "Musk"], longevity: "6h", season: "Summer", occasion: "Fresh" },
  { id: 17, name: "Grand Soir", brand: "MFK", image: "https://fimgs.net/mdimg/perfume/m.40814.jpg", topNotes: ["Labdanum"], middleNotes: ["Benzoin"], baseNotes: ["Amber", "Vanilla"], longevity: "12h", season: "Winter", occasion: "Formal" },
  { id: 18, name: "Baccarat Rouge 540", brand: "MFK", image: "https://fimgs.net/mdimg/perfume/m.33531.jpg", topNotes: ["Saffron", "Jasmine"], middleNotes: ["Amberwood"], baseNotes: ["Fir Resin"], longevity: "12h+", season: "All Year", occasion: "Luxury" },
  { id: 19, name: "Luna Rossa Ocean", brand: "Prada", image: "https://fimgs.net/mdimg/perfume/m.68606.jpg", topNotes: ["Bergamot"], middleNotes: ["Iris", "Lavender"], baseNotes: ["Caramel"], longevity: "7h", season: "Spring", occasion: "Clean" },
  { id: 20, name: "Interlude Man", brand: "Amouage", image: "https://fimgs.net/mdimg/perfume/m.15294.jpg", topNotes: ["Oregano", "Pepper"], middleNotes: ["Incense", "Amber"], baseNotes: ["Leather", "Oud"], longevity: "15h+", season: "Winter", occasion: "Bold" },
];

const creators = [
  { name: "Jeremy Fragrance", desc: "The number one fragrance icon.", bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" },
  { name: "TheCologneBoy", desc: "Street interviews and mass appeal.", bgImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000" },
  { name: "Noel Thomas", desc: "The king of aesthetic niche reviews.", bgImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000" }
];

// --- APP COMPONENT ---
function FragranceExplorer() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  const filteredFragrances = useMemo(() => {
    return fragrances.filter(f => 
      f.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      f.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-amber-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-[0.3em] bg-gradient-to-r from-amber-200 to-yellow-600 bg-clip-text text-transparent">
            FRAGRANCE EXPLORER
          </h1>
          <div className="flex gap-10 text-xs tracking-widest font-semibold uppercase">
            <button onClick={() => setActiveTab('discover')} className={activeTab === 'discover' ? 'text-amber-400' : 'text-gray-500 hover:text-white transition-colors'}>Discover</button>
            <button onClick={() => setActiveTab('creators')} className={activeTab === 'creators' ? 'text-amber-400' : 'text-gray-500 hover:text-white transition-colors'}>Creators</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        {activeTab === 'discover' ? (
          <>
            <div className="relative max-w-xl mx-auto mb-20 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or letter..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-16 focus:outline-none focus:border-amber-500/50 transition-all text-lg backdrop-blur-lg"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <AnimatePresence mode='popLayout'>
                {filteredFragrances.map((frag) => (
                  <motion.div
                    key={frag.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedFragrance(frag)}
                    className="cursor-pointer bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
                  >
                    <div className="aspect-[4/5] mb-8 flex items-center justify-center relative z-10">
                      <img src={frag.image} alt={frag.name} className="h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="relative z-10 text-center">
                      <h3 className="text-lg font-bold mb-1 tracking-tight">{frag.name}</h3>
                      <p className="text-amber-500/60 text-[10px] uppercase tracking-[0.2em] font-black">{frag.brand}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {creators.map((creator) => (
              <div key={creator.name} className="relative h-[500px] rounded-[2.5rem] overflow-hidden group border border-white/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-40" style={{ backgroundImage: `url(${creator.bgImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h2 className="text-3xl font-bold mb-3">{creator.name}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{creator.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal View */}
      <AnimatePresence>
        {selectedFragrance && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0f0f0f] max-w-4xl w-full rounded-[3rem] overflow-hidden relative border border-white/10 shadow-2xl">
              <button onClick={() => setSelectedFragrance(null)} className="absolute top-8 right-8 z-50 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><X size={20}/></button>
              <div className="grid md:grid-cols-2">
                <div className="bg-white flex items-center justify-center p-16">
                  <img src={selectedFragrance.image} className="max-h-[400px] object-contain drop-shadow-2xl" />
                </div>
                <div className="p-12">
                  <span className="text-amber-500 text-[10px] tracking-[0.4em] font-black uppercase mb-4 block">{selectedFragrance.brand}</span>
                  <h2 className="text-4xl font-bold mb-10 tracking-tight">{selectedFragrance.name}</h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">The Scent Profile</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFragrance.topNotes.map(n => <span key={n} className="px-3 py-1 bg-white/5 rounded-lg text-xs">{n}</span>)}
                        {selectedFragrance.middleNotes.map(n => <span key={n} className="px-3 py-1 bg-white/5 rounded-lg text-xs">{n}</span>)}
                        {selectedFragrance.baseNotes.map(n => <span key={n} className="px-3 py-1 bg-white/5 rounded-lg text-xs opacity-60">{n}</span>)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                      <div className="text-center">
                        <Clock size={16} className="mx-auto mb-2 text-amber-500" />
                        <p className="text-[9px] text-gray-500 uppercase">Power</p>
                        <p className="text-xs font-bold">{selectedFragrance.longevity}</p>
                      </div>
                      <div className="text-center">
                        <Calendar size={16} className="mx-auto mb-2 text-amber-500" />
                        <p className="text-[9px] text-gray-500 uppercase">Season</p>
                        <p className="text-xs font-bold">{selectedFragrance.season}</p>
                      </div>
                      <div className="text-center">
                        <Wind size={16} className="mx-auto mb-2 text-amber-500" />
                        <p className="text-[9px] text-gray-500 uppercase">Occasion</p>
                        <p className="text-xs font-bold">{selectedFragrance.occasion}</p>
                      </div>
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

// --- MOUNTING ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<FragranceExplorer />);
}
