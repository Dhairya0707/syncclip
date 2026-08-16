import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Support & Help Center",
  description: "Get help with SyncClip, report issues, or suggest new features for our real-time clipboard sync protocol.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
