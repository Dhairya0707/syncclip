import type { Metadata } from "next";
import HomeClient from "../../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "Pastebin Alternative — Private & Ephemeral Text Sharing",
  description: "Looking for a secure, private Pastebin alternative? Share text and code snippets with auto-delete and Burn After Reading mode. Zero logs, no login required.",
  alternates: {
    canonical: "https://syncclip.in/pastebin-alternative-private",
  },
};

export default function PastebinAlternativePrivate() {
  return (
    <HomeClient
      defaultTypewriter="Type a secret key or script block here. Toggle 'Burn after reading'. Share the session link. Destroyed instantly..."
      defaultH1={
        <>
          PASTEBIN_
          <br />
          ALTERNATIVE_
        </>
      }
      defaultSubH1="PRIVATE & EPHEMERAL."
      isPastebin={true}
    />
  );
}
