import { notFound } from "next/navigation";
import { WeddingCardView } from "@/components/WeddingCardView";
import { getCardBySlug, generateMetadata as generateCardMetadata } from "@/app/card/[slug]/page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  return generateCardMetadata({ params });
}

export default async function InvitePage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  return <WeddingCardView card={card} />;
}
