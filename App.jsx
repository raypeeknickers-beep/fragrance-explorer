import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Clock, MapPin, Zap, Layers } from 'lucide-react';

const fragrances = [
  // DESIGNER (1-35)
  { id: 1, type: "Designer", name: "Sauvage Elixir", brand: "Dior", topNotes: "Cinnamon, Nutmeg, Cardamom, Grapefruit", middleNotes: "Lavender", baseNotes: "Licorice, Sandalwood, Amber, Patchouli, Vetiver", longevity: "12h+", season: "Winter/Fall", occasion: "Special Events", dupe: "Lattafa Asad" },
  { id: 2, type: "Designer", name: "Le Male Elixir", brand: "JPG", topNotes: "Lavender, Mint", middleNotes: "Vanilla, Benzoin", baseNotes: "Honey, Tonka Bean, Tobacco", longevity: "10h", season: "Winter/Fall", occasion: "Night Out", dupe: "Ramz Silver" },
  { id: 3, type: "Designer", name: "The Most Wanted", brand: "Azzaro", topNotes: "Cardamom", middleNotes: "Toffee", baseNotes: "Amberwood", longevity: "9h", season: "Winter/Fall", occasion: "Date Night", dupe: "Ansaam Silver" },
  { id: 4, type: "Designer", name: "MYSLF", brand: "YSL", topNotes: "Calabrian Bergamot", middleNotes: "Orange Blossom", baseNotes: "Ambrofix, Patchouli", longevity: "7h", season: "Spring/Summer", occasion: "Signature", dupe: "Sheikh Al Shuyukh" },
  { id: 5, type: "Designer", name: "Ombré Leather", brand: "Tom Ford", topNotes: "Cardamom", middleNotes: "Leather, Jasmine Sambac", baseNotes: "Amber, Moss, Patchouli", longevity: "9h", season: "Winter/Fall", occasion: "Evening", dupe: "Afkar" },
  { id: 6, type: "Designer", name: "Bleu de Chanel Parfum", brand: "Chanel", topNotes: "Lemon Zest, Bergamot, Mint", middleNotes: "Lavender, Pineapple, Geranium", baseNotes: "Sandalwood, Cedar, Amberwood", longevity: "8h", season: "All Year", occasion: "Office/Formal", dupe: "Armaf Iconic" },
  { id: 7, type: "Designer", name: "Eros Flame", brand: "Versace", topNotes: "Mandarin, Black Pepper, Rosemary", middleNotes: "Geranium, Rose", baseNotes: "Vanilla, Tonka Bean, Sandalwood", longevity: "9h", season: "Winter/Fall", occasion: "Clubbing", dupe: "Versencia Rouge" },
  { id: 8, type: "Designer", name: "Spicebomb Extreme", brand: "V&R", topNotes: "Black Pepper, Cumin", middleNotes: "Tobacco", baseNotes: "Vanilla, Bourbon", longevity: "10h", season: "Winter", occasion: "Special Events", dupe: "Charuto Tobacco" },
  { id: 9, type: "Designer", name: "Gentleman Reserve Privee", brand: "Givenchy", topNotes: "Bergamot", middleNotes: "Iris, Chestnut", baseNotes: "Whiskey, Amber, Wood", longevity: "8h", season: "Winter/Fall", occasion: "Formal/Date", dupe: "Kayaan Classic" },
  { id: 10, type: "Designer", name: "Stronger With You Intensely", brand: "Armani", topNotes: "Pink Pepper, Juniper", middleNotes: "Toffee, Cinnamon, Lavender", baseNotes: "Vanilla, Amber, Tonka Bean", longevity: "10h", season: "Winter", occasion: "Date Night", dupe: "Proud of You" },
  { id: 11, type: "Designer", name: "Luna Rossa Black", brand: "Prada", topNotes: "Bergamot", middleNotes: "Angelica, Patchouli", baseNotes: "Coumarin, Amber, Musk", longevity: "8h", season: "Fall/Winter", occasion: "Date Night", dupe: "Lattafa Pride" },
  { id: 12, type: "Designer", name: "Terre d'Hermès", brand: "Hermes", topNotes: "Orange, Grapefruit", middleNotes: "Pepper, Pelargonium", baseNotes: "Vetiver, Cedar, Patchouli", longevity: "8h", season: "Spring/Fall", occasion: "Business", dupe: "Rasasi Fattan" },
  { id: 13, type: "Designer", name: "Acqua di Gio Profondo", brand: "Armani", topNotes: "Sea Notes, Aquozone, Bergamot", middleNotes: "Rosemary, Lavender, Cypress", baseNotes: "Mineral Notes, Musk, Patchouli", longevity: "7h", season: "Summer", occasion: "Casual/Gym", dupe: "Liam Blue" },
  { id: 14, type: "Designer", name: "Y EDP", brand: "YSL", topNotes: "Apple, Ginger, Bergamot", middleNotes: "Sage, Juniper Berries, Geranium", baseNotes: "Amberwood, Tonka Bean, Cedar", longevity: "9h", season: "All Year", occasion: "General Purpose", dupe: "Fakhar Black" },
  { id: 15, type: "Designer", name: "Dior Homme Intense", brand: "Dior", topNotes: "Lavender", middleNotes: "Iris, Ambrette, Pear", baseNotes: "Virginia Cedar, Vetiver", longevity: "9h", season: "Winter/Fall", occasion: "Evening/Formal", dupe: "Dark Door Intense" },
  { id: 16, type: "Designer", name: "Light Blue Intense", brand: "D&G", topNotes: "Mandarin, Grapefruit", middleNotes: "Sea Water, Juniper", baseNotes: "Amberwood, Musk", longevity: "8h", season: "Summer", occasion: "Beach/Casual", dupe: "Lattafa Blue" },
  { id: 17, type: "Designer", name: "Invictus Victory Elixir", brand: "Paco Rabanne", topNotes: "Lavender, Cardamom, Black Pepper", middleNotes: "Incense, Patchouli", baseNotes: "Vanilla, Tonka Bean", longevity: "11h", season: "Winter/Fall", occasion: "Night Out", dupe: "Hayaati" },
  { id: 18, type: "Designer", name: "Valentino Uomo Born In Roma", brand: "Valentino", topNotes: "Mineral Notes, Salt, Violet Leaf", middleNotes: "Ginger, Sage", baseNotes: "Woody Notes, Vetiver", longevity: "8h", season: "Spring/Summer", occasion: "Signature", dupe: "Winners" },
  { id: 19, type: "Designer", name: "Prada L'Homme", brand: "Prada", topNotes: "Neroli, Black Pepper", middleNotes: "Iris, Violet, Geranium", baseNotes: "Amber, Cedar", longevity: "7h", season: "Spring/Summer", occasion: "Office", dupe: "Evoke" },
  { id: 20, type: "Designer", name: "1 Million Royal", brand: "Paco Rabanne", topNotes: "Cardamom, Tangerine, Bergamot", middleNotes: "Lavender, Sage, Violet Leaf", baseNotes: "Benzoin, Cedar, Patchouli", longevity: "9h", season: "Fall/Winter", occasion: "Party", dupe: "Lattafa" },
  { id: 21, type: "Designer", name: "Gucci Guilty Elixir", brand: "Gucci", topNotes: "Pimento, Orange Blossom", middleNotes: "Butter, Orris, Osmanthus", baseNotes: "Ambrofix, Benzoin, Vanilla", longevity: "12h", season: "Fall/Winter", occasion: "Evening", dupe: "Lattafa" },
  { id: 22, type: "Designer", name: "Allure Homme Edition Blanche", brand: "Chanel", topNotes: "Lemon, Bergamot", middleNotes: "Sandalwood, Woody Notes", baseNotes: "Madagascar Vanilla, Vetiver", longevity: "6h", season: "Summer", occasion: "Casual/Date", dupe: "Al Dirgham" },
  { id: 23, type: "Designer", name: "Bad Boy Extreme", brand: "Carolina Herrera", topNotes: "Ginger, Bergamot", middleNotes: "Vetiver, Cocoa", baseNotes: "Patchouli, Tonka Bean", longevity: "9h", season: "Winter/Fall", occasion: "Night Out", dupe: "Maison Alhambra" },
  { id: 24, type: "Designer", name: "Boss Bottled Elixir", brand: "Hugo Boss", topNotes: "Frankincense, Cardamom", middleNotes: "Patchouli, Vetiver", baseNotes: "Labdanum, Cedar", longevity: "10h", season: "Winter", occasion: "Special Events", dupe: "Lattafa" },
  { id: 25, type: "Designer", name: "Polo Red Parfum", brand: "Ralph Lauren", topNotes: "Bergamot, Blood Orange", middleNotes: "Lavender, Orris, Absinthe", baseNotes: "Musk, Cedar, Opoponax", longevity: "8h", season: "Fall/Winter", occasion: "Casual", dupe: "Afnan" },
  { id: 26, type: "Designer", name: "Toy Boy", brand: "Moschino", topNotes: "Pink Pepper, Pear, Nutmeg", middleNotes: "Rose, Magnolia, Clove", baseNotes: "Vetiver, Cashmeran, Sandalwood", longevity: "10h", season: "All Year", occasion: "Artistic", dupe: "Maison Alhambra" },
  { id: 27, type: "Designer", name: "L'Homme Ideal EDP", brand: "Guerlain", topNotes: "Almond, Spices, Lavender", middleNotes: "Cherry, Vanilla, Incense", baseNotes: "Leather, Tonka Bean, Sandalwood", longevity: "8h", season: "Fall/Winter", occasion: "Date Night", dupe: "Ideal Home" },
  { id: 28, type: "Designer", name: "Encre Noire A L'Extreme", brand: "Lalique", topNotes: "Elemi, Cypress, Bergamot", middleNotes: "Vetiver, Incense, Orris", baseNotes: "Benzoin, Sandalwood, Patchouli", longevity: "8h", season: "Winter", occasion: "Moody/Formal", dupe: "Niche" },
  { id: 29, type: "Designer", name: "Greenley", brand: "PDM", topNotes: "Green Apple, Calabrian Bergamot, Mandarin", middleNotes: "Petitgrain, Cedar, Pomarose", baseNotes: "Oakmoss, Musk, Amberwood", longevity: "7h", season: "Summer/Spring", occasion: "Daytime", dupe: "Afnan" },
  { id: 30, type: "Designer", name: "Haltane", brand: "PDM", topNotes: "Clary Sage, Lavender, Bergamot", middleNotes: "Saffron, Praline", baseNotes: "Agarwood (Oud), Cedar", longevity: "10h", season: "Winter/Fall", occasion: "Evening", dupe: "Lattafa" },
  { id: 31, type: "Designer", name: "Club de Nuit Iconic", brand: "Armaf", topNotes: "Grapefruit, Lemon, Mint", middleNotes: "Ginger, Nutmeg, Jasmine", baseNotes: "Sandalwood, Incense, Cedar", longevity: "9h", season: "Summer/Spring", occasion: "Signature", dupe: "BDC Parfum Style" },
  { id: 32, type: "Designer", name: "Coach for Men", brand: "Coach", topNotes: "Pear, Bergamot, Lavender", middleNotes: "Cardamom, Coriander, Geranium", baseNotes: "Ambergris, Suede, Amberwood", longevity: "6h", season: "Spring/Fall", occasion: "Casual", dupe: "Lattafa" },
  { id: 33, type: "Designer", name: "Montblanc Explorer", brand: "Montblanc", topNotes: "Bergamot, Pink Pepper, Clary Sage", middleNotes: "Haitian Vetiver, Leather", baseNotes: "Ambroxan, Akigalawood, Cacao", longevity: "7h", season: "Spring/Fall", occasion: "Signature", dupe: "L'Aventure" },
  { id: 34, type: "Designer", name: "The One Royal Night", brand: "D&G", topNotes: "Cardamom, Basil", middleNotes: "Pear Wood, Nutmeg", baseNotes: "Amber, Cedar, Sandalwood", longevity: "8h", season: "Winter", occasion: "Special Events", dupe: "Afnan" },
  { id: 35, type: "Designer", name: "Legend Spirit", brand: "Montblanc", topNotes: "Grapefruit, Bergamot, Pink Pepper", middleNotes: "Water Notes, Lavender, Cardamom", baseNotes: "White Musk, White Woods, Oakmoss", longevity: "6h", season: "Summer", occasion: "Gym/Casual", dupe: "Najdia" },

  // NICHE (36-70)
  { id: 36, type: "Niche", name: "Aventus", brand: "Creed", topNotes: "Pineapple, Bergamot, Blackcurrant", middleNotes: "Birch, Patchouli, Moroccan Jasmine", baseNotes: "Musk, Oakmoss, Ambergris, Vanille", longevity: "8h", season: "Spring/Summer", occasion: "Professional", dupe: "CDNIM" },
  { id: 37, type: "Niche", name: "Naxos", brand: "Xerjoff", topNotes: "Lavender, Bergamot, Lemon", middleNotes: "Honey, Cinnamon, Cashmeran", baseNotes: "Tobacco Leaf, Vanilla, Tonka Bean", longevity: "11h", season: "Cold/Mild", occasion: "Evening", dupe: "Voux Elegante" },
  { id: 38, type: "Niche", name: "Layton", brand: "PDM", topNotes: "Apple, Lavender, Bergamot, Mandarin", middleNotes: "Geranium, Violet, Jasmine", baseNotes: "Vanilla, Cardamom, Sandalwood", longevity: "9h", season: "Fall/Winter", occasion: "Signature", dupe: "Detour Noir" },
  { id: 39, type: "Niche", name: "Angels' Share", brand: "Kilian", topNotes: "Cognac", middleNotes: "Cinnamon, Tonka Bean, Oak", baseNotes: "Praline, Vanilla, Sandalwood", longevity: "9h", season: "Winter", occasion: "Date Night", dupe: "Khamrah" },
  { id: 40, type: "Niche", name: "Ganymede", brand: "M.A. Barrois", topNotes: "Mandarin", middleNotes: "Saffron, Violet, Osmanthus", baseNotes: "Akigalawood, Immortelle", longevity: "12h+", season: "All Year", occasion: "Artistic/Professional", dupe: "Sept VII" },
  { id: 41, type: "Niche", name: "Baccarat Rouge 540", brand: "MFK", topNotes: "Saffron, Jasmine", middleNotes: "Amberwood, Ambergris", baseNotes: "Fir Resin, Cedar", longevity: "12h+", season: "All Year", occasion: "Special Events", dupe: "Untold" },
  { id: 42, type: "Niche", name: "Side Effect", brand: "Initio", topNotes: "Rum, Vanilla", middleNotes: "Tobacco, Cinnamon", baseNotes: "Sandalwood, Saffron", longevity: "10h", season: "Winter", occasion: "Date Night", dupe: "After Effect" },
  { id: 43, type: "Niche", name: "Hacivat", brand: "Nishane", topNotes: "Pineapple, Grapefruit, Bergamot", middleNotes: "Cedar, Patchouli, Jasmine", baseNotes: "Oakmoss, Woody Notes", longevity: "10h", season: "Summer/Spring", occasion: "Professional", dupe: "SNOI" },
  { id: 44, type: "Niche", name: "Oud For Greatness", brand: "Initio", topNotes: "Saffron, Nutmeg, Lavender", middleNotes: "Agarwood (Oud)", baseNotes: "Patchouli, Musk", longevity: "11h", season: "Winter", occasion: "Formal", dupe: "Oud For Glory" },
  { id: 45, type: "Niche", name: "Tobacco Vanille", brand: "Tom Ford", topNotes: "Tobacco Leaf, Spicy Notes", middleNotes: "Vanilla, Cacao, Tonka Bean", baseNotes: "Dried Fruits, Woody Notes", longevity: "11h", season: "Winter", occasion: "Evening", dupe: "Charuto" },
  { id: 46, type: "Niche", name: "Silver Mountain Water", brand: "Creed", topNotes: "Bergamot, Mandarin Orange", middleNotes: "Green Tea, Blackcurrant", baseNotes: "Musk, Petitgrain, Sandalwood", longevity: "7h", season: "Summer", occasion: "Daytime", dupe: "Sillage" },
  { id: 47, type: "Niche", name: "Grand Soir", brand: "MFK", topNotes: "Labdanum", middleNotes: "Benzoin, Tonka Bean", baseNotes: "Amber, Vanilla", longevity: "11h", season: "Winter", occasion: "Formal/Evening", dupe: "Eternal Oud" },
  { id: 48, type: "Niche", name: "Reflection Man", brand: "Amouage", topNotes: "Rosemary, Pink Pepper, Petitgrain", middleNotes: "Jasmine, Orris, Neroli", baseNotes: "Sandalwood, Patchouli, Cedar", longevity: "9h", season: "Spring/Signature", occasion: "Business", dupe: "The Tux" },
  { id: 49, type: "Niche", name: "Ani", brand: "Nishane", topNotes: "Ginger, Bergamot, Pink Pepper", middleNotes: "Cardamom, Blackcurrant, Rose", baseNotes: "Vanilla, Benzoin, Sandalwood", longevity: "10h", season: "Fall/Winter", occasion: "Evening", dupe: "Nasheet" },
  { id: 50, type: "Niche", name: "Erba Pura", brand: "Xerjoff", topNotes: "Orange, Lemon, Bergamot", middleNotes: "Fruits", baseNotes: "White Musk, Amber, Vanilla", longevity: "12h+", season: "All Year", occasion: "Statement", dupe: "Amber Oud Gold" },
  { id: 51, type: "Niche", name: "Imagination", brand: "LV", topNotes: "Citron, Calabrian Bergamot, Orange", middleNotes: "Nigerian Ginger, Ceylon Cinnamon", baseNotes: "Chinese Black Tea, Ambroxan, Guaiac Wood", longevity: "9h", season: "Summer", occasion: "Luxury Casual", dupe: "Art of Arabia" },
  { id: 52, type: "Niche", name: "Afternoon Swim", brand: "LV", topNotes: "Mandarin Orange", middleNotes: "Sicilian Orange", baseNotes: "Bergamot", longevity: "6h", season: "Summer", occasion: "Holiday", dupe: "North Stag III" },
  { id: 53, type: "Niche", name: "L'Immensite", brand: "LV", topNotes: "Grapefruit, Ginger, Bergamot", middleNotes: "Water Notes, Sage, Rosemary", baseNotes: "Ambroxan, Amber, Labdanum", longevity: "8h", season: "Summer/Spring", occasion: "Signature", dupe: "Immortal" },
  { id: 54, type: "Niche", name: "Ombre Nomade", brand: "LV", topNotes: "Raspberry, Saffron", middleNotes: "Rose, Geranium", baseNotes: "Agarwood (Oud), Benzoin, Incense", longevity: "14h+", season: "Winter", occasion: "Powerful Evening", dupe: "Jean Lowe Ombre" },
  { id: 55, type: "Niche", name: "Tygar", brand: "Bvlgari", topNotes: "Grapefruit", middleNotes: "Woody Notes", baseNotes: "Ambroxan", longevity: "9h", season: "Summer", occasion: "Professional", dupe: "Turathi Blue" },
  { id: 56, type: "Niche", name: "Accento", brand: "Xerjoff", topNotes: "Pineapple, Hyacinth", middleNotes: "Iris, Jasmine, Pink Pepper", baseNotes: "Musk, Amber, Vetiver", longevity: "9h", season: "Spring/Summer", occasion: "Artistic", dupe: "Lattafa" },
  { id: 57, type: "Niche", name: "Alexandria II", brand: "Xerjoff", topNotes: "Rosewood, Lavender, Cinnamon, Apple", middleNotes: "Rose, Cedar, Lily-of-the-Valley", baseNotes: "Oud, Sandalwood, Vanilla, Amber", longevity: "12h+", season: "Winter", occasion: "Formal/Royal", dupe: "Lattafa Pride" },
  { id: 58, type: "Niche", name: "Richwood", brand: "Xerjoff", topNotes: "Tangerine, Bergamot", middleNotes: "Rose, Geranium", baseNotes: "Patchouli, Sandalwood, Vanilla", longevity: "10h", season: "Fall/Winter", occasion: "Special Events", dupe: "Niche" },
  { id: 59, type: "Niche", name: "Interlude Man", brand: "Amouage", topNotes: "Oregano, Pepper, Bergamot", middleNotes: "Incense, Amber, Labdanum", baseNotes: "Leather, Oud, Sandalwood, Patchouli", longevity: "12h+", season: "Winter", occasion: "Statement", dupe: "Midnight Oud" },
  { id: 60, type: "Niche", name: "Black Phantom", brand: "Kilian", topNotes: "Dark Chocolate, Rum", middleNotes: "Caramel, Coffee, Sugar Cane", baseNotes: "Almond, Sandalwood, Heliotrope", longevity: "9h", season: "Winter", occasion: "Evening", dupe: "Black Knight" },
  { id: 61, type: "Niche", name: "Carlisle", brand: "PDM", topNotes: "Nutmeg, Apple", middleNotes: "Rose, Tonka Bean", baseNotes: "Patchouli, Vanilla", longevity: "10h", season: "Winter/Fall", occasion: "Night Out", dupe: "Cassius" },
  { id: 62, type: "Niche", name: "Herod", brand: "PDM", topNotes: "Cinnamon, Pepper", middleNotes: "Tobacco Leaf, Incense", baseNotes: "Vanilla, Iso E Super, Musk", longevity: "8h", season: "Winter", occasion: "Intimate", dupe: "Hercules" },
  { id: 63, type: "Niche", name: "Oajan", brand: "PDM", topNotes: "Cinnamon, Honey, Osmanthus", middleNotes: "Benzoin, Labdanum, Amber", baseNotes: "Tonka Bean, Vanilla, Patchouli", longevity: "10h", season: "Winter", occasion: "Evening", dupe: "Angels Share Alt" },
  { id: 64, type: "Niche", name: "Sedley", brand: "PDM", topNotes: "Mint, Lemon, Bergamot, Grapefruit", middleNotes: "Lavender, Rosemary, Geranium", baseNotes: "Ambroxan, Sandalwood, Vetiver", longevity: "7h", season: "Summer", occasion: "Signature", dupe: "Lattafa" },
  { id: 65, type: "Niche", name: "Galloway", brand: "PDM", topNotes: "Citrus, Pepper", middleNotes: "Iris, Orange Blossom", baseNotes: "Musk, Amber", longevity: "8h", season: "Spring/Summer", occasion: "Clean/Office", dupe: "Lattafa" },
  { id: 66, type: "Niche", name: "African Leather", brand: "Memo", topNotes: "Cardamom, Saffron", middleNotes: "Cumin, Geranium", baseNotes: "Leather, Patchouli, Oud", longevity: "10h", season: "Fall/Winter", occasion: "Travel/Adventurous", dupe: "Afro Leather" },
  { id: 67, type: "Niche", name: "Irish Leather", brand: "Memo", topNotes: "Juniper Berries", middleNotes: "Mate, Iris", baseNotes: "Leather, Amber, Tonka Bean", longevity: "9h", season: "Spring/Fall", occasion: "Outdoor", dupe: "Lattafa" },
  { id: 68, type: "Niche", name: "Cedrat Boise", brand: "Mancera", topNotes: "Sicilian Lemon, Blackcurrant, Bergamot", middleNotes: "Fruity Notes, Patchouli Leaf, Jasmine", baseNotes: "Cedar, Leather, Sandalwood, Vanilla", longevity: "9h", season: "All Year", occasion: "Signature", dupe: "Afnan" },
  { id: 69, type: "Niche", name: "Red Tobacco", brand: "Mancera", topNotes: "Cinnamon, Agarwood (Oud), Saffron, Nutmeg", middleNotes: "Patchouli, Jasmine", baseNotes: "Tobacco, Madagascar Vanilla, Amber", longevity: "14h+", season: "Winter", occasion: "Statement", dupe: "Lattafa" },
  { id: 70, type: "Niche", name: "Instant Crush", brand: "Mancera", topNotes: "Saffron, Ginger, Bergamot", middleNotes: "Amberwood, Moroccan Rose, Jasmine", baseNotes: "Madagascar Vanilla, White Musk, Sandalwood", longevity: "11h", season: "Fall/Winter", occasion: "Night Out", dupe: "Afnan" },

  // ARABIAN & DUPES (71-100)
  { id: 71, type: "Arabian", name: "Khamrah", brand: "Lattafa", topNotes: "Cinnamon, Nutmeg, Bergamot", middleNotes: "Dates, Praline, Tuberose, Mahonial", baseNotes: "Vanilla, Tonka Bean, Amberwood, Benzoin", longevity: "10h", season: "Winter", occasion: "Evening", dupe: "Angels' Share Style" },
  { id: 72, type: "Arabian", name: "Asad", brand: "Lattafa", topNotes: "Black Pepper, Pineapple, Tobacco", middleNotes: "Coffee, Patchouli, Iris", baseNotes: "Amber, Vanilla, Dry Wood, Benzoin, Labdanum", longevity: "9h", season: "Winter/Fall", occasion: "Special Events", dupe: "Sauvage Elixir Alt" },
  { id: 73, type: "Arabian", name: "9PM", brand: "Afnan", topNotes: "Apple, Cinnamon, Wild Lavender, Bergamot", middleNotes: "Orange Blossom, Lily-of-the-Valley", baseNotes: "Vanilla, Tonka Bean, Amber, Patchouli", longevity: "9h", season: "All Year", occasion: "Date Night", dupe: "Ultra Male Alt" },
  { id: 74, type: "Arabian", name: "Turathi Blue", brand: "Afnan", topNotes: "Grapefruit, Bergamot, Mandarin", middleNotes: "Amber, Woody Notes", baseNotes: "Musk, Patchouli, Spices", longevity: "9h", season: "Summer/Spring", occasion: "Professional", dupe: "Tygar Style" },
  { id: 75, type: "Arabian", name: "Club de Nuit Intense", brand: "Armaf", topNotes: "Lemon, Pineapple, Bergamot, Blackcurrant", middleNotes: "Birch, Jasmine, Rose", baseNotes: "Musk, Ambergris, Patchouli, Vanilla", longevity: "9h", season: "Spring/Summer", occasion: "Signature", dupe: "Aventus Style" },
  { id: 76, type: "Arabian", name: "Hawas", brand: "Rasasi", topNotes: "Apple, Bergamot, Lemon, Cinnamon", middleNotes: "Watery Notes, Plum, Orange Blossom", baseNotes: "Ambergris, Musk, Patchouli, Driftwood", longevity: "9h", season: "Summer", occasion: "Casual/Outdoor", dupe: "Invictus Style" },
  { id: 77, type: "Arabian", name: "Detour Noir", brand: "Al Haramain", topNotes: "Apple, Lavender, Bergamot, Mandarin Orange", middleNotes: "Geranium, Violet, Jasmine", baseNotes: "Vanilla, Cardamom, Sandalwood, Patchouli", longevity: "8h", season: "Fall/Winter", occasion: "Signature", dupe: "Layton Style" },
  { id: 78, type: "Arabian", name: "Amber Oud Gold", brand: "Al Haramain", topNotes: "Bergamot, Green Notes", middleNotes: "Melon, Pineapple, Amber, Sweet Notes", baseNotes: "Vanilla, Musk, Woody Notes", longevity: "12h+", season: "All Year", occasion: "Statement", dupe: "Erba Pura Style" },
  { id: 79, type: "Arabian", name: "Fakhar Black", brand: "Lattafa", topNotes: "Apple, Ginger, Bergamot", middleNotes: "Sage, Juniper Berries, Geranium", baseNotes: "Amberwood, Tonka Bean, Cedar, Vetiver", longevity: "7h", season: "All Year", occasion: "Office/Signature", dupe: "YSL Y Style" },
  { id: 80, type: "Arabian", name: "Ramz Silver", brand: "Lattafa", topNotes: "Pear, Lavender, Mint, Bergamot", middleNotes: "Cardamom, Sage", baseNotes: "Vanilla, Amber, Musk, Patchouli", longevity: "8h", season: "Fall/Winter", occasion: "Casual Date", dupe: "Le Male Style" },
  { id: 81, type: "Arabian", name: "Ameer Al Oudh Intense", brand: "Lattafa", topNotes: "Oud, Woody Notes", middleNotes: "Vanilla, Sugar", baseNotes: "Sandalwood, Herbs", longevity: "10h", season: "Winter", occasion: "Cozy Evening", dupe: "BTF Style" },
  { id: 82, type: "Arabian", name: "Bade'e Al Oud", brand: "Lattafa", topNotes: "Saffron, Nutmeg, Lavender", middleNotes: "Agarwood (Oud), Patchouli", baseNotes: "Musk", longevity: "11h", season: "Winter", occasion: "Formal", dupe: "Oud For Glory" },
  { id: 83, type: "Arabian", name: "Qaed Al Fursan", brand: "Lattafa", topNotes: "Pineapple, Saffron", middleNotes: "Jasmine, Balsam Fir", baseNotes: "Amber, Cedar, Cedar", longevity: "7h", season: "Summer/Spring", occasion: "Casual Daytime", dupe: "Juicy Pineapple" },
  { id: 84, type: "Arabian", name: "Ejaazi", brand: "Lattafa", topNotes: "Orange, Citrus, Cardamom, Myrtle", middleNotes: "Pepper, Lavender, Lily-of-the-Valley", baseNotes: "Ambroxan, Cedar, Oakmoss, Patchouli", longevity: "8h", season: "Spring/Summer", occasion: "Office", dupe: "Blue Style" },
  { id: 85, type: "Arabian", name: "Hayaati", brand: "Lattafa", topNotes: "Apple, Bergamot", middleNotes: "Cinnamon, Wood", baseNotes: "Musk, Vanilla", longevity: "8h", season: "All Year", occasion: "Signature", dupe: "Invictus Victory Style" },
  { id: 86, type: "Arabian", name: "Liam Blue", brand: "Lattafa", topNotes: "Sea Notes, Bergamot", middleNotes: "Rosemary, Sage", baseNotes: "Patchouli, Amber", longevity: "7h", season: "Summer", occasion: "Gym/Casual", dupe: "Profondo Style" },
  { id: 87, type: "Arabian", name: "Khamrah Qahwa", brand: "Lattafa", topNotes: "Ginger, Cardamom, Cinnamon", middleNotes: "Coffee, Praline, Candied Fruits", baseNotes: "Vanilla, Benzoin, Tonka Bean", longevity: "11h", season: "Winter", occasion: "Cozy/Evening", dupe: "Coffee Angels Share" },
  { id: 88, type: "Arabian", name: "Liquid Brun", brand: "Fragrance World", topNotes: "Bergamot, Cinnamon, Cardamom", middleNotes: "Vanilla, Bourbon", baseNotes: "Musk, Amber", longevity: "10h", season: "Winter", occasion: "Signature", dupe: "Althair Style" },
  { id: 89, type: "Arabian", name: "Suits", brand: "Fragrance World", topNotes: "Violet Leaf, Coriander", middleNotes: "Black Pepper, Rose", baseNotes: "Patchouli, Amber, Vanilla", longevity: "8h", season: "Fall/Winter", occasion: "Formal", dupe: "Tuxedo Style" },
  { id: 90, type: "Arabian", name: "Untold", brand: "Armaf", topNotes: "Saffron, Jasmine", middleNotes: "Amberwood, Ambergris", baseNotes: "Fir Resin, Cedar", longevity: "12h+", season: "All Year", occasion: "Evening", dupe: "BR540 Style" },
  { id: 91, type: "Arabian", name: "SNOI", brand: "Afnan", topNotes: "Blackcurrant, Bergamot, Apple", middleNotes: "Oakmoss, Patchouli, Jasmine", baseNotes: "Ambergris, Musk, Vanilla", longevity: "10h", season: "Spring/Summer", occasion: "Signature", dupe: "Hacivat Style" },
  { id: 92, type: "Arabian", name: "Jean Lowe Ombre", brand: "Maison Alhambra", topNotes: "Agarwood (Oud), Saffron", middleNotes: "Rose, Raspberry, Geranium", baseNotes: "Benzoin, Birch, Amberwood", longevity: "12h+", season: "Winter", occasion: "Evening/Formal", dupe: "Nomade Style" },
  { id: 93, type: "Arabian", name: "Porto Neroli", brand: "Maison Alhambra", topNotes: "Neroli, Lemon, Mandarin", middleNotes: "Orange Blossom, Jasmine", baseNotes: "Amber, Angelica", longevity: "6h", season: "Summer", occasion: "Holiday", dupe: "TF Neroli Style" },
  { id: 94, type: "Arabian", name: "Tobacco Touch", brand: "Maison Alhambra", topNotes: "Tobacco, Spicy Notes", middleNotes: "Vanilla, Cacao, Tonka Bean", baseNotes: "Dried Fruits, Wood", longevity: "9h", season: "Winter", occasion: "Evening", dupe: "TF Vanille Style" },
  { id: 95, type: "Arabian", name: "Hercules", brand: "Maison Alhambra", topNotes: "Cinnamon, Pepper", middleNotes: "Tobacco, Incense", baseNotes: "Vanilla, Musk", longevity: "8h", season: "Winter", occasion: "Intimate", dupe: "Herod Style" },
  { id: 96, type: "Arabian", name: "Cassius", brand: "Maison Alhambra", topNotes: "Nutmeg, Apple", middleNotes: "Rose, Tonka Bean", baseNotes: "Patchouli, Vanilla", longevity: "9h", season: "Winter/Fall", occasion: "Evening", dupe: "Carlisle Style" },
  { id: 97, type: "Arabian", name: "Kismet Angel", brand: "Maison Alhambra", topNotes: "Cognac, Honey", middleNotes: "Cinnamon, Tonka Bean", baseNotes: "Vanilla, Praline", longevity: "8h", season: "Winter", occasion: "Date Night", dupe: "Angels Share Alt" },
  { id: 98, type: "Arabian", name: "Fattan", brand: "Rasasi", topNotes: "Grapefruit, Bergamot", middleNotes: "Cedar, Vetiver, Patchouli", baseNotes: "Oakmoss, Benzoin, Amber", longevity: "8h", season: "Spring/Fall", occasion: "Signature", dupe: "Terre d'Hermes Style" },
  { id: 99, type: "Arabian", name: "Shaghaf Oud", brand: "Swiss Arabian", topNotes: "Saffron", middleNotes: "Rose, Agarwood (Oud)", baseNotes: "Vanilla, Praline", longevity: "12h+", season: "Winter", occasion: "Loud Evening", dupe: "Oud Bouquet Style" },
  { id: 100, type: "Arabian", name: "Art of Arabia I", brand: "Lattafa", topNotes: "Bergamot, Mint", middleNotes: "Black Tea, Ginger", baseNotes: "Ambroxan, Guaiac Wood", longevity: "8h", season: "Summer", occasion: "Luxury Casual", dupe: "Imagination Style" }
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
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('archive')}>
            <span className="text-xl font-black tracking-tight uppercase italic">Explorer</span>
            <span className="text-[7px] tracking-[0.4em] text-amber-500 font-bold uppercase">Swiss Private Archive</span>
          </div>
          <div className="flex gap-8 text-[11px] font-semibold uppercase tracking-widest">
            <button onClick={() => setActiveTab('archive')} className={activeTab === 'archive' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>Archive</button>
            <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? "text-amber-500" : "text-gray-500 hover:text-white transition-colors"}>News</button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'archive' ? (
            <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SEARCH & FILTERS */}
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
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 text-[10px] rounded-full font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-amber-500 text-black border-amber-500' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>{cat}</button>
                  ))}
                </div>
              </div>

              {/* LIST VIEW */}
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
            <div className="max-w-2xl mx-auto py-20 text-center">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Market News Feed</h2>
              <p className="text-gray-500">Live data for the Swiss fragrance market is being indexed.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0c0c0c] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelected(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-10"><X size={20} /></button>
              
              <div className="p-12 space-y-10">
                <div>
                  <span className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase">{selected.brand} Archive</span>
                  <h2 className="text-4xl font-black tracking-tighter text-white mt-2 uppercase leading-none">{selected.name}</h2>
                </div>

                <div className="space-y-6 text-sm">
                  <div className="space-y-1">
                    <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">Top Notes:</span>
                    <p className="text-white text-lg font-light leading-snug">{selected.topNotes}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">Middle Notes:</span>
                    <p className="text-white text-lg font-light leading-snug">{selected.middleNotes}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-amber-500/50 text-[10px] font-bold uppercase tracking-widest block">Base Notes:</span>
                    <p className="text-white text-lg font-light leading-snug">{selected.baseNotes}</p>
                  </div>
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
