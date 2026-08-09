export interface FormQuestion {
  id: string;
  label: string;
  type: "select" | "scale" | "text" | "textarea" | "tags";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
}

export interface FormConfig {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  questions: FormQuestion[];
}

export const FORMS_REGISTRY: Record<string, FormConfig> = {
  "feature-request": {
    id: "feature-request",
    title: "Help Us Build the Future of SyncClip",
    subtitle:
      "Every submission is read directly by the founder. Tell us what we should build for you next!",
    badge: "50+ COMMUNITY IDEAS SHIPPED. SOME IN UNDER 48 HOURS.",
    questions: [
      {
        id: "overall_rating",
        label: "How has your experience with SyncClip been so far?",
        type: "scale",
        required: true,
        description: "0 = Needs a lot of work, 10 = Absolutely love it!",
      },
      {
        id: "use_case",
        label: "What were you trying to do today?",
        type: "select",
        required: false,
        options: [
          "Copy text between Phone & PC",
          "Share text with someone else",
          "Transfer code snippet",
          "Move 2FA / OTP code",
          "Paste on another device",
          "Something else",
        ],
      },
      {
        id: "solved_intent",
        label: "Did SyncClip solve what you came here to do?",
        type: "select",
        required: false,
        options: [
          "Yes, completely!",
          "Partially",
          "No",
        ],
      },
      {
        id: "referral_source",
        label: "How did you find out about SyncClip?",
        type: "select",
        required: false,
        options: [
          "ChatGPT / Perplexity / Gemini",
          "Google Search",
          "Reddit",
          "ProductHunt",
          "Twitter / X",
          "LinkedIn",
          "YouTube",
          "Friend or Colleague",
          "Other",
        ],
      },
      {
        id: "category",
        label: "What is your idea or report about?",
        type: "select",
        required: false,
        options: [
          "🐛 Bug Fix",
          "✨ New Feature",
          "⚡ Performance / Latency",
          "📱 Mobile UX",
          "💻 Desktop App",
          "🎨 Design / UI",
          "🔒 Privacy / Security",
          "🔄 Sync Issues",
          "🌐 Browser Extension",
          "Other",
        ],
      },
      {
        id: "feature_request",
        label: "If SyncClip could do ONE more thing for you, what would it be?",
        type: "textarea",
        required: true,
        placeholder: "Tell us the single feature or fix that would make SyncClip 10x better for you...",
        description: "Be as specific as you'd like — every idea is evaluated directly by the founder!",
      },
      {
        id: "contact_email",
        label: "Want us to reply personally when this is shipped or fixed?",
        type: "text",
        required: false,
        placeholder: "you@example.com",
        description: "Optional — We'll email you directly as soon as your request goes live.",
      },
    ],
  },
  "clipboard-feedback": {
    id: "clipboard-feedback",
    title: "Help Us Friction-Proof SyncClip",
    subtitle: "Tell us what frustrated you or almost made you leave today.",
    badge: "PRODUCT FEEDBACK // FRICTION HUNTER",
    questions: [
      {
        id: "overall_rating",
        label: "How has your experience with SyncClip been so far?",
        type: "scale",
        required: true,
        description: "0 = Needs work, 10 = Love it!",
      },
      {
        id: "use_case",
        label: "What were you trying to do today?",
        type: "select",
        required: false,
        options: [
          "Copy text between Phone & PC",
          "Share text with someone else",
          "Transfer code snippet",
          "Move 2FA / OTP code",
          "Paste on another device",
          "Something else",
        ],
      },
      {
        id: "solved_intent",
        label: "Did SyncClip solve what you came here to do?",
        type: "select",
        required: false,
        options: [
          "Yes, completely!",
          "Partially",
          "No",
        ],
      },
      {
        id: "referral_source",
        label: "How did you find out about SyncClip?",
        type: "select",
        required: false,
        options: [
          "ChatGPT / Perplexity / Gemini",
          "Google Search",
          "Reddit",
          "ProductHunt",
          "Twitter / X",
          "LinkedIn",
          "YouTube",
          "Friend or Colleague",
          "Other",
        ],
      },
      {
        id: "category",
        label: "What area had the most friction?",
        type: "select",
        required: false,
        options: [
          "🐛 Bug Encountered",
          "🔄 Sync Delay / Lag",
          "📱 Mobile Interface",
          "💻 Desktop Interface",
          "🎨 Layout / UX Confusing",
          "🔒 Privacy Concerns",
          "Other",
        ],
      },
      {
        id: "friction",
        label: "What frustrated you or almost made you leave SyncClip today?",
        type: "textarea",
        required: true,
        placeholder: "Tell us what broke your flow or felt annoying...",
        description: "Negative friction is what we fix first. Don't hold back!",
      },
      {
        id: "contact_email",
        label: "Want us to reply personally when this is fixed?",
        type: "text",
        required: false,
        placeholder: "you@example.com",
        description: "Optional — Get a direct email from the founder when your issue is resolved.",
      },
    ],
  },
};
