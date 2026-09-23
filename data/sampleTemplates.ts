export interface TemplateTheme {
  id: string;
  name: string;
  category: string;
  badgeClass: string;
  gradientBg: string;
  envelopeGradient: string;
  accentText: string;
  borderAccent: string;
  stampBg: string;
  description: string;
}

export interface SampleWeddingTemplate {
  _id: string;
  userId: string;
  authorName: string;
  slug: string;
  templateThemeId: string;
  theme: TemplateTheme;
  groomName: string;
  brideName: string;
  namesFormatted: string;
  monogram: string;
  eventTitle: string;
  eventSubtitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDetails: string;
  rsvpDeadline: string;
  phoneContact: string;
  tagline: string;
  hashtag: string;
  coverImage: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export const SAMPLE_TEMPLATES: SampleWeddingTemplate[] = [
  {
    _id: "template-sajedul-sadia",
    userId: "system-template",
    authorName: "Royal Heritage Design Studio",
    slug: "sajedul-and-sadia",
    templateThemeId: "royal-emerald",
    theme: {
      id: "royal-emerald",
      name: "Royal Emerald & Gold",
      category: "Royal Heritage",
      badgeClass: "bg-emerald-950/90 text-amber-300 border-amber-400/40",
      gradientBg: "from-[#0d4637] via-[#062c22] to-[#031712]",
      envelopeGradient: "from-[#0d4536] via-[#062c22] to-[#031712]",
      accentText: "text-amber-300",
      borderAccent: "border-amber-400/50",
      stampBg: "bg-emerald-950 border-amber-400/40 text-amber-200",
      description: "Classic Mughal & Bengal royal palace luxury with emerald velvet, pure gold leaf accents, and regal calligraphy.",
    },
    groomName: "Mohammad Sajedul Islam",
    brideName: "Sadia",
    namesFormatted: "Sajedul & Sadia",
    monogram: "S & S",
    eventTitle: "Grand Wedding Reception",
    eventSubtitle: "Walima Celebration",
    eventDate: "2026-12-29T19:00:00+06:00",
    eventTime: "7:00 PM BST (Evening)",
    venueName: "Phoenix Convention Hall",
    venueAddress: "Tejgaon Industrial Area, Shahid Tajuddin Ahmed Sarani",
    venueCity: "Dhaka - 1208, Bangladesh",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Phoenix+Convention+Hall+Tejgaon+Dhaka+Bangladesh",
    dressCodeTitle: "Traditional / Royal Formal",
    dressCodeDetails: "Sherwani, Royal Suit, Jamdani, Zardosi Lehenga",
    rsvpDeadline: "December 20, 2026",
    phoneContact: "+880 1712-345678",
    tagline:
      "Together with our loving families, we cordially invite you to celebrate the joyous reception of our wedding.",
    hashtag: "#SajedulWedsSadia",
    coverImage: "/images/sajedul-and-sadia.jpg",
    isPublic: true,
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
  {
    _id: "template-aayan-zoya",
    userId: "system-template",
    authorName: "Celestial Nocturne Atelier",
    slug: "aayan-and-zoya",
    templateThemeId: "midnight-velvet",
    theme: {
      id: "midnight-velvet",
      name: "Midnight Velvet & Rose Gold",
      category: "Midnight Velvet",
      badgeClass: "bg-purple-950/90 text-rose-300 border-rose-400/40",
      gradientBg: "from-[#22103b] via-[#100720] to-[#06020d]",
      envelopeGradient: "from-[#241240] via-[#120724] to-[#080310]",
      accentText: "text-rose-300",
      borderAccent: "border-rose-400/50",
      stampBg: "bg-purple-950 border-rose-400/40 text-rose-200",
      description: "Deep starlit nocturnal indigo paired with shimmering rose-gold accents, crystal chandelier mood, and romantic poetry.",
    },
    groomName: "Aayan Chowdhury",
    brideName: "Zoya Rahman",
    namesFormatted: "Aayan & Zoya",
    monogram: "A & Z",
    eventTitle: "Starlight Wedding Banquet",
    eventSubtitle: "An Evening of Eternal Vows",
    eventDate: "2027-02-20T19:30:00+06:00",
    eventTime: "7:30 PM BST (Night Gala)",
    venueName: "The Westin Grand Ballroom",
    venueAddress: "Main Gulshan Avenue, Gulshan-2",
    venueCity: "Dhaka, Bangladesh",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Westin+Dhaka",
    dressCodeTitle: "Black Tie & Velvet Glamour",
    dressCodeDetails: "Tuxedo, Midnight Sherwani, Wine Lehenga, Silk Gown",
    rsvpDeadline: "February 08, 2027",
    phoneContact: "+880 1788-123456",
    tagline:
      "Written among the stars, sealed with faith and devotion. Join us under sparkling chandeliers to celebrate our union.",
    hashtag: "#AayanLovesZoya",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85",
    isPublic: true,
    createdAt: "2026-09-02T10:00:00.000Z",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    _id: "template-farhan-anika",
    userId: "system-template",
    authorName: "Blush Blossom Romance",
    slug: "farhan-and-anika",
    templateThemeId: "blush-romance",
    theme: {
      id: "blush-romance",
      name: "Blush Rose & Ivory Pearl",
      category: "Blush Romance",
      badgeClass: "bg-rose-950/90 text-pink-200 border-pink-400/40",
      gradientBg: "from-[#381426] via-[#1e0712] to-[#0e0208]",
      envelopeGradient: "from-[#3d152a] via-[#200814] to-[#10020a]",
      accentText: "text-pink-300",
      borderAccent: "border-pink-400/50",
      stampBg: "bg-rose-950 border-pink-400/40 text-pink-200",
      description: "Soft garden florals, pastel cherry blossoms, champagne ivory tones, and modern delicate calligraphy.",
    },
    groomName: "Farhan Tariq",
    brideName: "Anika Tabassum",
    namesFormatted: "Farhan & Anika",
    monogram: "F & A",
    eventTitle: "Enchanted Garden Wedding",
    eventSubtitle: "Walima & Celebration of Love",
    eventDate: "2027-03-12T18:00:00+06:00",
    eventTime: "6:00 PM BST (Sunset)",
    venueName: "Le Méridien Sky Ballroom",
    venueAddress: "79/A Commercial Area, Airport Road",
    venueCity: "Dhaka, Bangladesh",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Le+Meridien+Dhaka",
    dressCodeTitle: "Pastel & Floral Chic",
    dressCodeDetails: "Pastel Kurta, Beige Suit, Blush Pink Sharee, Floral Gown",
    rsvpDeadline: "March 01, 2027",
    phoneContact: "+880 1799-554433",
    tagline:
      "Two souls blossoming in love. With immense joy and the blessings of Allah, we invite you to be part of our new beginning.",
    hashtag: "#FarhanGotAnika",
    coverImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
    isPublic: true,
    createdAt: "2026-09-03T10:00:00.000Z",
    updatedAt: "2026-09-03T10:00:00.000Z",
  },
  {
    _id: "template-tanvir-nusrat",
    userId: "system-template",
    authorName: "Sapphire Starlight Collection",
    slug: "tanvir-and-nusrat",
    templateThemeId: "sapphire-starlight",
    theme: {
      id: "sapphire-starlight",
      name: "Sapphire Starlight & Platinum",
      category: "Sapphire Starlight",
      badgeClass: "bg-blue-950/90 text-cyan-200 border-cyan-400/40",
      gradientBg: "from-[#0c2e59] via-[#061730] to-[#020b17]",
      envelopeGradient: "from-[#0d3261] via-[#071936] to-[#020d1c]",
      accentText: "text-cyan-300",
      borderAccent: "border-cyan-400/50",
      stampBg: "bg-blue-950 border-cyan-400/40 text-cyan-200",
      description: "Deep oceanic royal navy with crisp platinum silver accents, modern geometric lines, and timeless sophistication.",
    },
    groomName: "Tanvir Ahmed",
    brideName: "Nusrat Jahan",
    namesFormatted: "Tanvir & Nusrat",
    monogram: "T & N",
    eventTitle: "Grand Wedding Ceremony",
    eventSubtitle: "Shubho Bibaho & Reception",
    eventDate: "2027-01-15T18:30:00+06:00",
    eventTime: "6:30 PM BST (Evening)",
    venueName: "Sena Malancha Convention Hall",
    venueAddress: "Dhaka Cantonment",
    venueCity: "Dhaka, Bangladesh",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sena+Malancha+Dhaka",
    dressCodeTitle: "Traditional / Regal Formal",
    dressCodeDetails: "Navy Sherwani, Panjabi, Jamdani, Katan Sharee",
    rsvpDeadline: "January 05, 2027",
    phoneContact: "+880 1819-998877",
    tagline:
      "We invite you to share our joy as we begin this new chapter in the grace of Almighty Allah.",
    hashtag: "#TanvirFoundHisNusrat",
    coverImage:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85",
    isPublic: true,
    createdAt: "2026-09-04T10:00:00.000Z",
    updatedAt: "2026-09-04T10:00:00.000Z",
  },
  {
    _id: "template-riyad-mehnaz",
    userId: "system-template",
    authorName: "Terracotta Sunset Collective",
    slug: "riyad-and-mehnaz",
    templateThemeId: "terracotta-sunset",
    theme: {
      id: "terracotta-sunset",
      name: "Terracotta Sunset & Amber Glow",
      category: "Terracotta Sunset",
      badgeClass: "bg-amber-950/90 text-orange-200 border-orange-400/40",
      gradientBg: "from-[#451f0c] via-[#291004] to-[#140601]",
      envelopeGradient: "from-[#4a220d] via-[#2d1105] to-[#170601]",
      accentText: "text-amber-400",
      borderAccent: "border-amber-500/50",
      stampBg: "bg-stone-900 border-orange-400/40 text-orange-200",
      description: "Warm earthy terracotta, golden hour amber rays, autumn foliage, and rustic bohemian charm.",
    },
    groomName: "Riyad Hasan",
    brideName: "Mehnaz Kabir",
    namesFormatted: "Riyad & Mehnaz",
    monogram: "R & M",
    eventTitle: "Sunset Lakeside Reception",
    eventSubtitle: "Celebration of Forever",
    eventDate: "2027-04-05T17:30:00+06:00",
    eventTime: "5:30 PM BST (Sunset Reception)",
    venueName: "Lake Shore Banquets",
    venueAddress: "Road 41, Gulshan Lake, Gulshan-2",
    venueCity: "Dhaka, Bangladesh",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Shore+Hotel+Dhaka",
    dressCodeTitle: "Warm Earth Tones & Bohemian Elegance",
    dressCodeDetails: "Rust, Terracotta Kurta, Linen Suit, Burnt Orange Sharee",
    rsvpDeadline: "March 25, 2027",
    phoneContact: "+880 1733-445566",
    tagline:
      "Bathed in golden light and endless gratitude. Come celebrate love, laughter, and lifelong togetherness with us.",
    hashtag: "#RiyadWedsMehnaz",
    coverImage:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1400&q=85",
    isPublic: true,
    createdAt: "2026-09-05T10:00:00.000Z",
    updatedAt: "2026-09-05T10:00:00.000Z",
  },
  {
    _id: "template-imran-nafisa",
    userId: "system-template",
    authorName: "Marigold Holud Utsab",
    slug: "imran-and-nafisa",
    templateThemeId: "marigold-festive",
    theme: {
      id: "marigold-festive",
      name: "Marigold Festive & Turmeric Gala",
      category: "Marigold Festive",
      badgeClass: "bg-yellow-950/90 text-amber-200 border-yellow-500/40",
      gradientBg: "from-[#3d2c04] via-[#241a02] to-[#120d01]",
      envelopeGradient: "from-[#423004] via-[#261c02] to-[#140e01]",
      accentText: "text-yellow-300",
      borderAccent: "border-yellow-400/50",
      stampBg: "bg-yellow-950 border-yellow-400/40 text-yellow-200",
      description: "Vibrant yellow marigold florals, turmeric golden hues, energetic dhol festival vibes, and traditional Bengali warmth.",
    },
    groomName: "Imran Hossain",
    brideName: "Nafisa Rahman",
    namesFormatted: "Imran & Nafisa",
    monogram: "I & N",
    eventTitle: "Gaye Holud & Reception Gala",
    eventSubtitle: "Ronger Utsab • Celebration of Love",
    eventDate: "2027-02-14T19:00:00+06:00",
    eventTime: "7:00 PM BST (Festive Evening)",
    venueName: "Radisson Blu Water Garden Grand Ballroom",
    venueAddress: "Airport Road, Dhaka Cantonment",
    venueCity: "Dhaka, Bangladesh",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Radisson+Blu+Dhaka",
    dressCodeTitle: "Festive Yellow & Traditional Vibrant",
    dressCodeDetails: "Yellow Panjabi, Vibrant Holud Sharee, Floral Jewelry, Sherwani",
    rsvpDeadline: "February 01, 2027",
    phoneContact: "+880 1912-887766",
    tagline:
      "Colors of joyous melody, beats of celebratory dhol, and warm smiles of family. Join our grand festival of love!",
    hashtag: "#ImranNafisaHolud",
    coverImage:
      "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1400&q=85",
    isPublic: true,
    createdAt: "2026-09-06T10:00:00.000Z",
    updatedAt: "2026-09-06T10:00:00.000Z",
  },
];

export function getTemplateBySlug(slug: string): SampleWeddingTemplate | undefined {
  return SAMPLE_TEMPLATES.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

export function getTemplateById(id: string): SampleWeddingTemplate | undefined {
  return SAMPLE_TEMPLATES.find((t) => t.templateThemeId === id || t._id === id);
}
