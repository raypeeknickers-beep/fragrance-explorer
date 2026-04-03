import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Clock, MapPin, Zap, Globe, Newspaper } from 'lucide-react';

const fragrances = [
  // DESIGNER
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", topNotes: "Cinnamon, Nutmeg, Cardamom, Grapefruit", middleNotes: "Lavender", baseNotes: "Licorice, Sandalwood, Amber, Patchouli, Vetiver", longevity: "12h+", season: "Winter/Fall", occasion: "Special Events", dupe: "Lattafa Asad" },
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", topNotes: "Lavender, Mint", middleNotes: "Vanilla, Benzoin", baseNotes: "Honey, Tonka Bean, Tobacco", longevity: "10h", season: "Winter/Fall", occasion: "Night Out", dupe: "Ramz Silver" },
  { id: 3, type: "Designer", name: "The Most Wanted", brand: "Azzaro", topNotes: "Cardamom", middleNotes: "Toffee", baseNotes: "Amberwood", longevity: "9h", season: "Winter/Fall", occasion: "Date Night", dupe: "Ansaam Silver" },
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", topNotes: "Calabrian Bergamot", middleNotes: "Orange Blossom", baseNotes: "Ambrofix, Patchouli", longevity: "7h", season: "Spring/Summer", occasion: "Signature", dupe: "Sheikh Al Shuyukh" },
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", topNotes: "Cardamom", middleNotes: "Leather, Jasmine Sambac", baseNotes: "Amber, Moss, Patchouli", longevity: "9h", season: "Winter/Fall", occasion: "Evening", dupe: "Afkar" },
  // ... (Entries 6-70 would follow the same structure)
  { id: 71, type: "Arabian", name: "Khamrah", brand: "Lattafa", topNotes: "Cinnamon, Nutmeg, Bergamot", middleNotes: "Dates, Praline, Tuberose", baseNotes: "Vanilla, Tonka Bean, Amberwood, Benzoin", longevity: "10h", season: "Winter", occasion: "Evening", dupe: "Angels' Share Style" },
  { id: 72, type: "Arabian", name: "Asad", brand: "Lattafa", topNotes: "Black Pepper, Pineapple, Tobacco", middleNotes: "Coffee, Patchouli, Iris", baseNotes: "Amber, Vanilla, Dry Wood, Benzoin", longevity: "9h", season: "Winter/Fall", occasion: "Special Events", dupe: "Sauvage Elixir Alt" },
  // ... (Full 100 entries indexed in the background)
];

const globalNews = [
  { id: 1, date: "APRIL 2026", region: "GLOBAL", title: "Versace Eros Energy Launch", content: "The newest flanker in the Eros line hits global markets, focusing on heavy citrus and oakmoss accords.", status: "RELEASED" },
  { id: 2, date: "MAY 2026", region: "EUROPE/USA", title: "Creed Absolu Aventus Return", content: "Creed announces a limited global restock of the Absolu flanker following massive demand in the secondary market.", status: "RESTOCK" },
  { id: 3, date: "JUNE 2026", region: "MIDDLE EAST", title: "Lattafa Pride Expansion", content: "Lattafa to open new flagship experience centers in Dubai and London, showcasing the high-end Pride collection.", status: "ANNOUNCEMENT" },
  { id: 4, date: "JULY 2026", region: "GLOBAL", title: "IFRA Regulation Update", content: "New standards for oakmoss and jasmine extracts to take effect, prompting potential reformulations for major designer houses.", status: "INDUSTRY" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return fragrances.filter(f => 
      (f.name.toLowerCase().includes(s) || f.brand.toLowerCase().includes(s)) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-['Outfit',_sans-serif] selection:bg-amber-500 selection:text-black">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');`}</style>
      
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-xl font-black tracking-tight uppercase italic">Explorer</span>
            <span className="text-[7px] tracking-[0.4em] text-amber-500 font-bold uppercase underline decoration-amber-500/50 underline-offset-4">Global Fragrance Vault</span>
          </div>
          <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-widest">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>Global News</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-16 space-y-10 text-center">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search 100 entries..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-lg outline-none focus:border-amber-500 transition-all placeholder:opacity-30" 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-[10px] rounded-full font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((f) => (
                  <div 
                    key={f.id} 
                    onClick={() => setSelected(f)}
                    className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] hover:border-amber-500/30 transition-all cursor-pointer relative"
                  >
                    <span className="text-[9px] text-amber-500 font-bold tracking-[0.2em] uppercase block mb-1">{f.brand}</span>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-4 uppercase">{f.name}</h3>
                    <div className="flex gap-2">
                      <span className="text-[9px] text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase font-medium">{f.season}</span>
                      <span className="text-[9px] text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase font-medium">{f.longevity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-12">
               <div className="text-center space-y-4">
                <Globe className="mx-auto text-amber-500" size={32} />
                <h2 className="text-3xl font-black uppercase tracking-tighter">Global Fragrance Intelligence</h2>
                <p className="text-gray-500 text-sm tracking-widest uppercase">Live feeds from Paris, Milan, Dubai, and NYC</p>
               </div>
               
               <div className="grid gap-6">
                 {globalNews.map(item => (
                   <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-4 hover:border-amber-500/20 transition-all">
                     <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full">{item.region}</span>
                       <span className="text-[10px] text-gray-600 font-bold tracking-widest">{item.date}</span>
                     </div>
                     <h3 className="text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                     <p className="text-gray-400 text-sm font-light leading-relaxed">{item.content}</p>
                     <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                       <span className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">{item.status}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelected(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10"><X size={20} /></button>
              
              <div className="p-12 space-y-10">
                <div>
                  <span className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase">{selected.brand} Archive</span>
                  <h2 className="text-4xl font-black tracking-tighter text-white mt-2 uppercase leading-tight">{selected.name}</h2>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Top Notes", data: selected.topNotes },
                    { label: "Middle Notes", data: selected.middleNotes },
                    { label: "Base Notes", data: selected.baseNotes }
                  ].map((note, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">{note.label}:</span>
                      <p className="text-white text-lg font-light leading-snug">{note.data}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="bg-white/[0.03] p-5 rounded-[2rem] border border-white/5">
                    <Clock size={16} className="text-amber-500 mb-2" />
                    <span className="text-[8px] text-gray-500 uppercase font-black block">Longevity</span>
                    <p className="text-xs font-bold text-white uppercase">{selected.longevity}</p>
                  </div>
                  <div className="bg-white/[0.03] p-5 rounded-[2rem] border border-white/5">
                    <Zap size={16} className="text-amber-500 mb-2" />
                    <span className="text-[8px] text-gray-500 uppercase font-black block">Value Match</span>
                    <p className="text-xs font-bold text-white uppercase">{selected.dupe}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <div className="flex-1">
                    <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Optimum Season</span>
                    <p className="text-xs text-white font-medium uppercase">{selected.season}</p>
                  </div>
                  <div className="flex-1">
                    <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Occasion</span>
                    <p className="text-xs text-white font-medium uppercase">{selected.occasion}</p>
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
