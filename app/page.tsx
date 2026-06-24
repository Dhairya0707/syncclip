import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "SyncClip — Free Online Clipboard (Sync Instantly, No App, No Login)",
  description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux.",
  alternates: {
    canonical: "https://syncclip.in",
  },
};

export default function Home() {
  return <HomeClient />;
}
