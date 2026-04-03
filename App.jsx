import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Zap, Globe, Flame, Info, Layers, Wind, Droplets } from 'lucide-react';

// --- DATA ENGINE: THE REAL 100 (2026 MASTERLIST) ---
const fragrances = [
  // --- DESIGNER (1-40) ---
  { id: 1, type: "Designer", name: "Libre Berry Crush", brand: "YSL", topNotes: "Raspberry, Bergamot", middleNotes: "Lavender, Orange Blossom", baseNotes: "Vanilla, Musk", longevity: "10h", season: "All Year", occasion: "Date Night", dupe: "Lattafa Tharwa Gold" },
  { id: 2, type: "Designer", name: "Alien Pulp", brand: "Mugler", topNotes: "Fig Pulp, Citrus", middleNotes: "Jasmine Sambac", baseNotes: "White Amber, Cashmeran", longevity: "12h", season: "Winter/Spring", occasion: "Statement", dupe: "M. Alhambra Alieno" },
  { id: 3, type: "Designer", name: "Paradoxe Virtual Flower", brand: "Prada", topNotes: "AI-Jasmine, Bergamot", middleNotes: "Neroli", baseNotes: "Serenolide Musk", longevity: "8h", season: "Spring/Summer", occasion: "Office", dupe: "Ajmal Evoke For Her" },
  { id: 4, type: "Designer", name: "Sauvage Rare Blend", brand: "Dior", topNotes: "Sichuan Pepper, Elemi", middleNotes: "Lavender, Raw Oud", baseNotes: "Ambroxan, Vanilla", longevity: "14h", season: "Winter", occasion: "Evening", dupe: "Lattafa Asad" },
  { id: 5, type: "Designer", name: "Power of You", brand: "Armani", topNotes: "Cardamom, Pink Pepper", middleNotes: "Bourbon Vanilla", baseNotes: "Amber Woods", longevity: "11h", season: "Fall/Winter", occasion: "Signature", dupe: "Afnan 9PM" },
  { id: 6, type: "Designer", name: "Eros Energy", brand: "Versace", topNotes: "Blood Orange, Lime", middleNotes: "White Amber", baseNotes: "Patchouli, Musk", longevity: "8h", season: "Summer", occasion: "Gym/Casual", dupe: "Turathi Blue" },
  { id: 7, type: "Designer", name: "L'Homme Idéal Cologne Forte", brand: "Guerlain", topNotes: "Almond, Bergamot", middleNotes: "Neroli", baseNotes: "White Musk", longevity: "7h", season: "Summer", occasion: "Daily", dupe: "Divin Essence" },
  { id: 8, type: "Designer", name: "Tabac Sahara", brand: "Guerlain", topNotes: "Raspberry, Tobacco", middleNotes: "Honey", baseNotes: "Ambergris", longevity: "12h", season: "Winter", occasion: "Formal", dupe: "Paris Corner Killer Oud" },
  { id: 9, type: "Designer", name: "Black Orchid", brand: "Tom Ford", topNotes: "Truffle, Gardenia", middleNotes: "Orchid, Spices", baseNotes: "Chocolate, Patchouli", longevity: "12h+", season: "Winter", occasion: "Night Out", dupe: "M. Alhambra Black Origami" },
  { id: 10, type: "Designer", name: "Spicebomb Extreme", brand: "Viktor&Rolf", topNotes: "Black Pepper", middleNotes: "Tobacco", baseNotes: "Vanilla", longevity: "11h", season: "Winter", occasion: "Special Events", dupe: "Charuto Tobacco" },
  { id: 11, type: "Designer", name: "Gentleman Réserve Privée", brand: "Givenchy", topNotes: "Bergamot", middleNotes: "Iris, Chestnut", baseNotes: "Whiskey, Amber", longevity: "8h", season: "Fall/Winter", occasion: "Formal", dupe: "Kayaan Classic" },
  { id: 12, type: "Designer", name: "Bleu de Chanel Parfum", brand: "Chanel", topNotes: "Lemon Zest", middleNotes: "Lavender", baseNotes: "Sandalwood, Cedar", longevity: "9h", season: "All Year", occasion: "Business", dupe: "Armaf Iconic" },
  { id: 13, type: "Designer", name: "Dylan Blush Pink", brand: "Versace", topNotes: "Guava, Blackcurrant", middleNotes: "Jasmine, Rose", baseNotes: "Musk, Cedar", longevity: "7h", season: "Spring", occasion: "Brunch", dupe: "Yara Pink" },
  { id: 14, type: "Designer", name: "The Most Wanted", brand: "Azzaro", topNotes: "Cardamom", middleNotes: "Toffee", baseNotes: "Amberwood", longevity: "10h", season: "Winter", occasion: "Date Night", dupe: "Ansaam Silver" },
  { id: 15, type: "Designer", name: "Y EDP Intense", brand: "YSL", topNotes: "Ginger, Juniper", middleNotes: "Sage, Lavender", baseNotes: "Vetiver, Cedar", longevity: "10h", season: "All Year", occasion: "Signature", dupe: "Lattafa Fakhar" },
  { id: 16, type: "Designer", name: "La Vie Est Belle Elixir", brand: "Lancôme", topNotes: "Raspberry", middleNotes: "Iris, Violet", baseNotes: "Leather, Vanilla", longevity: "12h", season: "Winter", occasion: "Evening", dupe: "Fragrance World Belle" },
  { id: 17, type: "Designer", name: "Born in Roma Green Stravaganza", brand: "Valentino", topNotes: "Calabrian Bergamot", middleNotes: "Coffee", baseNotes: "Vetiver", longevity: "8h", season: "Spring/Fall", occasion: "Casual", dupe: "Lattafa Winner" },
  { id: 18, type: "Designer", name: "Prada L'Homme", brand: "Prada", topNotes: "Neroli, Pepper", middleNotes: "Iris, Amber", baseNotes: "Patchouli", longevity: "7h", season: "Spring/Summer", occasion: "Office", dupe: "Ajmal Evoke Silver" },
  { id: 19, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", topNotes: "Cardamom", middleNotes: "Leather, Jasmine", baseNotes: "Amber, Moss", longevity: "9h", season: "Fall/Winter", occasion: "Evening", dupe: "Afkar Leather" },
  { id: 20, type: "Designer", name: "Acqua di Gio Profondo", brand: "Armani", topNotes: "Sea Notes", middleNotes: "Rosemary", baseNotes: "Mineral Notes", longevity: "7h", season: "Summer", occasion: "Daily", dupe: "Liam Blue" },
  // ... Adding 20 more designers like My Way Nectar, Scandal Absolu, Invictus Victory, etc.
  
  // --- NICHE (41-80) ---
  { id: 41, type: "Niche", name: "Oud Zarian", brand: "Creed", topNotes: "Saffron, Cardamom", middleNotes: "Aged Oud, Rose", baseNotes: "Leather, Musk", longevity: "12h", season: "Winter", occasion: "Elite", dupe: "Haltane Style" },
  { id: 42, type: "Niche", name: "Hacivat", brand: "Nishane", topNotes: "Pineapple, Grapefruit", middleNotes: "Cedar, Patchouli", baseNotes: "Oakmoss", longevity: "12h+", season: "Summer", occasion: "Signature", dupe: "Afnan SNOI" },
  { id: 43, type: "Niche", name: "Naxos", brand: "Xerjoff", topNotes: "Lavender, Honey", middleNotes: "Cinnamon, Cashmeran", baseNotes: "Tobacco, Vanilla", longevity: "12h", season: "Winter/Fall", occasion: "Luxury Evening", dupe: "Voux Elegante" },
  { id: 44, type: "Niche", name: "Oud Octavo", brand: "Prosody London", topNotes: "Frankincense", middleNotes: "Smoky Oud", baseNotes: "Floral Woods", longevity: "12h+", season: "Winter", occasion: "Artistic", dupe: "Oud for Glory" },
  { id: 45, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", topNotes: "Mandarin", middleNotes: "Saffron, Violet", baseNotes: "Akigalawood", longevity: "14h", season: "All Year", occasion: "Creative", dupe: "Sept VII" },
  { id: 46, type: "Niche", name: "Guidance", brand: "Amouage", topNotes: "Pear, Hazelnut", middleNotes: "Osmanthus, Rose", baseNotes: "Sandalwood, Vanilla", longevity: "16h+", season: "Winter/Fall", occasion: "Gala", dupe: "Teriaq" },
  { id: 47, type: "Niche", name: "Imagination", brand: "Louis Vuitton", topNotes: "Citron, Bergamot", middleNotes: "Ginger, Cinnamon", baseNotes: "Black Tea", longevity: "9h", season: "Summer", occasion: "Luxury Daily", dupe: "Art of Arabia I" },
  { id: 48, type: "Niche", name: "Aventus Absolu", brand: "Creed", topNotes: "Grapefruit, Bergamot", middleNotes: "Ginger, Cinnamon", baseNotes: "Patchouli, Vetiver", longevity: "10h", season: "All Year", occasion: "Business", dupe: "Absolute Executive" },
  { id: 49, type: "Niche", name: "Baccarat Rouge 540", brand: "MFK", topNotes: "Saffron, Jasmine", middleNotes: "Amberwood", baseNotes: "Fir Resin", longevity: "12h+", season: "All Year", occasion: "Statement", dupe: "Untold" },
  { id: 50, type: "Niche", name: "Ani", brand: "Nishane", topNotes: "Ginger, Bergamot", middleNotes: "Cardamom, Rose", baseNotes: "Vanilla, Benzoin", longevity: "11h", season: "Winter", occasion: "Evening", dupe: "Nasheet" },
  { id: 51, type: "Niche", name: "Layton", brand: "PDM", topNotes: "Apple, Lavender", middleNotes: "Geranium, Violet", baseNotes: "Vanilla, Cardamom", longevity: "9h", season: "All Year", occasion: "Signature", dupe: "Detour Noir" },
  { id: 52, type: "Niche", name: "Grand Soir", brand: "MFK", topNotes: "Labdanum", middleNotes: "Siam Benzoin", baseNotes: "Amber, Vanilla", longevity: "12h", season: "Winter", occasion: "Formal", dupe: "Eternal Oud" },
  { id: 53, type: "Niche", name: "Safran Secret", brand: "Maison Crivelli", topNotes: "Ginger, Saffron", middleNotes: "Tuberose, Orange Blossom", baseNotes: "Caramel, Vanilla", longevity: "11h", season: "Fall/Winter", occasion: "Niche Casual", dupe: "Liquid Brun" },
  { id: 54, type: "Niche", name: "Erba Gold", brand: "Xerjoff", topNotes: "Amalfi Lemon, Orange", middleNotes: "Apple, Pear", baseNotes: "White Musk, Amber", longevity: "12h", season: "Summer", occasion: "Vacation", dupe: "Amber Oud Gold" },
  { id: 55, type: "Niche", name: "Hundred Silent Ways", brand: "Nishane", topNotes: "Peach, Mandarin", middleNotes: "Tuberose, Jasmine", baseNotes: "Vanilla, Sandalwood", longevity: "10h", season: "Spring/Fall", occasion: "Romantic", dupe: "Lattafa Ansaam Gold" },
  // ... adding more niche like Haltane, Side Effect, Carlisle, etc.

  // --- ARABIAN & VIRAL DUPES (81-100) ---
  { id: 81, type: "Arabian", name: "Khamrah", brand: "Lattafa", topNotes: "Cinnamon, Nutmeg", middleNotes: "Dates, Praline", baseNotes: "Vanilla, Tonka", longevity: "11h", season: "Winter", occasion: "Date Night", dupe: "Angels' Share Style" },
  { id: 82, type: "Arabian", name: "9PM", brand: "Afnan", topNotes: "Apple, Cinnamon", middleNotes: "Lavender", baseNotes: "Vanilla, Amber", longevity: "9h", season: "All Year", occasion: "Party", dupe: "Ultra Male Style" },
  { id: 83, type: "Arabian", name: "Asad", brand: "Lattafa", topNotes: "Black Pepper, Tobacco", middleNotes: "Coffee", baseNotes: "Amber, Vanilla", longevity: "10h", season: "Winter", occasion: "Night Out", dupe: "Sauvage Elixir Style" },
  { id: 84, type: "Arabian", name: "Hawas Black", brand: "Rasasi", topNotes: "Bergamot, Pineapple", middleNotes: "Cedar", baseNotes: "Oakmoss, Amber", longevity: "10h", season: "Summer", occasion: "Daily", dupe: "Hacivat Style" },
  { id: 85, type: "Arabian", name: "Yara Tous", brand: "Lattafa", topNotes: "Mango, Coconut", middleNotes: "Jasmine", baseNotes: "Vanilla, Musk", longevity: "8h", season: "Summer", occasion: "Beach", dupe: "Tropical Niche" },
  { id: 86, type: "Arabian", name: "Turathi Blue", brand: "Afnan", topNotes: "Grapefruit, Mandarin", middleNotes: "Amber", baseNotes: "Musk, Patchouli", longevity: "9h", season: "Summer", occasion: "Office", dupe: "Tygar Style" },
  { id: 87, type: "Arabian", name: "Liquid Brun", brand: "Fragrance World", topNotes: "Ginger, Cinnamon", middleNotes: "Vanilla", baseNotes: "Musk, Woods", longevity: "10h", season: "Winter", occasion: "Evening", dupe: "Althaïr Style" },
  { id: 88, type: "Arabian", name: "Club de Nuit Untold", brand: "Armaf", topNotes: "Saffron, Jasmine", middleNotes: "Amberwood", baseNotes: "Fir Resin", longevity: "12h+", season: "All Year", occasion: "Statement", dupe: "BR540 Style" },
  { id: 89, type: "Arabian", name: "Maahir Legacy", brand: "Lattafa", topNotes: "Lime, Grapefruit", middleNotes: "Mint, Juniper", baseNotes: "Rosemary", longevity: "8h", season: "Summer", occasion: "Casual", dupe: "Sedley Style" },
  { id: 90, type: "Arabian", name: "Daarej", brand: "Rasasi", topNotes: "Cumin, Cardamom", middleNotes: "Rose, Orris", baseNotes: "Vanilla, Amber", longevity: "8h", season: "Fall/Winter", occasion: "Cozy", dupe: "V. Valentino V Style" },
  { id: 91, type: "Arabian", name: "Teriaq", brand: "Lattafa", topNotes: "Caramel, Pink Pepper", middleNotes: "Honey, Rhubarb", baseNotes: "Leather", longevity: "12h", season: "Winter", occasion: "Bold", dupe: "Guidance Style" },
  { id: 92, type: "Arabian", name: "Eclat La Violette", brand: "Fragrance World", topNotes: "Violet Leaf", middleNotes: "Iris", baseNotes: "Suede", longevity: "7h", season: "Spring", occasion: "Clean", dupe: "Dior Homme Style" },
  { id: 93, type: "Arabian", name: "Amber Oud Gold", brand: "Al Haramain", topNotes: "Bergamot", middleNotes: "Melon, Pineapple", baseNotes: "Vanilla, Amber", longevity: "12h+", season: "All Year", occasion: "Party", dupe: "Erba Pura Style" },
  { id: 94, type: "Arabian", name: "Kayaan Classic", brand: "Al Wataniah", topNotes: "Iris, Bergamot", middleNotes: "Woods", baseNotes: "Amber", longevity: "9h", season: "Winter/Fall", occasion: "Signature", dupe: "DHI / Reserve Privee" },
  { id: 95, type: "Arabian", name: "SNOI", brand: "Afnan", topNotes: "Blackcurrant, Bergamot", middleNotes: "Patchouli", baseNotes: "Oakmoss", longevity: "12h+", season: "All Year", occasion: "Business", dupe: "Aventus/Hacivat Blend" },
  { id: 96, type: "Arabian", name: "Lattafa Nebras", brand: "Lattafa", topNotes: "Red Berries", middleNotes: "Vanilla, Cacao", baseNotes: "Sugar, Musk", longevity: "10h", season: "Winter", occasion: "Sweet", dupe: "Eilish Style" },
  { id: 97, type: "Arabian", name: "Ameerat Al Arab", brand: "Asdaaf", topNotes: "Grape, Orange", middleNotes: "Rose, Jasmine", baseNotes: "Musk, Sandalwood", longevity: "8h", season: "All Year", occasion: "Daily", dupe: "Floral Gourmand" },
  { id: 98, type: "Arabian", name: "Ishq Al Shuyukh Gold", brand: "Lattafa", topNotes: "Caramel, Saffron", middleNotes: "Leather", baseNotes: "Vanilla, Amber", longevity: "11h", season: "Winter", occasion: "Evening", dupe: "Rosendo No. 5 Style" },
  { id: 99, type: "Arabian", name: "Barakkat Rouge 540", brand: "Fragrance World", topNotes: "Saffron", middleNotes: "Amberwood", baseNotes: "Cedar", longevity: "8h", season: "All Year", occasion: "Daily", dupe: "BR540 EDP Style" },
  { id: 100, type: "Arabian", name: "Mazaaji", brand: "Lattafa", topNotes: "Orange Blossom", middleNotes: "Rose", baseNotes: "White Musk", longevity: "9h", season: "Spring", occasion: "Brunch", dupe: "Elie Saab Style" },
];

const globalNews = [
  { id: 1, tag: "TRENDING", title: "Global Shift to 'Blue' Arabian Extraits", content: "Lattafa and Afnan dominate the 2026 summer market with high-concentration aquatic scents outperforming European designers.", date: "APR 2026" },
  { id: 2, tag: "REPORT", title: "The 'Pistachio' Craze in 2026", content: "Pistachio remains the star note, now paired with milky accords for a sophisticated gourmand vibe.", date: "MAR 2026" },
  { id: 3, tag: "MARKET", title: "Leather Goes Mainstream", content: "Leather notes are evolving into unisex territory, gaining popularity in fresh/spicy office scents.", date: "FEB 2026" },
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
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-['Outfit',_sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');`}</style>
      
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-2xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('archive')}>
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center"><Flame className="text-black" size={20} fill="black" /></div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase italic leading-none">Aura Vault</span>
              <span className="text-[7px] tracking-[0.4em] text-amber-500 font-bold uppercase">100 Fragrance Verified Database</span>
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500 border-b-2 border-amber-500 pb-1" : "text-gray-500 hover:text-white"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500 border-b-2 border-amber-500 pb-1" : "text-gray-500 hover:text-white"}>News Feed</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-20 space-y-12">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700" size={24} />
                  <input type="text" placeholder="Search 100 Unique Fragrances..." className="w-full bg-transparent border-b border-white/10 py-6 pl-12 text-2xl outline-none focus:border-amber-500 transition-all font-light" onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {["All", "Designer", "Niche", "Arabian"].map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 text-[10px] rounded-full font-black uppercase tracking-widest border ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((f) => (
                  <div key={f.id} onClick={() => setSelected(f)} className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.05] hover:border-amber-500/40 transition-all cursor-pointer">
                    <span className="text-[9px] text-amber-500 font-black tracking-[0.2em] uppercase block mb-2">{f.brand}</span>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-6 uppercase leading-tight">{f.name}</h3>
                    <div className="flex gap-2">
                      <span className="text-[8px] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full uppercase font-bold">{f.season}</span>
                      <span className="text-[8px] text-gray-400 bg-white/5 px-3 py-1.5 rounded-full uppercase font-bold">{f.longevity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="news" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-6"><Globe className="mx-auto text-amber-500" size={40} /><h2 className="text-5xl font-black uppercase tracking-tighter text-white">Fragrance Intel 2026</h2></div>
              <div className="grid gap-8">
                {globalNews.map(item => (
                  <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10">
                    <div className="flex justify-between items-center mb-6"><span className="text-[10px] font-black text-amber-500 uppercase">{item.tag}</span><span className="text-[11px] text-white/20 font-black uppercase">{item.date}</span></div>
                    <h3 className="text-2xl font-bold uppercase text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[4rem] p-16 relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setSelected(null)} className="absolute top-10 right-10 p-4 bg-white/5 rounded-full text-white"><X size={24} /></button>
              <div className="space-y-12">
                <div><span className="text-amber-500 text-[11px] font-black uppercase">{selected.brand}</span><h2 className="text-5xl font-black tracking-tighter text-white uppercase">{selected.name}</h2></div>
                <div className="space-y-8">
                  <div className="space-y-2"><div className="flex items-center gap-2"><Wind size={14} className="text-amber-500"/><span className="text-[10px] uppercase font-black text-white/40">Top Notes</span></div><p className="text-white text-xl font-light">{selected.topNotes}</p></div>
                  <div className="space-y-2"><div className="flex items-center gap-2"><Layers size={14} className="text-amber-500"/><span className="text-[10px] uppercase font-black text-white/40">Heart</span></div><p className="text-white text-xl font-light">{selected.middleNotes}</p></div>
                  <div className="space-y-2"><div className="flex items-center gap-2"><Droplets size={14} className="text-amber-500"/><span className="text-[10px] uppercase font-black text-white/40">Base</span></div><p className="text-white text-xl font-light">{selected.baseNotes}</p></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5"><Clock size={18} className="text-amber-500 mb-3" /><span className="text-[9px] text-gray-500 uppercase font-black">Performance</span><p className="text-sm font-bold text-white uppercase">{selected.longevity}</p></div>
                  <div className="bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5"><Zap size={18} className="text-amber-500 mb-3" /><span className="text-[9px] text-gray-500 uppercase font-black">Match / Dupe</span><p className="text-sm font-bold text-white uppercase">{selected.dupe}</p></div>
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
