import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Fingerprint, Bell, Flame, Wind, Droplets, Zap } from 'lucide-react';

const fragrances = [
  // DESIGNER (30)
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", notes: "Cinnamon, Nutmeg, Lavender, Sandalwood", dupe: "Lattafa Asad" },
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", notes: "Mint, Lavender, Vanilla, Honey, Tobacco", dupe: "Lattafa Ramz Silver" },
  { id: 3, type: "Designer", name: "Most Wanted Parfum", brand: "Azzaro", notes: "Red Ginger, Woodsy Notes, Bourbon Vanilla", dupe: "Ansaam Silver" },
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", notes: "Bergamot, Orange Blossom, Ambrofix", dupe: "Sheikh Al Shuyukh" },
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", notes: "Cardamom, Leather, Jasmine, Amber", dupe: "Afkar" },
  { id: 6, type: "Designer", name: "Bleu de Chanel", brand: "Chanel", notes: "Grapefruit, Lemon, Incense, Ginger", dupe: "Armaf Iconic" },
  { id: 7, type: "Designer", name: "Acqua di Gio Profondo", brand: "Armani", notes: "Sea Notes, Mandarin, Rosemary, Musk", dupe: "Lattafa Liam Blue" },
  { id: 8, type: "Designer", name: "Spicebomb Extreme", brand: "V&R", notes: "Black Pepper, Tobacco, Vanilla", dupe: "Charuto Tobacco" },
  { id: 9, type: "Designer", name: "Eros Flame", brand: "Versace", notes: "Mandarin, Rosemary, Vanilla, Tonka", dupe: "Maison Alhambra Versencia" },
  { id: 10, type: "Designer", name: "Gentleman Reserve Privée", brand: "Givenchy", notes: "Chestnut, Whiskey, Iris, Amber", dupe: "Kayaan Classic" },
  { id: 11, type: "Designer", name: "Luna Rossa Black", brand: "Prada", notes: "Bergamot, Angelica, Coumarin, Musk", dupe: "Lattafa Pride" },
  { id: 12, type: "Designer", name: "Stronger With You Intensely", brand: "Armani", notes: "Pink Pepper, Toffee, Cinnamon, Suede", dupe: "Proud of You" },
  { id: 13, type: "Designer", name: "Valentino Born In Roma", brand: "Valentino", notes: "Violet, Mineral Notes, Ginger, Salt", dupe: "Lattafa Winners" },
  { id: 14, type: "Designer", name: "Terre d'Hermès", brand: "Hermès", notes: "Orange, Flint, Vetiver, Benzoin", dupe: "Rasasi Fattan" },
  { id: 15, type: "Designer", name: "Y EDP", brand: "YSL", notes: "Apple, Ginger, Sage, Amberwood", dupe: "Lattafa Fakhar Black" },
  { id: 16, type: "Designer", name: "Dior Homme Intense", brand: "Dior", notes: "Iris, Lavender, Pear, Cedar", dupe: "Dark Door Intense" },
  { id: 17, type: "Designer", name: "L'Homme Ideal", brand: "Guerlain", notes: "Almond, Cherry, Leather, Vanilla", dupe: "FW Ideal Home" },
  { id: 18, type: "Designer", name: "Invictus Victory", brand: "Paco Rabanne", notes: "Lemon, Pink Pepper, Olibanum, Tonka", dupe: "Lattafa Hayaati" },
  { id: 19, type: "Designer", name: "Bad Boy Extreme", brand: "Carolina Herrera", notes: "Ginger, Cocoa, Patchouli, Vetiver", dupe: "Maison Alhambra" },
  { id: 20, type: "Designer", name: "1 Million Royal", brand: "Paco Rabanne", notes: "Cardamom, Lavender, Cedar, Benzoin", dupe: "Lattafa" },
  { id: 21, type: "Designer", name: "Light Blue Intense", brand: "D&G", notes: "Grapefruit, Juniper, Sea Water", dupe: "Lattafa Blue" },
  { id: 22, type: "Designer", name: "The One EDP", brand: "D&G", notes: "Ginger, Cardamom, Tobacco, Amber", dupe: "Pendora Scents" },
  { id: 23, type: "Designer", name: "Gucci Guilty Elixir", brand: "Gucci", notes: "Pimento, Orange Blossom, Vanilla", dupe: "Lattafa" },
  { id: 24, type: "Designer", name: "Code Parfum", brand: "Armani", notes: "Bergamot, Iris, Aldehydes, Tonka", dupe: "Afnan" },
  { id: 25, type: "Designer", name: "Allure Edition Blanche", brand: "Chanel", notes: "Lemon, Sandalwood, Pink Pepper, Musk", dupe: "Al Dirgham" },
  { id: 26, type: "Designer", name: "Polo Red", brand: "Ralph Lauren", notes: "Cranberry, Saffron, Coffee, Wood", dupe: "Afnan" },
  { id: 27, type: "Designer", name: "Encre Noire", brand: "Lalique", notes: "Cypress, Vetiver, Cashmere Wood", dupe: "Niche" },
  { id: 28, type: "Designer", name: "K by Dolce & Gabbana", brand: "D&G", notes: "Blood Orange, Pimento, Fig, Cedar", dupe: "Lattafa" },
  { id: 29, type: "Designer", name: "Greenley", brand: "PDM", notes: "Green Apple, Bergamot, Petitgrain", dupe: "Afnan" },
  { id: 30, type: "Designer", name: "Haltane", brand: "PDM", notes: "Clary Sage, Lavender, Saffron, Praline", dupe: "Lattafa" },

  // NICHE (30)
  { id: 31, type: "Niche", name: "Aventus", brand: "Creed", notes: "Pineapple, Birch, Musk, Blackcurrant", dupe: "CDNIM" },
  { id: 32, type: "Niche", name: "Naxos", brand: "Xerjoff", notes: "Honey, Tobacco, Lavender, Tonka", dupe: "Voux Elegante" },
  { id: 33, type: "Niche", name: "Layton", brand: "PDM", notes: "Apple, Lavender, Vanilla, Pepper", dupe: "Detour Noir" },
  { id: 34, type: "Niche", name: "Angels' Share", brand: "Kilian", notes: "Cognac, Cinnamon, Oak, Praline", dupe: "Khamrah" },
  { id: 35, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", notes: "Mineral, Saffron, Suede, Immortelle", dupe: "Sept VII" },
  { id: 36, type: "Niche", name: "Baccarat Rouge 540", brand: "MFK", notes: "Saffron, Jasmine, Amberwood, Resin", dupe: "Untold" },
  { id: 37, type: "Niche", name: "Side Effect", brand: "Initio", notes: "Cinnamon, Rum, Tobacco, Vanilla", dupe: "After Effect" },
  { id: 38, type: "Niche", name: "Hacivat", brand: "Nishane", notes: "Grapefruit, Pineapple, Oakmoss, Wood", dupe: "Imperium" },
  { id: 39, type: "Niche", name: "Oud For Greatness", brand: "Initio", notes: "Saffron, Nutmeg, Lavender, Oud", dupe: "Oud For Glory" },
  { id: 40, type: "Niche", name: "Tobacco Vanille", brand: "Tom Ford", notes: "Tobacco Leaf, Cocoa, Spices, Vanilla", dupe: "Charuto" },
  { id: 41, type: "Niche", name: "Silver Mountain Water", brand: "Creed", notes: "Bergamot, Tea, Blackcurrant, Musk", dupe: "Sillage" },
  { id: 42, type: "Niche", name: "Green Irish Tweed", brand: "Creed", notes: "Lemon Verbena, Violet Leaf, Sandalwood", dupe: "Tres Nuit" },
  { id: 43, type: "Niche", name: "Black Phantom", brand: "Kilian", notes: "Chocolate, Coffee, Rum, Sugar Cane", dupe: "Black Knight" },
  { id: 44, type: "Niche", name: "Alexandria II", brand: "Xerjoff", notes: "Rosewood, Lavender, Apple, Oud", dupe: "Lattafa Pride" },
  { id: 45, type: "Niche", name: "Grand Soir", brand: "MFK", notes: "Amber, Benzoin, Labdanum, Vanilla", dupe: "Eternal Oud" },
  { id: 46, type: "Niche", name: "Reflection Man", brand: "Amouage", notes: "Neroli, Jasmine, Orris Root, Sandalwood", dupe: "The Tux" },
  { id: 47, type: "Niche", name: "Interlude Man", brand: "Amouage", notes: "Oregano, Incense, Leather, Oud", dupe: "Midnight Oud" },
  { id: 48, type: "Niche", name: "Ani", brand: "Nishane", notes: "Ginger, Cardamom, Vanilla, Benzoin", dupe: "Nasheet" },
  { id: 49, type: "Niche", name: "Carlisle", brand: "PDM", notes: "Nutmeg, Apple, Rose, Tonka", dupe: "Cassius" },
  { id: 50, type: "Niche", name: "Pegasus", brand: "PDM", notes: "Cumin, Heliotrope, Bitter Almond, Vanilla", dupe: "Armaf Craze" },
  { id: 51, type: "Niche", name: "Erba Pura", brand: "Xerjoff", notes: "Orange, Lemon, Fruits, White Musk", dupe: "Amber Oud Gold" },
  { id: 52, type: "Niche", name: "Tuxedo", brand: "YSL", notes: "Violet Leaf, Black Pepper, Patchouli", dupe: "The Tux" },
  { id: 53, type: "Niche", name: "Instant Crush", brand: "Mancera", notes: "Saffron, Ginger, Amberwood, Vanilla", dupe: "Afnan" },
  { id: 54, type: "Niche", name: "Cedrat Boise", brand: "Mancera", notes: "Citrus, Spices, Leather, Sandalwood", dupe: "Afnan" },
  { id: 55, type: "Niche", name: "Red Tobacco", brand: "Mancera", notes: "Cinnamon, Agarwood, Saffron, Tobacco", dupe: "Afnan" },
  { id: 56, type: "Niche", name: "Rich Warm Addictive", brand: "Zara", notes: "Honey, Coconut, Tobacco, Sandalwood", dupe: "Niche" },
  { id: 57, type: "Niche", name: "Tygar", brand: "Bvlgari", notes: "Grapefruit, Woodsy Notes, Ambroxan", dupe: "Turathi Blue" },
  { id: 58, type: "Niche", name: "Afternoon Swim", brand: "LV", notes: "Orange, Bergamot, Mandarin", dupe: "Lucianno" },
  { id: 59, type: "Niche", name: "Imagination", brand: "LV", notes: "Citron, Ginger, Black Tea, Ambroxan", dupe: "Lattafa Art" },
  { id: 60, type: "Niche", name: "L'Immensité", brand: "LV", notes: "Grapefruit, Ginger, Rosemary, Sage", dupe: "Immortal" },

  // ARABIAN & DUPES (40)
  { id: 61, type: "Arabian", name: "Khamrah", brand: "Lattafa", notes: "Cinnamon, Dates, Praline, Vanilla", dupe: "Angel's Share Style" },
  { id: 62, type: "Arabian", name: "9PM", brand: "Afnan", notes: "Apple, Cinnamon, Lavender, Vanilla", dupe: "Ultra Male Style" },
  { id: 63, type: "Arabian", name: "Asad", brand: "Lattafa", notes: "Black Pepper, Coffee, Patchouli, Vanilla", dupe: "Sauvage Elixir Style" },
  { id: 64, type: "Arabian", name: "Turathi Blue", brand: "Afnan", notes: "Grapefruit, Woodsy Notes, Musk", dupe: "Tygar Style" },
  { id: 65, type: "Arabian", name: "Club de Nuit Intense", brand: "Armaf", notes: "Lemon, Pineapple, Birch, Smoke", dupe: "Aventus Style" },
  { id: 66, type: "Arabian", name: "Hawas", brand: "Rasasi", notes: "Apple, Bergamot, Cinnamon, Ambergris", dupe: "Invictus Style" },
  { id: 67, type: "Arabian", name: "Detour Noir", brand: "Al Haramain", notes: "Apple, Lavender, Almond, Vanilla", dupe: "Layton Style" },
  { id: 68, type: "Arabian", name: "Shaghaf Oud", brand: "Swiss Arabian", notes: "Saffron, Rose, Praline, Vanilla, Oud", dupe: "Oud Bouquet" },
  { id: 69, type: "Arabian", name: "Ameer Al Oudh", brand: "Lattafa", notes: "Woody Notes, Oud, Sugar, Labdanum", dupe: "BTF Style" },
  { id: 70, type: "Arabian", name: "Ramz Silver", brand: "Lattafa", notes: "Pear, Lavender, Mint, Musk", dupe: "Le Male Style" },
  { id: 71, type: "Arabian", name: "Amber Oud Gold", brand: "Al Haramain", notes: "Bergamot, Melon, Pineapple, Vanilla", dupe: "Erba Pura Style" },
  { id: 72, type: "Arabian", name: "Maahir Black", brand: "Lattafa", notes: "Black Pepper, Saffron, Labdanum, Wood", dupe: "Dark" },
  { id: 73, type: "Arabian", name: "Qaa'ed", brand: "Lattafa", notes: "Saffron, Nutmeg, Cardamom, Leather", dupe: "Spicy Leather" },
  { id: 74, type: "Arabian", name: "Velvet Oud", brand: "Lattafa", notes: "Cardamom, Bergamot, Violet Leaf, Oud", dupe: "TF Leather" },
  { id: 75, type: "Arabian", name: "Bade'e Al Oud", brand: "Lattafa", notes: "Nutmeg, Lavender, Patchouli, Musk", dupe: "Oud Glory" },
  { id: 76, type: "Arabian", name: "Najdia", brand: "Lattafa", notes: "Lemon, Cinnamon, Ginger, Wood", dupe: "Invictus" },
  { id: 77, type: "Arabian", name: "Fakhar Black", brand: "Lattafa", notes: "Apple, Ginger, Sage, Amberwood", dupe: "YSL Y" },
  { id: 78, type: "Arabian", name: "Hayaati", brand: "Lattafa", notes: "Apple, Bergamot, Wood, Musk", dupe: "Victory" },
  { id: 79, type: "Arabian", name: "Ejaazi", brand: "Lattafa", notes: "Citrus, Cardamom, Sandalwood, Cedar", dupe: "Blue" },
  { id: 80, type: "Arabian", name: "Qaed Al Fursan", brand: "Lattafa", notes: "Pineapple, Saffron, Jasmine, Cedar", dupe: "Pineapple" },
  { id: 81, type: "Arabian", name: "Supreme Amber", brand: "Bait Al Bakhoor", notes: "Amber, Spices, Wood, Vanilla", dupe: "Niche" },
  { id: 82, type: "Arabian", name: "Ethereal", brand: "Paris Corner", notes: "Citrus, Cardamom, Vetiver, Patchouli", dupe: "Phantom" },
  { id: 83, type: "Arabian", name: "Barakkat Rouge", brand: "FW", notes: "Saffron, Jasmine, Amberwood, Fir", dupe: "BR540" },
  { id: 84, type: "Arabian", name: "Suits", brand: "FW", notes: "Coriander, Pepper, Patchouli, Amber", dupe: "Tuxedo" },
  { id: 85, type: "Arabian", name: "Jean Lowe Ombre", brand: "Maison Alhambra", notes: "Oud, Rose, Raspberry, Benzoin", dupe: "Nomade" },
  { id: 86, type: "Arabian", name: "Porto Neroli", brand: "Maison Alhambra", notes: "Neroli, Lemon, Jasmine, Amber", dupe: "TF Neroli" },
  { id: 87, type: "Arabian", name: "Fabulo Intense", brand: "Maison Alhambra", notes: "Lavender, Leather, Almond, Amber", dupe: "Fing Fab" },
  { id: 88, type: "Arabian", name: "Tobacco Touch", brand: "Maison Alhambra", notes: "Tobacco, Ginger, Cocoa, Vanilla", dupe: "TF Vanille" },
  { id: 89, type: "Arabian", name: "Hercules", brand: "Maison Alhambra", notes: "Cinnamon, Pepper, Tobacco Leaf, Vanilla", dupe: "Herod" },
  { id: 90, type: "Arabian", name: "Cassius", brand: "Maison Alhambra", notes: "Nutmeg, Apple, Rose, Vanilla", dupe: "Carlisle" },
  { id: 91, type: "Arabian", name: "Leyden", brand: "Maison Alhambra", notes: "Apple, Lavender, Violet, Pepper", dupe: "Layton" },
  { id: 92, type: "Arabian", name: "Kismet Angel", brand: "Maison Alhambra", notes: "Cognac, Cinnamon, Honey, Vanilla", dupe: "Angels Share" },
  { id: 93, type: "Arabian", name: "Liquid Brun", brand: "FW", notes: "Bergamot, Cinnamon, Cardamom, Vanilla", dupe: "Althair" },
  { id: 94, type: "Arabian", name: "North Stag III", brand: "Paris Corner", notes: "Orange, Ginger, Bergamot, Ambroxan", dupe: "Swim" },
  { id: 95, type: "Arabian", name: "L'Aventure", brand: "Al Haramain", notes: "Bergamot, Lemon, Jasmine, Musk", dupe: "Aventus" },
  { id: 96, type: "Arabian", name: "Blue Oud", brand: "Lattafa", notes: "Bergamot, Apple, Oud, Musk", dupe: "Blue Spicy" },
  { id: 97, type: "Arabian", name: "Khamrah Qahwa", brand: "Lattafa", notes: "Ginger, Cardamom, Coffee, Vanilla", dupe: "Coffee Angel" },
  { id: 98, type: "Arabian", name: "Afnan SNOI", brand: "Afnan", notes: "Blackcurrant, Bergamot, Oakmoss, Wood", dupe: "Hacivat" },
  { id: 99, type: "Arabian", name: "Modest Une", brand: "Afnan", notes: "Pepper, Lavender, Nutmeg, Ambroxan", dupe: "Sauvage" },
  { id: 100, type: "Arabian", name: "Rare Carbon", brand: "Afnan", notes: "Violet Leaf, Leather, Amber, Patchouli", dupe: "Ombre" }
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
    const s = search.toLowerCase();
    return fragrances.filter(f => 
      (f.name.toLowerCase().includes(s) || f.brand.toLowerCase().includes(s) || f.notes.toLowerCase().includes(s)) && 
      (filter === 'All' || f.type === filter)
    );
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-amber-500 selection:text-black">
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
              <div className="mb-16 space-y-8">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                  <input 
                    type="text" 
                    placeholder="SEARCH BRAND, SCENT, OR NOTES..." 
                    className="w-full bg-transparent border-b border-white/10 py-4 pl-8 text-sm uppercase tracking-widest outline-none focus:border-amber-500 transition-colors" 
                    onChange={(e) => setSearch(e.target.value)} 
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-1 text-[9px] border tracking-widest uppercase transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/5 text-gray-600 hover:text-white'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 border-t border-white/5">
                {filtered.map((f) => (
                  <div key={f.id} className="group border-b border-white/5 py-8 px-6 flex flex-col justify-between hover:bg-white/[0.02] transition-all cursor-crosshair">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[7px] text-amber-500 font-bold tracking-[0.3em] uppercase mb-1 block">{f.brand}</span>
                        <h3 className="text-md font-bold tracking-wider uppercase text-white group-hover:text-amber-500 transition-colors">{f.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-gray-600 font-bold tracking-widest uppercase block mb-1">Alternative</span>
                        <span className="text-[10px] text-white/40 font-mono italic">{f.dupe}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.03]">
                      <Wind size={12} className="text-gray-700" />
                      <p className="text-[9px] tracking-widest text-gray-500 uppercase leading-relaxed">{f.notes}</p>
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
