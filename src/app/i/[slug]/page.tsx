import { notFound } from "next/navigation";
import { getInvitationBySlug, incrementInvitationViews } from "@/server/actions/invitation.actions";
import { DigitalInvitationView } from "@/components/public/DigitalInvitationView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Wedding Invitation Not Found",
    };
  }

  const couple = `${invitation.brideName} & ${invitation.groomName}`;

  return {
    title: `${couple} | Digital Wedding Invitation`,
    description: invitation.coupleStory || `You are warmly invited to celebrate the wedding of ${couple}.`,
    openGraph: {
      title: `${couple} | Digital Wedding Invitation`,
      description: invitation.coupleStory || `Wedding celebration of ${couple}.`,
      images: [
        {
          url: invitation.coverImageUrl,
          width: 1200,
          height: 630,
          alt: couple,
        },
      ],
    },
  };
}

export default async function PublicInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  // Increment view counter asynchronously
  incrementInvitationViews(slug).catch(() => {});

  return <DigitalInvitationView invitation={invitation} />;
}

