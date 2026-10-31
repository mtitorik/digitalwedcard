/**
 * Abstracted Media Storage Utilities
 * Ready for Cloudinary / UploadThing / S3 integration.
 */

export interface UploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export async function validateMediaUrl(url: string): Promise<boolean> {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Curated high-res wedding photo mockups for quick selection
 */
export const SAMPLE_WEDDING_PHOTOS = [
  {
    name: "Classic Botanical Arch",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85",
  },
  {
    name: "Architectural Terracotta Arch",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=85",
  },
  {
    name: "Sunset Meadow Intimacy",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85",
  },
  {
    name: "Italian Tuscan Vineyard",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&auto=format&fit=crop&q=85",
  },
  {
    name: "Candlelit Banquet Celebration",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&auto=format&fit=crop&q=85",
  },
];

/**
 * Ambient audio presets for background ceremony music
 */
export const SAMPLE_AUDIO_TRACKS = [
  {
    name: "Acoustic Canon in D (Strings & Piano)",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3",
  },
  {
    name: "Ethereal Ambient Romance",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-piano-atmosphere-18501.mp3",
  },
  {
    name: "Gentle Rain & Morning Garden",
    url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  },
];

