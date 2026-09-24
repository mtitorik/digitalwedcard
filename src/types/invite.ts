/**
 * Standardized Wedding Invitation Data Schema & Types
 * Defines interfaces for invitation details, events, RSVP, multimedia, and template configurations.
 */

export interface WeddingEvent {
  title: string;
  time: string;
  date: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  description?: string;
  dressCode?: string;
}

export interface RsvpConfig {
  enabled: boolean;
  deadline: string;
  contactNumber: string;
  formUrl?: string;
  contactPerson?: string;
  guestCountOptions?: number[];
}

export interface AudioConfig {
  enabled: boolean;
  trackUrl: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
}

export interface WeddingStoryItem {
  year?: string;
  date?: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface WeddingInviteData {
  id?: string;
  templateId?: string;
  groomName: string;
  brideName: string;
  groomTitle?: string;
  brideTitle?: string;
  parentsGroom: string;
  parentsBride: string;
  weddingDate: string;
  countdownTarget: string; // ISO-8601 or date parseable string e.g. "2026-11-28T18:00:00+06:00"
  events: WeddingEvent[];
  gallery: string[];
  rsvp: RsvpConfig;
  audio: AudioConfig;
  tagline?: string;
  hashtag?: string;
  greetingVerse?: string;
  loveStory?: WeddingStoryItem[];
  dressCodeDetails?: string;
}

export interface TemplatePalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
  cardBg?: string;
}

export type TemplateCategory =
  | "Nikah"
  | "Traditional"
  | "Modern"
  | "Minimal"
  | "Floral";

export interface TemplateManifestItem {
  id: string; // e.g. "template-01"
  title: string;
  originalPreviewUrl: string;
  category: TemplateCategory | string;
  palette: TemplatePalette;
  keyMotifs: string[];
  thumbnailUrl?: string;
  productUrl?: string;
  tags?: string[];
  description?: string;
}
