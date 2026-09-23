export interface StoryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  venue: string;
  dressCode: string;
  dressCodeNote?: string;
  description: string;
  iconName: "Sparkles" | "Heart" | "Wine" | "Music" | "Sun";
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  aspect: "4/5" | "square" | "16/9";
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  attending?: boolean;
}

export const weddingData = {
  couple: {
    bride: "Sadia",
    groom: "Mohammad Sajedul Islam",
    namesFormatted: "Sajedul & Sadia",
    fullNameHeadline: "Mohammad Sajedul Islam & Sadia",
    monogram: "S & S",
    tagline: "Together with their beloved families, cordially invite you to share in the joy and blessings of their Grand Wedding Reception.",
    dateHeadline: "Tuesday, December 29, 2026",
    timeHeadline: "Evening • 7:00 PM Onwards",
    venueHeadline: "Phoenix Convention Hall • Tejgaon, Dhaka",
    targetDateISO: "2026-12-29T19:00:00+06:00",
    hashtag: "#SajedulWedsSadia",
    coverImage: "/images/sajedul-and-sadia.jpg",
  },
  calendar: {
    title: "Wedding Reception of Mohammad Sajedul Islam & Sadia",
    description: "You are cordially invited to celebrate the Grand Wedding Reception (Walima) of Mohammad Sajedul Islam and Sadia at Phoenix Convention Hall, Tejgaon, Dhaka, Bangladesh.",
    location: "Phoenix Convention Hall, Tejgaon Industrial Area, Dhaka, Bangladesh",
    start: "20261229T130000Z", // 7:00 PM BST (UTC+6) -> 13:00 UTC
    end: "20261229T173000Z",   // 11:30 PM BST (UTC+6) -> 17:30 UTC
  },
  ourStory: [
    {
      id: "story-1",
      title: "How We Met",
      date: "Spring 2022",
      description:
        "A cherished introduction brought our two families together in Dhaka. From that very first conversation filled with shared laughter, core values, and mutual respect, an unbreakable bond began to bloom.",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      alt: "Couple smiling warmly together in elegant traditional attire",
    },
    {
      id: "story-2",
      title: "The Akdh & Commitment",
      date: "Autumn 2025",
      description:
        "Surrounded by our closest loved ones, we sealed our heartfelt promise to cherish, support, and walk beside each other through every season of life. An intimate ceremony marked by immense gratitude and prayer.",
      imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      alt: "Intimate celebration with floral decorations and warm ambient lights",
    },
    {
      id: "story-3",
      title: "The Journey to Forever",
      date: "December 2026 & Beyond",
      description:
        "Now, with full hearts and the prayers of our elders, we step forward into our new life together. We look forward to creating enduring memories and celebrating this auspicious milestone in your warm presence.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      alt: "Couple holding hands in celebration",
    },
  ] as StoryEvent[],
  schedule: [
    {
      id: "event-1",
      title: "Guest Arrival & Welcome Drinks",
      date: "Tuesday, December 29, 2026",
      time: "7:00 PM – 8:00 PM",
      venue: "Phoenix Convention Hall Lobby & Lounge",
      dressCode: "Traditional / Formal",
      dressCodeNote: "Sherwani, Suit, Lehenga, Sharee",
      description:
        "Guests are warmly welcomed with fragrant rose water, artisanal refreshments, and traditional hors d'oeuvres as they arrive.",
      iconName: "Sparkles",
    },
    {
      id: "event-2",
      title: "Grand Entrance & Reception Stage",
      date: "Tuesday, December 29, 2026",
      time: "8:00 PM – 9:30 PM",
      venue: "Grand Ballroom Stage",
      dressCode: "Traditional / Formal",
      dressCodeNote: "Sherwani, Suit, Lehenga, Sharee",
      description:
        "The celebratory entrance of Sajedul & Sadia, followed by stage felicitations, special blessings, and commemorative family photographs.",
      iconName: "Heart",
    },
    {
      id: "event-3",
      title: "Royal Banquet Dinner & Celebrations",
      date: "Tuesday, December 29, 2026",
      time: "9:30 PM – 11:30 PM",
      venue: "The Phoenix Royal Dining Hall",
      dressCode: "Traditional / Formal",
      dressCodeNote: "Sherwani, Suit, Lehenga, Sharee",
      description:
        "A lavish traditional celebratory feast featuring signature Dhaka Kacchi, roast delicacies, delectable desserts, and sweet memories.",
      iconName: "Wine",
    },
  ] as ScheduleEvent[],
  venue: {
    name: "Phoenix Convention Hall",
    address: "Tejgaon, Dhaka, Bangladesh",
    note: "Dedicated parking and valet assistance available on-site. Conveniently accessible from Gulshan, Mohakhali, and Airport Road.",
    mapsQueryUrl: "https://maps.google.com/?q=Phoenix+Convention+Hall+Tejgaon+Dhaka+Bangladesh",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.412497046048!2d90.38883637127117!3d23.75258957867258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8983f79fa27%3A0xed092f3972f56736!2sTejgaon%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1711000000000!5m2!1sen!2sbd",
  },
  gallery: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
      caption: "A joyful union illuminated by golden warmth",
      aspect: "4/5",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
      caption: "Cherished smiles and heartfelt moments",
      aspect: "square",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
      caption: "Intricate details and traditional gold accents",
      aspect: "square",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85",
      caption: "Walking hand-in-hand into a blessed future",
      aspect: "4/5",
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85",
      caption: "Pure joy, blessings, and lifelong promises",
      aspect: "4/5",
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85",
      caption: "Evening splendor and eternal serenity",
      aspect: "square",
    },
  ] as GalleryPhoto[],
  initialWishes: [
    {
      id: "wish-1",
      name: "Tanvir & Farhana Ahmed",
      message:
        "Heartiest congratulations to Sajedul and Sadia! May Allah bless your union with endless peace, love, and happiness. Looking forward to the grand evening!",
      timestamp: "2 hours ago",
      attending: true,
    },
    {
      id: "wish-2",
      name: "Uncle Rafiqul Islam",
      message:
        "SubhanAllah, so delighted for you both! Sajedul, may your new journey be filled with barakah, joy, and prosperity. Lots of du’a and love.",
      timestamp: "Yesterday",
      attending: true,
    },
    {
      id: "wish-3",
      name: "Dr. Mahfuz & Family",
      message:
        "Sending our warmest blessings to both families on this joyous milestone. InshaAllah we will be there to celebrate with you at Phoenix Convention Hall!",
      timestamp: "2 days ago",
      attending: true,
    },
    {
      id: "wish-4",
      name: "Tasnim & Nabil",
      message:
        "Dearest Sadia and Sajedul bhai, wishing you a wonderful lifetime of togetherness and laughter. Heartfelt congratulations!",
      timestamp: "3 days ago",
      attending: true,
    },
  ] as Wish[],
};
