import type { Metadata } from "next";
import HomeClient from "../../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "Android to PC Clipboard — Share Text & Links Instantly",
  description: "Need to copy text from Android to PC? SyncClip's online clipboard syncs text instantly between your Android phone and Windows computer in 1 click. Zero apps, no signup.",
  alternates: {
    canonical: "https://syncclip.in/android-to-pc-clipboard",
  },
};

export default function AndroidToPC() {
  return (
    <HomeClient
      defaultTypewriter="Paste a URL or a 2FA OTP code on your Android. Watch it appear on your Windows PC in 50ms..."
      defaultH1={
        <>
          ANDROID_
          <br />
          TO PC_
        </>
      }
      defaultSubH1="CLIPBOARD SYNC."
      isAndroidToPC={true}
    />
  );
}
