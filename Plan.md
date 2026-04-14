Alright Dhairya — I’ll give you a complete step-by-step build guide with logic + architecture, so you can implement the whole working system without guessing. The goal is a fast MVP universal clipboard using Next.js + Convex.

I’ll keep it simple, production-ready, and minimal (no auth, single page, auto session).

⸻

SyncClip — Full Working Logic Guide

1. Overall System Flow

User journey:

User opens site
      ↓
Check URL for session code
      ↓
If no code → create session
      ↓
Redirect to /sessionCode
      ↓
Load session from database
      ↓
Render textbox
      ↓
User edits text
      ↓
Update Convex
      ↓
Convex pushes realtime update
      ↓
All connected clients update instantly

This is the entire logic of the app.

⸻

2. Project Structure

Example structure:

syncclip
│
├── app
│   ├── page.tsx
│   └── [code]
│       └── page.tsx
│
├── convex
│   ├── schema.ts
│   └── sessions.ts
│
├── components
│   └── ClipboardEditor.tsx
│
├── utils
│   └── debounce.ts


⸻

3. Convex Setup

Install Convex:

npm install convex
npx convex dev

This creates:

convex/


⸻

4. Database Schema

File:

convex/schema.ts

import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  sessions: defineTable({
    code: v.string(),
    text: v.string(),
    createdAt: v.number()
  })
})

Each session stores one text document.

⸻

5. Backend Functions

File:

convex/sessions.ts

Create Session

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

function generateCode() {
  return Math.random().toString(36).slice(2,8)
}

export const createSession = mutation({
  handler: async (ctx) => {

    const code = generateCode()

    await ctx.db.insert("sessions", {
      code,
      text: "",
      createdAt: Date.now()
    })

    return code
  }
})


⸻

Get Session

export const getSession = query({
  args: { code: v.string() },

  handler: async (ctx, args) => {

    return await ctx.db
      .query("sessions")
      .filter(q => q.eq(q.field("code"), args.code))
      .first()
  }
})


⸻

Update Text

export const updateText = mutation({
  args: {
    id: v.id("sessions"),
    text: v.string()
  },

  handler: async (ctx, args) => {

    await ctx.db.patch(args.id, {
      text: args.text
    })
  }
})

This mutation triggers realtime updates automatically.

⸻

6. Root Page Logic

File:

app/page.tsx

Purpose:

• create session
• redirect user

"use client"

import { useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "../convex/_generated/api"
import { useRouter } from "next/navigation"

export default function Home() {

  const createSession = useMutation(api.sessions.createSession)
  const router = useRouter()

  useEffect(() => {

    async function init() {
      const code = await createSession()
      router.push(`/${code}`)
    }

    init()

  }, [])

  return <div>Creating clipboard session...</div>
}

So opening:

syncclip.app

automatically creates:

syncclip.app/abc123


⸻

7. Session Page

File:

app/[code]/page.tsx

"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import ClipboardEditor from "../../components/ClipboardEditor"

export default function Page() {

  const params = useParams()
  const code = params.code as string

  const session = useQuery(api.sessions.getSession, { code })

  if (!session) return <div>Loading...</div>

  return (
    <ClipboardEditor session={session}/>
  )
}


⸻

8. Clipboard Editor Component

File:

components/ClipboardEditor.tsx

Core logic:

"use client"

import { useMutation } from "convex/react"
import { api } from "../convex/_generated/api"
import { useState, useEffect } from "react"

export default function ClipboardEditor({ session }) {

  const update = useMutation(api.sessions.updateText)

  const [text, setText] = useState(session.text)

  useEffect(() => {
    setText(session.text)
  }, [session.text])

  function handleChange(e) {

    const value = e.target.value
    setText(value)

    update({
      id: session._id,
      text: value
    })
  }

  function copyText() {
    navigator.clipboard.writeText(text)
  }

  function clearText() {

    setText("")

    update({
      id: session._id,
      text: ""
    })
  }

  return (
    <div className="p-10">

      <div className="flex gap-4 mb-4">

        <button onClick={copyText}>Copy</button>

        <button onClick={clearText}>Clear</button>

      </div>

      <textarea
        value={text}
        onChange={handleChange}
        className="w-full h-96 border p-4"
      />

    </div>
  )
}


⸻

9. Real-Time Sync Mechanism

Convex handles this automatically.

Flow:

User A types
      ↓
updateText mutation
      ↓
Convex database updated
      ↓
Query subscriptions triggered
      ↓
User B receives updated text

No WebSockets needed.

⸻

10. Performance Improvement (Important)

Typing sends many requests.

Add debounce.

Example:

utils/debounce.ts

export function debounce(fn, delay) {

  let timer

  return (...args) => {

    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

Then call:

updateText every 200ms

instead of every keystroke.

⸻

11. Share Link Feature

Add button:

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
}

UI:

Session: ABC123   [Copy Link]


⸻

12. Session Code Generation

Current:

Math.random().toString(36).slice(2,8)

Example:

a8f29c
k29f0d
9z02da

This gives:

36^6 = 2B combinations

Enough for this project.

⸻

13. Session Expiration (Optional Later)

You can delete old sessions:

Example rule:

delete after 24 hours

Cron function in Convex.

⸻

14. Deployment

Frontend:

Vercel

Backend:

Convex Cloud

Steps:

npx convex deploy

Add env variables in Vercel.

⸻

15. Final App Behavior

Example usage:

Laptop

Open

syncclip.app

Session created.

syncclip.app/ab92kd


⸻

Phone

Open same link.

Now both share the same clipboard.

Type on phone → appears on laptop instantly.

⸻

16. Possible Improvements Later

If you want to turn it into a serious product:

Clipboard history

store last 20 entries

⸻

Markdown mode

preview formatted text

⸻

End-to-end encryption

private sessions

⸻

Multi-cursor editing

like Google Docs

⸻

File sharing

drag and drop files

⸻

Final Result

You will get a fast universal clipboard tool with:

• zero login
• instant sessions
• realtime sync
• simple UI
• shareable links

Very aligned with TheDreamBitLabs philosophy of minimal useful tools.

⸻

If you want, I can also show you 3 extremely important improvements that will make this 10x better than most clipboard tools:

1️⃣ How to avoid cursor jumping (major realtime editor issue)
2️⃣ How to make sync feel instant even with slow networks
3️⃣ How to make sessions work like WhatsApp Web (device pairing)

These are small changes but huge UX upgrades.