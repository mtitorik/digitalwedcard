import { WeddingInviteData } from "@/types/invite";

export const MOCK_INVITE_DATA: WeddingInviteData = {
  id: "invite-rayhan-tahmina-2026",
  templateId: "template-01",
  groomName: "Syed Rayhan Ahmed",
  brideName: "Dr. Tahmina Sultana",
  groomTitle: "BSc in Software Engineering, Senior Tech Consultant",
  brideTitle: "MBBS, FCPS Resident Physician",
  parentsGroom: "Mr. Syed Faruk Ahmed & Mrs. Rehana Akter",
  parentsBride: "Prof. Mahbubur Rahman & Mrs. Bilkis Banu",
  weddingDate: "November 28, 2026",
  countdownTarget: "2026-11-28T18:00:00+06:00",
  tagline: "Two souls, two families, united in love and faith under divine grace.",
  hashtag: "#RayhanWedsTahmina",
  greetingVerse:
    "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.",
  events: [
    {
      title: "Gaye Holud & Sangeet Night",
      time: "06:30 PM - 10:30 PM",
      date: "Thursday, November 26, 2026",
      venueName: "The Grand Ballroom, Radisson Blu Water Garden",
      address: "Airport Road, Dhaka Cantonment, Dhaka 1206",
      mapsUrl: "https://maps.google.com/?q=Radisson+Blu+Dhaka+Water+Garden",
      description: "An evening of vibrant colors, joyous dance performances, traditional turmeric blessings, and delectable street delicacies.",
      dressCode: "Festive Yellows, Vibrant Marigolds & Mustard Silk"
    },
    {
      title: "Auspicious Nikah Ceremony",
      time: "05:00 PM - 07:00 PM",
      date: "Friday, November 27, 2026",
      venueName: "Gulshan Club Lawn & Banquet Pavilion",
      address: "Community Rd, Gulshan-2, Dhaka 1212",
      mapsUrl: "https://maps.google.com/?q=Gulshan+Club+Dhaka",
      description: "Solemnization of marriage vows amidst close family, sacred prayers, and timeless traditions.",
      dressCode: "Traditional Panjabi, Sherwani & Pastel Georgette Sarees"
    },
    {
      title: "Grand Wedding Banquet & Reception",
      time: "07:30 PM - 11:30 PM",
      date: "Saturday, November 28, 2026",
      venueName: "Imperial Hall, Le Méridien Dhaka",
      address: "79/A Commercial Area, Airport Road, Nikunja 2, Dhaka 1229",
      mapsUrl: "https://maps.google.com/?q=Le+Meridien+Dhaka",
      description: "Celebrate our union with royal cuisine, musical melodies, photo sessions, and joyful memory making.",
      dressCode: "Formal Regal Evening Attire / Black Tie Optional"
    },
    {
      title: "Royal Walima Dinner",
      time: "07:00 PM - 11:00 PM",
      date: "Sunday, November 29, 2026",
      venueName: "Senakunja Auditorium",
      address: "Dhaka Cantonment, Dhaka 1206",
      mapsUrl: "https://maps.google.com/?q=Senakunja+Dhaka+Cantonment",
      description: "The groom's family cordially welcomes you for a memorable evening of gratitude, feast, and celebration.",
      dressCode: "Elegant Traditional Formals / Sherwani & Jamdani"
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
  ],
  rsvp: {
    enabled: true,
    deadline: "November 15, 2026",
    contactNumber: "+880 1712-345678",
    formUrl: "https://forms.gle/sample-wedding-rsvp",
    contactPerson: "Mr. Tanvir Ahmed (Groom's Brother) / Ms. Nabila Rahman (Bride's Sister)",
    guestCountOptions: [1, 2, 3, 4, 5]
  },
  audio: {
    enabled: true,
    trackUrl: "https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-1191.mp3",
    title: "Celestial Harmony (Wedding Harp & Flute)",
    artist: "Royal Chamber Symphony",
    autoPlay: false
  },
  loveStory: [
    {
      year: "2021",
      title: "When Stars Aligned",
      description: "A chance meeting at an international youth leadership conference in Chittagong sparked a conversation that never truly ended."
    },
    {
      year: "2023",
      title: "The Sunset Promise",
      description: "Amidst gentle sea breezes on Cox's Bazar shores, Rayhan asked the question that made both their hearts flutter forever."
    },
    {
      year: "2026",
      title: "Beginning of Eternity",
      description: "Surrounded by our families and dearest friends, we embark on this sacred journey of partnership, friendship, and eternal devotion."
    }
  ],
  dressCodeDetails: "We encourage our guests to dress in celebratory festive attire. Traditional jewel tones, elegant pastels, and regal sherwanis/sarees are especially cherished."
};
