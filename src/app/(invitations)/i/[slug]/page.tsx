import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getInvitationBySlug,
  incrementInvitationViews,
} from "@/server/actions/invitation.actions";
import { VeronaTemplate } from "@/components/templates/verona";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Wedding Invitation Not Found | Digiwedcard",
      description: "The requested digital wedding invitation could not be found.",
    };
  }

  const couple = `${invitation.brideName} & ${invitation.groomName}`;
  const description =
    invitation.coupleStory ||
    `You are cordially invited to celebrate the wedding of ${couple}. Explore the itinerary, photo gallery, and RSVP online.`;

  return {
    title: `${couple} | Digital Wedding Invitation`,
    description,
    openGraph: {
      title: `${couple} | Digital Wedding Celebration`,
      description,
      images: [
        {
          url: invitation.coverImageUrl,
          width: 1200,
          height: 630,
          alt: couple,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${couple} | Wedding Invitation`,
      description,
      images: [invitation.coverImageUrl],
    },
  };
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  // Increment invitation view count asynchronously
  incrementInvitationViews(slug).catch(() => {});

  return <VeronaTemplate invitation={invitation} />;
}

