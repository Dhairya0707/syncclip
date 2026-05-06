# SyncClip — Rotating Headlines + CTAs (Complete Copy)

## Format Structure

Each "block" is:

- **Line 1**: Main hook/roast (attention grab)
- **Line 2**: CTA direction (what to do)
- **Line 3**: Brand prompt/urgency (why now)

Separated by `\n\n` (double line break) in the component.

---

## Block 1

**Hook:**
WhatsApp is crying. Your clipboard just woke up.

**CTA:**
Scan the QR on your phone.

**Brand Prompt:**
No app. No login. Just magic.

---

## Block 2

**Hook:**
AirDrop who? 👀

**CTA:**
Your phone is in your hand. Join this room.

**Brand Prompt:**
Instant sync. Zero friction.

---

## Block 3

**Hook:**
Email to yourself? Nah.

**CTA:**
Scan the QR instead.

**Brand Prompt:**
Way cooler. Way faster.

---

## Block 4

**Hook:**
2 devices, 1 room, infinite regret you didn't try this sooner.

**CTA:**
Go ahead. Grab your phone.

**Brand Prompt:**
The clipboard tool you've been waiting for.

---

## Block 5

**Hook:**
Your phone is literally right there.

**CTA:**
Scan the QR. Don't be shy.

**Brand Prompt:**
Open it on another device. Feel the magic.

---

## Block 6

**Hook:**
This room self-destructs in 24h.

**CTA:**
Clock is ticking. Grab your phone and join.

**Brand Prompt:**
Sessions that vanish. Data that stays safe.

---

## TypeScript Implementation

```typescript
// lib/headlines.ts

export const ROTATING_COPY = [
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
] as const;

export interface CopyBlock {
  hook: string;
  cta: string;
  brandPrompt: string;
}

/**
 * Returns a random copy block (hook + CTA + brand prompt).
 */
export const getRandomCopyBlock = (): CopyBlock => {
  const randomIndex = Math.floor(Math.random() * ROTATING_COPY.length);
  return ROTATING_COPY[randomIndex];
};
```

---

## Component Usage Example

```typescript
// In ClipboardEditor.tsx (or wherever you show the post-creation message)

import { getRandomCopyBlock } from '@/lib/headlines';
import { isExperimentEnabled } from '@/config/experiments';

export default function ClipboardEditor({ session }) {
  const [copyBlock, setCopyBlock] = useState<CopyBlock | null>(null);

  useEffect(() => {
    if (isExperimentEnabled('ROTATING_HEADLINES_ENABLED')) {
      setCopyBlock(getRandomCopyBlock());
    }
  }, [session?.code]); // Re-randomize on each new room

  if (!copyBlock) {
    return null;
  }

  return (
    <div className="room-creation-message">
      {/* Hook - Main attention grab */}
      <h2 className="text-xl font-bold text-zinc-900">
        {copyBlock.hook}
      </h2>

      {/* Blank line */}
      <div className="h-4" />

      {/* CTA - Direction */}
      <p className="text-lg font-semibold text-blue-600">
        {copyBlock.cta}
      </p>

      {/* Blank line */}
      <div className="h-4" />

      {/* Brand Prompt - Reassurance/urgency */}
      <p className="text-sm text-zinc-500">
        {copyBlock.brandPrompt}
      </p>
    </div>
  );
}
```

---

## Visual Rendering Example

When a user creates a room, they'll see:

```
WhatsApp is crying. Your clipboard just woke up.

Scan the QR on your phone.

No app. No login. Just magic.
```

Then on the next room creation (if they create another):

```
AirDrop who? 👀

Your phone is in your hand. Join this room.

Instant sync. Zero friction.
```

And so on, rotating through all 6 blocks.

---

## Copy Tone Notes

- **Hook**: Roast format, attention-grabbing, mentions competitor or frustration
- **CTA**: Direct, action-oriented ("Scan", "Join", "Grab"), tells user what to do right now
- **Brand Prompt**: Short, reassuring, highlights SyncClip's value prop (no app, instant, safe, etc.)

This structure keeps the message scannable (3 short bursts) while embedding the full story (hook → action → benefit).
