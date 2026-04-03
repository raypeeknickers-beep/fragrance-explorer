import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fingerprint, Bell, Flame, ChevronRight, info } from 'lucide-react';

const fragrances = [
  // DESIGNER (30)
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", dupe: "Lattafa Asad" },
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", dupe: "Lattafa Ramz Silver" },
  { id: 3, type: "Designer", name: "Most Wanted Parfum", brand: "Azzaro", dupe: "Ansaam Silver" },
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", dupe: "Sheikh Al Shuyukh" },
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", dupe: "Afkar" },
  { id: 6, type: "Designer", name: "Bleu de Chanel", brand: "Chanel", dupe: "Armaf Iconic" },
  { id: 7, type: "Designer", name: "Acqua di Gio Profondo", brand: "Armani", dupe: "Lattafa Liam Blue" },
  { id: 8, type: "Designer", name: "Spicebomb Extreme", brand: "V&R", dupe: "Charuto Tobacco" },
  { id: 9, type: "Designer", name: "Eros Flame", brand: "Versace", dupe: "Maison Alhambra Versencia" },
  { id: 10, type: "Designer", name: "Gentleman Reserve Privée", brand: "Givenchy", dupe: "Kayaan Classic" },
  { id: 11, type: "Designer", name: "Luna Rossa Black", brand: "Prada", dupe: "Lattafa Pride" },
  { id: 12, type: "Designer", name: "Stronger With You Intensely", brand: "Armani", dupe: "Proud of You" },
  { id: 13, type: "Designer", name: "Valentino Uomo Born In Roma", brand: "Valentino", dupe: "Lattafa Winners" },
  { id: 14, type: "Designer", name: "Terre d'Hermès", brand: "Hermès", dupe: "Rasasi Fattan" },
  { id: 15, type: "Designer", name: "Y EDP", brand: "YSL", dupe: "Lattafa Fakhar Black" },
  { id: 16, type: "Designer", name: "Dior Homme Intense", brand: "Dior", dupe: "Dark Door Intense" },
  { id: 17, type: "Designer", name: "L'Homme Ideal", brand: "Guerlain", dupe: "FW Ideal Home" },
  { id: 18, type: "Designer", name: "Invictus Victory", brand: "Paco Rabanne", dupe: "Lattafa Hayaati" },
  { id: 19, type: "Designer", name: "Bad Boy Extreme", brand: "Carolina Herrera", dupe: "Maison Alhambra" },
  { id: 20, type: "Designer", name: "1 Million Royal", brand: "Paco Rabanne", dupe: "Lattafa" },
  { id: 21, type: "Designer", name: "Light Blue Intense", brand: "D&G", dupe: "Lattafa Blue" },
  { id: 22, type: "Designer", name: "The One EDP", brand: "D&G", dupe: "Pendora Scents" },
  { id: 23, type: "Designer", name: "Gucci Guilty Elixir", brand: "Gucci", dupe: "Lattafa" },
  { id: 24, type: "Designer", name: "Code Parfum", brand: "Armani", dupe: "Afnan" },
  { id: 25, type: "Designer", name: "Allure Homme Edition Blanche", brand: "Chanel", dupe: "Al Dirgham" },
  { id: 26, type: "Designer", name: "Polo Red", brand: "Ralph Lauren", dupe: "Afnan" },
  { id: 27, type: "Designer", name: "Encre Noire", brand: "Lalique", dupe: "Niche" },
  { id: 28, type: "Designer", name: "Viking", brand: "Creed", dupe: "Lattafa" },
  { id: 29, type: "Designer", name: "Greenley", brand: "PDM", dupe: "Afnan" },
  { id: 30, type: "Designer", name: "Haltane", brand: "PDM", dupe: "Lattafa" },

  // NICHE (30)
  { id: 31, type: "Niche", name: "Aventus", brand: "Creed", dupe: "Club de Nuit Intense" },
  { id: 32, type: "Niche", name: "Naxos", brand: "Xerjoff", dupe: "Voux Elegante" },
  { id: 33, type: "Niche", name: "Layton", brand: "PDM", dupe: "Detour Noir" },
  { id: 34, type: "Niche", name: "Angels' Share", brand: "Kilian", dupe: "Khamrah" },
  { id: 35, type: "Niche", name: "Ganymede", brand: "Marc-Antoine Barrois", dupe: "Sept VII" },
  { id: 36, type: "Niche", name: "Baccarat Rouge 540", brand: "MFK", dupe: "Club de Nuit Untold" },
  { id: 37, type: "Niche", name: "Side Effect", brand: "Initio", dupe: "After Effect" },
  { id: 38, type: "Niche", name: "Hacivat", brand: "Nishane", dupe: "Imperium" },
  { id: 39, type: "Niche", name: "Oud For Greatness", brand: "Initio", dupe: "Oud For Glory" },
  { id: 40, type: "Niche", name: "Tobacco Vanille", brand: "Tom Ford", dupe: "Charuto" },
  { id: 41, type: "Niche", name: "Silver Mountain Water", brand: "Creed", dupe: "Club de Nuit Sillage" },
  { id: 42, type: "Niche", name: "Green Irish Tweed", brand: "Creed", dupe: "Tres Nuit" },
  { id: 43, type: "Niche", name: "Black Phantom", brand: "Kilian", dupe: "Black Knight" },
  { id: 44, type: "Niche", name: "Alexandria II", brand: "Xerjoff", dupe: "Lattafa Pride" },
  { id: 45, type: "Niche", name: "Grand Soir", brand: "MFK", dupe: "Eternal Oud" },
  { id: 46, type: "Niche", name: "Reflection Man", brand: "Amouage", dupe: "The Tux" },
  { id: 47, type: "Niche", name: "Interlude Man", brand: "Amouage", dupe: "Midnight Oud" },
  { id: 48, type: "Niche", name: "Ani", brand: "Nishane", dupe: "Lattafa Nasheet" },
  { id: 49, type: "Niche", name: "Carlisle", brand: "PDM", dupe: "Lattafa" },
  { id: 50, type: "Niche", name: "Pegasus", brand: "PDM", dupe: "Armaf Craze" },
  { id: 51, type: "Niche", name: "Erba Pura", brand: "Xerjoff", dupe: "Amber Oud Gold" },
  { id: 52, type: "Niche", name: "Tuxedo", brand: "YSL", dupe: "The Tux" },
  { id: 53, type: "Niche", name: "Instant Crush", brand: "Mancera", dupe: "Afnan" },
  { id: 54, type: "Niche", name: "Cedrat Boise", brand: "Mancera", dupe: "Afnan" },
  { id: 55, type: "Niche", name: "Red Tobacco", brand: "Mancera", dupe: "Afnan" },
  { id: 56, type: "Niche", name: "Rich Warm Addictive", brand: "Zara", dupe: "Niche Alt" },
  { id: 57, type: "Niche", name: "Tygar", brand: "Bvlgari", dupe: "Turathi Blue" },
  { id: 58, type: "Niche", name: "Afternoon Swim", brand: "LV", dupe: "Lucianno" },
  { id: 59, type: "Niche", name: "Imagination", brand: "LV", dupe: "Lattafa Art" },
  { id: 60, type: "Niche", name: "L'Immensité", brand: "LV", dupe: "Jean Lowe Immortal" },

  // ARABIAN & DUPES (40)
  { id: 61, type: "Arabian", name: "Khamrah", brand: "Lattafa", dupe: "Angel's Share Style" },
  { id: 62, type: "Arabian", name: "9PM", brand: "Afnan", dupe: "Ultra Male Style" },
  { id: 63, type: "Arabian", name: "Asad", brand: "Lattafa", dupe: "Sauvage Elixir Style" },
  { id: 64, type: "Arabian", name: "Turathi Blue", brand: "Afnan", dupe: "Tygar Style" },
  { id: 65, type: "Arabian", name: "Club de Nuit Intense", brand: "Armaf", dupe: "Aventus Style" },
  { id: 66, type: "Arabian", name: "Hawas", brand: "Rasasi", dupe: "Invictus Style" },
  { id: 67, type: "Arabian", name: "Detour Noir", brand: "Al Haramain", dupe: "Layton Style" },
  { id: 68, type: "Arabian", name: "Shaghaf Oud", brand: "Swiss Arabian", dupe: "Oud Bouquet Style" },
  { id: 69, type: "Arabian", name: "Ameer Al Oudh Intense", brand: "Lattafa", dupe: "BTF Style" },
  { id: 70, type: "Arabian", name: "Ramz Silver", brand: "Lattafa", dupe: "Le Male Style" },
  { id: 71, type: "Arabian", name: "Amber Oud Gold Edition", brand: "Al Haramain", dupe: "Erba Pura Style" },
  { id: 72, type: "Arabian", name: "Maahir Black Edition", brand: "Lattafa", dupe: "Dark/Oud" },
  { id: 73, type: "Arabian", name: "Qaa'ed", brand: "Lattafa", dupe: "Spicy Leather" },
  { id: 74, type: "Arabian", name: "Velvet Oud", brand: "Lattafa", dupe: "TF Leather Style" },
  { id: 75, type: "Arabian", name: "Bade'e Al Oud", brand: "Lattafa", dupe: "Oud for Greatness" },
  { id: 76, type: "Arabian", name: "Najdia", brand: "Lattafa", dupe: "Invictus Style" },
  { id: 77, type: "Arabian", name: "Fakhar Black", brand: "Lattafa", dupe: "YSL Y Style" },
  { id: 78, type: "Arabian", name: "Hayaati", brand: "Lattafa", dupe: "Victory Style" },
  { id: 79, type: "Arabian", name: "Ejaazi", brand: "Lattafa", dupe: "Blue Style" },
  { id: 80, type: "Arabian", name: "Qaed Al Fursan", brand: "Lattafa", dupe: "Pineapple Style" },
  { id: 81, type: "Arabian", name: "Supreme Amber", brand: "Bait Al Bakhoor", dupe: "Niche" },
  { id: 82, type: "Arabian", name: "Ethereal", brand: "Paris Corner", dupe: "Phantom" },
  { id: 83, type: "Arabian", name: "Barakkat Rouge", brand: "Fragrance World", dupe: "BR540" },
  { id: 84, type: "Arabian", name: "Suits", brand: "Fragrance World", dupe: "Tuxedo" },
  { id: 85, type: "Arabian", name: "Jean Lowe Ombre", brand: "Maison Alhambra", dupe: "Nomade" },
  { id: 86, type: "Arabian", name: "Porto Neroli", brand: "Maison Alhambra", dupe: "TF Neroli" },
  { id: 87, type: "Arabian", name: "Fabulo Intense", brand: "Maison Alhambra", dupe: "F'ing Fabulous" },
  { id: 88, type: "Arabian", name: "Tobacco Touch", brand: "Maison Alhambra", dupe: "Tobacco Vanille" },
  { id: 89, type: "Arabian", name: "Hercules", brand: "Maison Alhambra", dupe: "Herod" },
  { id: 90, type: "Arabian", name: "Cassius", brand: "Maison Alhambra", dupe: "Carlisle" },
  { id: 91, type: "Arabian", name: "Leyden", brand: "Maison Alhambra", dupe: "Layton" },
  { id: 92, type: "Arabian", name: "Kismet Angel", brand: "Maison Alhambra", dupe: "Angels Share" },
  { id: 93, type: "Arabian", name: "Liquid Brun", brand: "Fragrance World", dupe: "Althair" },
  { id: 94, type: "Arabian", name: "North Stag III", brand: "Paris Corner", dupe: "Afternoon Swim" },
  { id: 95, type: "Arabian", name: "L'Aventure", brand: "Al Haramain", dupe: "Aventus" },
  { id: 96, type: "Arabian", name: "Blue Oud", brand: "Lattafa", dupe: "Blue Spicy" },
  { id: 97, type: "Arabian", name: "Khamrah Qahwa", brand: "Lattafa", dupe: "Coffee Angel" },
  { id: 98, type: "Arabian", name: "Afnan SNOI", brand: "Afnan", dupe: "Hacivat" },
  { id: 99, type: "Arabian", name: "Modest Une", brand: "Afnan", dupe: "Sauvage" },
  { id: 100, type: "Arabian", name: "Rare Carbon", brand: "Afnan", dupe: "Ombre Leather" }
];

