import { PrismaClient, Role, InvitationStatus, AttendanceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Digital Wedding Invitation database...");

  // 1. Create Users
  const adminPasswordHash = await bcrypt.hash("Admin123456!", 10);
  const torikulPasswordHash = await bcrypt.hash("O16268485o6@", 10);
  const userPasswordHash = await bcrypt.hash("User123456!", 10);

  const torikulAdmin = await prisma.user.upsert({
    where: { email: "torikul0598@gmail.com" },
    update: {
      passwordHash: torikulPasswordHash,
      role: Role.ADMIN,
      name: "Torikul Islam",
    },
    create: {
      email: "torikul0598@gmail.com",
      name: "Torikul Islam",
      passwordHash: torikulPasswordHash,
      role: Role.ADMIN,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@wedding.com" },
    update: {
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      name: "Victoria Sterling",
    },
    create: {
      email: "admin@wedding.com",
      name: "Victoria Sterling",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
    },
  });

  const coupleUser = await prisma.user.upsert({
    where: { email: "sarah.alex@example.com" },
    update: {
      passwordHash: userPasswordHash,
      role: Role.USER,
      name: "Sarah & Alexander",
    },
    create: {
      email: "sarah.alex@example.com",
      name: "Sarah Jenkins",
      passwordHash: userPasswordHash,
      role: Role.USER,
    },
  });

  const coupleUser2 = await prisma.user.upsert({
    where: { email: "elena.mateo@example.com" },
    update: {
      passwordHash: userPasswordHash,
      role: Role.USER,
      name: "Elena Rostova",
    },
    create: {
      email: "elena.mateo@example.com",
      name: "Elena Rostova",
      passwordHash: userPasswordHash,
      role: Role.USER,
    },
  });

  console.log("👤 Users seeded:", { admin: adminUser.email, user1: coupleUser.email, user2: coupleUser2.email });

  // 2. Create Design Templates
  const template1 = await prisma.template.upsert({
    where: { slug: "royal-botanical" },
    update: {},
    create: {
      name: "Royal Botanical Garden",
      slug: "royal-botanical",
      thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      description: "Lush botanical florals with delicate emerald foliage, gold leaf accents, and classic editorial typography.",
      price: 0.0,
      isPremium: false,
      isActive: true,
      defaultConfig: {
        fontFamily: "serif",
        primaryColor: "#064e3b",
        accentColor: "#d97706",
        preset: "botanical",
      },
    },
  });

  const template2 = await prisma.template.upsert({
    where: { slug: "modern-arch" },
    update: {},
    create: {
      name: "Modern Minimalist Arch",
      slug: "modern-arch",
      thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
      description: "Clean architectural curves, warm terracotta hues, subtle noise grain, and modern sans typography for contemporary couples.",
      price: 29.0,
      isPremium: true,
      isActive: true,
      defaultConfig: {
        fontFamily: "sans",
        primaryColor: "#7c2d12",
        accentColor: "#e07a5f",
        preset: "minimalist",
      },
    },
  });

  const template3 = await prisma.template.upsert({
    where: { slug: "golden-sunset" },
    update: {},
    create: {
      name: "Ethereal Golden Sunset",
      slug: "golden-sunset",
      thumbnailUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      description: "Warm golden-hour ambient aesthetic with romantic script details, champagne highlights, and luxury deckled edges.",
      price: 39.0,
      isPremium: true,
      isActive: true,
      defaultConfig: {
        fontFamily: "serif",
        primaryColor: "#78350f",
        accentColor: "#b45309",
        preset: "luxury",
      },
    },
  });

  const template4 = await prisma.template.upsert({
    where: { slug: "tuscan-vineyard" },
    update: {},
    create: {
      name: "Tuscan Vineyard Romance",
      slug: "tuscan-vineyard",
      thumbnailUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80",
      description: "Rustic Italian countryside romance with olive branch motifs, aged parchment textures, and wine-country elegance.",
      price: 0.0,
      isPremium: false,
      isActive: true,
      defaultConfig: {
        fontFamily: "serif",
        primaryColor: "#365314",
        accentColor: "#881337",
        preset: "vintage",
      },
    },
  });

  console.log("🎨 Design Templates seeded:", [template1.name, template2.name, template3.name, template4.name]);

  // 3. Create Invitations
  const invite1 = await prisma.invitation.upsert({
    where: { slug: "sarah-alexander" },
    update: {},
    create: {
      userId: coupleUser.id,
      templateId: template1.id,
      slug: "sarah-alexander",
      status: InvitationStatus.PUBLISHED,
      isPasswordProtected: false,
      groomName: "Alexander Vance",
      brideName: "Sarah Jenkins",
      coupleStory: "We met on a rainy autumn afternoon at a coffee shop in Greenwich Village. Seven years, countless journeys across 14 countries, and an unforgettable proposal under the Amalfi Coast cliffs later, we are overjoyed to begin our next chapter together surrounded by the people who mean the world to us.",
      coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85",
      galleryImages: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80",
      ],
      backgroundMusicUrl: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
      fontFamily: "serif",
      primaryColor: "#064e3b",
      accentColor: "#d97706",
      viewCount: 238,
      schedules: {
        create: [
          {
            title: "Welcome Drinks & Mehendi",
            date: new Date("2026-11-14T17:00:00Z"),
            startTime: "5:00 PM",
            endTime: "8:30 PM",
            venueName: "The Glass Greenhouse Conservatory",
            address: "450 Botanical Way, Brooklyn, NY 11225",
            googleMapsUrl: "https://maps.google.com/?q=Brooklyn+Botanic+Garden",
            latitude: 40.6675,
            longitude: -73.9632,
            order: 1,
          },
          {
            title: "Holy Matrimony & Ceremony",
            date: new Date("2026-11-15T15:00:00Z"),
            startTime: "3:00 PM",
            endTime: "4:30 PM",
            venueName: "St. Thomas Cathedral Amphitheater",
            address: "1 West 53rd St, New York, NY 10019",
            googleMapsUrl: "https://maps.google.com/?q=St+Thomas+Church+NYC",
            latitude: 40.7607,
            longitude: -73.9763,
            order: 2,
          },
          {
            title: "Grand Reception & Dinner Gala",
            date: new Date("2026-11-15T18:00:00Z"),
            startTime: "6:00 PM",
            endTime: "11:30 PM",
            venueName: "The Harold Pratt House Ballroom",
            address: "58 E 68th St, New York, NY 10065",
            googleMapsUrl: "https://maps.google.com/?q=Harold+Pratt+House",
            latitude: 40.7689,
            longitude: -73.9664,
            order: 3,
          },
        ],
      },
      rsvps: {
        create: [
          {
            guestName: "Emily Davis & Julian Rivera",
            guestEmail: "emily.d@example.com",
            guestPhone: "+1 (555) 234-5678",
            attendance: AttendanceStatus.ATTENDING,
            additionalGuestsCount: 1,
            message: "We wouldn't miss this for the world! So excited to dance the night away with you both!",
          },
          {
            guestName: "Marcus Sterling",
            guestEmail: "marcus.s@example.com",
            guestPhone: "+1 (555) 345-6789",
            attendance: AttendanceStatus.ATTENDING,
            additionalGuestsCount: 0,
            message: "Congratulations Alex & Sarah! Toasting to your forever love.",
          },
          {
            guestName: "Olivia & Liam Chen",
            guestEmail: "olivia.chen@example.com",
            guestPhone: "+1 (555) 876-5432",
            attendance: AttendanceStatus.ATTENDING,
            additionalGuestsCount: 2,
            message: "The Chen family is thrilled to celebrate your special day!",
          },
          {
            guestName: "David K. Wilson",
            guestEmail: "david.wilson@example.com",
            attendance: AttendanceStatus.TENTATIVE,
            additionalGuestsCount: 1,
            message: "Awaiting confirmation on my flight schedule from London. Keeping fingers crossed!",
          },
          {
            guestName: "Dr. Catherine Hayes",
            guestEmail: "catherine.hayes@example.com",
            attendance: AttendanceStatus.DECLINED,
            additionalGuestsCount: 0,
            message: "Sending all my love and blessings from Seattle. Wish I could be there in person!",
          },
        ],
      },
    },
  });

  const invite2 = await prisma.invitation.upsert({
    where: { slug: "elena-mateo" },
    update: {},
    create: {
      userId: coupleUser2.id,
      templateId: template2.id,
      slug: "elena-mateo",
      status: InvitationStatus.PUBLISHED,
      isPasswordProtected: true,
      passcode: "LOVE2026",
      groomName: "Mateo Silva",
      brideName: "Elena Rostova",
      coupleStory: "From college sweethearts in Madrid to building a quiet sanctuary together in the hills, our journey has been guided by shared dreams, art, and quiet morning coffees.",
      coverImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=85",
      galleryImages: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      ],
      backgroundMusicUrl: null,
      fontFamily: "sans",
      primaryColor: "#7c2d12",
      accentColor: "#e07a5f",
      viewCount: 114,
      schedules: {
        create: [
          {
            title: "Private Sunset Vows",
            date: new Date("2026-12-05T16:00:00Z"),
            startTime: "4:00 PM",
            endTime: "5:30 PM",
            venueName: "Villa Monticello Terraces",
            address: "Highway 101, Big Sur, CA 93920",
            googleMapsUrl: "https://maps.google.com/?q=Big+Sur+California",
            latitude: 36.2704,
            longitude: -121.8081,
            order: 1,
          },
          {
            title: "Candlelit Reception & Acoustic Set",
            date: new Date("2026-12-05T18:00:00Z"),
            startTime: "6:00 PM",
            endTime: "11:00 PM",
            venueName: "The Old Mill Courtyard",
            address: "Highway 101, Big Sur, CA 93920",
            googleMapsUrl: "https://maps.google.com/?q=Big+Sur+California",
            latitude: 36.2704,
            longitude: -121.8081,
            order: 2,
          },
        ],
      },
      rsvps: {
        create: [
          {
            guestName: "Sofia Alvarez",
            guestEmail: "sofia.a@example.com",
            attendance: AttendanceStatus.ATTENDING,
            additionalGuestsCount: 1,
            message: "Felicidades! We can't wait to see you both in California!",
          },
        ],
      },
    },
  });

  const invite3 = await prisma.invitation.upsert({
    where: { slug: "chloe-liam" },
    update: {},
    create: {
      userId: coupleUser.id,
      templateId: template3.id,
      slug: "chloe-liam",
      status: InvitationStatus.DRAFT,
      isPasswordProtected: false,
      groomName: "Liam O'Connor",
      brideName: "Chloe Dupont",
      coupleStory: "Planning our dream celebration in late 2027.",
      coverImageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85",
      galleryImages: [],
      backgroundMusicUrl: null,
      fontFamily: "serif",
      primaryColor: "#78350f",
      accentColor: "#b45309",
      viewCount: 18,
    },
  });

  console.log("💌 Invitations seeded:", [invite1.slug, invite2.slug, invite3.slug]);
  console.log("✅ Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
