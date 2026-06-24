import type { Metadata } from "next";
import HomeClient from "../../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "Mac to Windows Clipboard — Sync Clipboard Across OS | SyncClip",
  description: "Copy paste between Mac and Windows easily. SyncClip syncs text, links, and code snippets between macOS and Windows in under 100ms in your browser. No signup.",
  alternates: {
    canonical: "https://syncclip.in/mac-to-windows-clipboard",
  },
};

export default function MacToWindows() {
  return (
    <HomeClient
      defaultTypewriter="Copy a terminal command on your MacBook. Paste it instantly onto your Windows PC..."
      defaultH1={
        <>
          MAC TO_
          <br />
          WINDOWS_
        </>
      }
      defaultSubH1="CROSS-OS SYNC."
      isMacToWindows={true}
    />
  );
}
