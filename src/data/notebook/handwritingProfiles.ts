export type HandwritingProfileId =
  | "coauthor"
  | "sibling"
  | "archivist"
  | "skeptic"
  | "copied-town"
  | "reconstructed";

export type HandwritingProfile = {
  id: HandwritingProfileId;
  label: string;

  textClass: string;
  containerClass: string;

  emotionalBehavior:
    | "careful"
    | "hurried"
    | "sarcastic"
    | "softened"
    | "reconstructed"
    | "fatigued";

  characteristics: string[];
};

export const handwritingProfiles: Record<
  HandwritingProfileId,
  HandwritingProfile
> = {
  coauthor: {
    id: "coauthor",
    label: "coauthor hand",
    textClass:
      "font-serif tracking-[0.01em] text-neutral-950/90",
    containerClass:
      "rotate-[-0.6deg]",
    emotionalBehavior: "hurried",
    characteristics: [
      "uneven pressure",
      "emotionally direct",
      "writes quickly during excitement",
    ],
  },

  sibling: {
    id: "sibling",
    label: "sibling hand",
    textClass:
      "font-sans tracking-[0.015em] text-neutral-950/85",
    containerClass:
      "rotate-[1deg]",
    emotionalBehavior: "sarcastic",
    characteristics: [
      "interruptive notes",
      "side commentary",
      "reactive corrections",
    ],
  },

  archivist: {
    id: "archivist",
    label: "archivist reconstruction",
    textClass:
      "font-serif tracking-[0.025em] text-neutral-900/75 italic",
    containerClass:
      "rotate-[-0.2deg]",
    emotionalBehavior: "softened",
    characteristics: [
      "careful wording",
      "emotionally filtered",
      "tries to stabilize meaning",
    ],
  },

  skeptic: {
    id: "skeptic",
    label: "skeptic annotation",
    textClass:
      "font-sans uppercase tracking-[0.08em] text-neutral-950/80",
    containerClass:
      "rotate-[1.6deg]",
    emotionalBehavior: "careful",
    characteristics: [
      "short interruption notes",
      "doubt signaling",
      "reactive pushback",
    ],
  },

  "copied-town": {
    id: "copied-town",
    label: "copied town hand",
    textClass:
      "font-serif tracking-[0.03em] text-neutral-900/65",
    containerClass:
      "rotate-[0.4deg]",
    emotionalBehavior: "softened",
    characteristics: [
      "cleaned-up wording",
      "less emotional precision",
      "copied from memory",
    ],
  },

  reconstructed: {
    id: "reconstructed",
    label: "reconstructed hand",
    textClass:
      "font-serif tracking-[0.04em] text-neutral-900/55 italic",
    containerClass:
      "rotate-[-1deg]",
    emotionalBehavior: "reconstructed",
    characteristics: [
      "uncertain pressure",
      "recreated from fragments",
      "visibly unstable certainty",
    ],
  },
};
