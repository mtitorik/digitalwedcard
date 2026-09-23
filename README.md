# 💍 Royal Digital Wedding Invitation Card Platform

A luxury, interactive, mobile-first digital wedding invitation card web application built with Next.js 16 (Turbopack), Tailwind CSS v4, Framer Motion, and MongoDB.

---

## ✨ Features

- **💌 Interactive 3D Envelope**: Realistic folded envelope with royal wax seal, chime sound effects, celebratory confetti burst, and an emerging gold-bordered invitation card.
- **🎨 6 Bespoke Designer Templates & Explore Page**:
  - *Royal Emerald & Gold* (Royal Heritage)
  - *Midnight Velvet & Rose Gold* (Modern Luxury)
  - *Blush Romance & Petal Ivory* (Floral & Romantic)
  - *Sapphire Starlight & Platinum* (Celestial & Regal)
  - *Terracotta Sunset & Amber Glow* (Boho & Earthy)
  - *Marigold Festive & Turmeric Gala* (Festive Holud)
- **📅 Real-Time Countdown**: Live countdown to the wedding celebration with Add-to-Calendar (Google Calendar & Apple/Outlook `.ics` download).
- **🎶 Acoustic Harp & Guitar Music Player**: Floating audio toggle with Web Audio API romantic harp/guitar synthesis fallback.
- **🗺️ Interactive Venue & Directions**: Google Maps integration with 1-click directions.
- **📷 Photo Gallery Carousel**: Touch-swipeable photo gallery with high-res modal viewer.
- **📝 Live RSVP Form**: Joyfully Accept / Regretfully Decline with party size selector, warm wishes/du'a submission, and confetti feedback.
- **📜 Wishes Wall (Guestbook)**: Live wishes wall displaying blessings from family and friends.
- **👑 Master Admin Portal**: Real-time analytics, user management, and platform oversight.
- **🛠️ Creator Dashboard**: Users can create, customize, edit, and preview custom wedding cards.
- **🔄 Universal Pull-to-Refresh**: Native mobile/desktop pull-to-refresh across all pages.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "Wedding invitation card"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Styling**: Tailwind CSS v4 & Vanilla CSS Tokens
- **Animations**: Framer Motion & CSS Animations
- **Icons**: Lucide React
- **Database**: MongoDB (with high-speed in-memory fallback for instant dev/offline testing)
- **Authentication**: JWT with cookie sessions
