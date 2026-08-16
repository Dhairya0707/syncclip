import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Join Session",
  description: "Enter a session code to join a real-time clipboard sync node.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
