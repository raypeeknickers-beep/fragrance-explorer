import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Wind, Clock, Calendar, Sparkles } from 'lucide-react';
import { fragrances } from './fragrances.js';

const FragranceExplorer = () => {
    const [activeTab, setActiveTab] = useState('discover');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFragrance, setSelectedFragrance] = useState(null);
    const [selectedCreator, setSelectedCreator] = useState(null);

    const filteredFragrances = useMemo(() => {
        return fragrances.filter(f =>
            f.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            f.brand.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <h1 className="text-2xl font-serif tracking-widest bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent font-bold">
                        FRAGRANCE EXPLORER
                    </h1>
                    <div className="flex gap-8 font-medium tracking-tighter">
                        <button
                            onClick={() => setActiveTab('discover')}
                            className={`hover:text-amber-400 transition-colors ${activeTab === 'discover' ? 'text-amber-400' : 'text-gray-400'}`}
                        >
                            DISCOVER
                        </button>
                        <button
                            onClick={() => setActiveTab('creators')}
                            className={`hover:text-amber-400 transition-colors ${activeTab === 'creators' ? 'text-amber-400' : 'text-gray-400'}`}
                        >
                            CREATORS
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {activeTab === 'discover' ? (
                    <>
                        {/* Search System */}
                        <div className="relative max-w-2xl mx-auto mb-16">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by brand or letter (e.g. 'D' for Dior)..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-14 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-lg"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Fragrance Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredFragrances.map((frag) => (
                                    <motion.div
                                        key={frag.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        whileHover={{ y: -10 }}
                                        onClick={() => setSelectedFragrance(frag)}
                                        className="group relative cursor-pointer bg-gradient-to-b from-white/10 to-transparent p-6 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-colors glassmorphism"
                                    >
                                        <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={frag.image}
                                                alt={frag.name}
                                                className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-center group-hover:text-amber-400 transition-colors">
                                            {frag.name}
                                        </h3>
                                        <p className="text-gray-500 text-center text-sm tracking-widest mt-1 uppercase">
                                            {frag.brand}
                                        </p>
                                        <div className="absolute inset-0 rounded-2xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                ) : (
                    /* Creators Tab */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {creators.map((creator) => (
                            <div
                                key={creator.name}
                                className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
                                onMouseEnter={() => setSelectedCreator(creator)}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${creator.bgImage})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <motion.h2 className="text-4xl font-bold mb-4">{creator.name}</motion.h2>
                                    <p className="text-gray-300 leading-relaxed">{creator.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Fragrance Detail Modal */}
            <AnimatePresence>
                {selectedFragrance && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-[#111] max-w-5xl w-full rounded-3xl overflow-hidden relative border border-white/10"
                        >
                            <button
                                onClick={() => setSelectedFragrance(null)}
                                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <X />
                            </button>

                            <div className="grid md:grid-cols-2 h-full">
                                <div className="bg-white p-12 flex items-center justify-center">
                                    <motion.img
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        src={selectedFragrance.image}
                                        className="max-h-[500px] object-contain drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-12 overflow-y-auto">
                                    <h2 className="text-5xl font-serif mb-2">{selectedFragrance.name}</h2>
                                    <p className="text-amber-500 tracking-[0.3em] font-bold mb-8">{selectedFragrance.brand.toUpperCase()}</p>

                                    <div className="space-y-8">
                                        <section>
                                            <h4 className="flex items-center gap-2 text-gray-400 text-sm mb-4 tracking-widest uppercase">
                                                <Sparkles size={16}/> Fragrance Notes
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-amber-200 text-xs uppercase mb-1">Top Notes</p>
                                                    <p className="text-lg">{selectedFragrance.topNotes.join(', ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-amber-200 text-xs uppercase mb-1">Heart Notes</p>
                                                    <p className="text-lg">{selectedFragrance.middleNotes.join(', ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-amber-200 text-xs uppercase mb-1">Base Notes</p>
                                                    <p className="text-lg">{selectedFragrance.baseNotes.join(', ')}</p>
                                                </div>
                                            </div>
                                        </section>

                                        <div className="grid grid-cols-3 gap-4 py-8 border-t border-white/10">
                                            <div className="text-center">
                                                <Clock className="mx-auto mb-2 text-amber-500" />
                                                <p className="text-xs text-gray-500 uppercase">Longevity</p>
                                                <p className="font-semibold">{selectedFragrance.longevity}</p>
                                            </div>
                                            <div className="text-center">
                                                <Calendar className="mx-auto mb-2 text-amber-500" />
                                                <p className="text-xs text-gray-500 uppercase">Best Season</p>
                                                <p className="font-semibold">{selectedFragrance.season}</p>
                                            </div>
                                            <div className="text-center">
                                                <Wind className="mx-auto mb-2 text-amber-500" />
                                                <p className="text-xs text-gray-500 uppercase">Occasion</p>
                                                <p className="font-semibold">{selectedFragrance.occasion}</p>
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
};

export default FragranceExplorer;
