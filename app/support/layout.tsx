import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Contact | Node Diagnostics",
  description: "Get technical support for SyncClip. Report node connection issues, request features, or learn more about our distributed clipboard security.",
  alternates: {
    canonical: "https://syncclip.in/support",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