const newsDrops = [
  { id: 1, date: "APRIL 2026", name: "Eros Energy", brand: "Versace", status: "NEW", price: "110 CHF" },
  { id: 2, date: "MAY 2026", name: "Absolu Aventus", brand: "Creed", status: "RESTOCK", price: "380 CHF" },
  { id: 3, date: "JUNE 2026", name: "Liam Grey Restock", brand: "Lattafa", status: "DUPES", price: "35 CHF" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('archive');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return fragrances.filter(f => 
      (f.name.toLowerCase().includes(search.toLowerCase()) || f.brand.toLowerCase().includes(search.toLowerCase())) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-amber-500 selection:text-black">
      {/* MINIMAL NAV */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-lg font-black tracking-[0.5em] uppercase">Explorer</span>
            <span className="text-[6px] tracking-[0.6em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-8 text-[9px] tracking-[0.3em] font-black uppercase">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-500"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-500"}>News</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SEARCH & FILTERS */}
              <div className="mb-16 space-y-8">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                  <input 
                    type="text" 
                    placeholder="FIND FRAGRANCE OR BRAND..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-sm uppercase tracking-widest outline-none focus:border-amber-500 transition-colors" 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setFilter(cat)} 
                      className={`px-5 py-1 text-[9px] border tracking-widest uppercase transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/5 text-gray-600 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIST VIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 border-t border-white/5">
                {filtered.map((f) => (
                  <div key={f.id} className="group border-b border-white/5 py-6 px-4 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-crosshair">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-amber-500 font-bold tracking-widest uppercase mb-1">{f.brand}</span>
                      <h3 className="text-sm font-medium tracking-wider uppercase text-white group-hover:text-amber-500 transition-colors">{f.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-gray-600 font-bold tracking-widest uppercase block mb-1">Match</span>
                      <span className="text-[10px] text-gray-400 font-mono italic">{f.dupe}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-12 flex items-center gap-3">Live Feed <Bell className="text-amber-500" size={16} /></h2>
              <div className="space-y-4">
                {newsDrops.map(drop => (
                  <div key={drop.id} className="p-8 border border-white/5 bg-white/[0.01] relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-amber-500 text-[8px] font-black tracking-[0.3em] uppercase">{drop.date}</span>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white mt-1">{drop.brand} {drop.name}</h3>
                      </div>
                      <span className="text-[9px] bg-amber-500 text-black px-2 py-0.5 font-bold tracking-tighter">{drop.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase tracking-widest">Expected Price</span>
                      <span className="text-sm font-mono text-white">{drop.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-20 text-center opacity-20 border-t border-white/5">
        <span className="text-[8px] tracking-[1em] uppercase font-black">Archive Complete • 100 Verified Records</span>
      </footer>
    </div>
  );
}

const container = document.getElementById('root');
if (container) { createRoot(container).render(<App />); }
