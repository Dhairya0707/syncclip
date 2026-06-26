/**
 * Structured rotating copy blocks for post-room-creation UX.
 * Follows the "High-Density Editorial Brutalism" hierarchy.
 */

export interface CopyBlock {
  hook: string;
  cta: string;
  brandPrompt: string;
}

export const ROTATING_COPY: CopyBlock[] = [
  {
    hook: "WhatsApp is crying. Your clipboard just woke up.",
    cta: "Scan the QR on your phone.",
    brandPrompt: "No app. No login. Just magic.",
  },
  {
    hook: "AirDrop who? 👀",
    cta: "Your phone is in your hand. Join this room.",
    brandPrompt: "Instant sync. Zero friction.",
  },
  {
    hook: "Email to yourself? Nah.",
    cta: "Scan the QR instead.",
    brandPrompt: "Way cooler. Way faster.",
  },
  {
    hook: "2 devices, 1 room, infinite regret you didn't try this sooner.",
    cta: "Go ahead. Grab your phone.",
    brandPrompt: "The clipboard tool you've been waiting for.",
  },
  {
    hook: "Your phone is literally right there.",
    cta: "Scan the QR. Don't be shy.",
    brandPrompt: "Open it on another device. Feel the magic.",
  },
  {
    hook: "This room self-destructs in 24h.",
    cta: "Clock is ticking. Grab your phone and join.",
    brandPrompt: "Sessions that vanish. Data that stays safe.",
  },
];

/**
 * Returns a random copy block (hook + CTA + brand prompt).
 */
export const getRandomCopyBlock = (): CopyBlock => {
  const randomIndex = Math.floor(Math.random() * ROTATING_COPY.length);
  return ROTATING_COPY[randomIndex];
};
