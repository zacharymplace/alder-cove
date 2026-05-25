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
      "font-serif text-[1.08rem] font-semibold tracking-[0.015em] text-neutral-950/95 [word-spacing:0.08em]",
    containerClass:
      "rotate-[-1.2deg] origin-left",
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
      "font-sans text-[0.95rem] font-bold tracking-[0.03em] text-neutral-950/85 [word-spacing:-0.03em]",
    containerClass:
      "rotate-[1.8deg] origin-left",
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
      "font-serif text-[0.9rem] tracking-[0.055em] text-neutral-900/65 italic [word-spacing:0.16em]",
    containerClass:
      "rotate-[-0.15deg] origin-left",
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
      "font-sans text-[0.78rem] font-black uppercase tracking-[0.14em] text-neutral-950/80",
    containerClass:
      "rotate-[2.4deg] origin-left",
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
      "font-serif text-[0.88rem] tracking-[0.08em] text-neutral-900/55 [word-spacing:0.2em]",
    containerClass:
      "rotate-[0.4deg] origin-left opacity-85",
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
      "font-serif text-[0.86rem] tracking-[0.1em] text-neutral-900/45 italic blur-[0.15px] [word-spacing:0.22em]",
    containerClass:
      "rotate-[-1.4deg] origin-left opacity-75",
    emotionalBehavior: "reconstructed",
    characteristics: [
      "uncertain pressure",
      "recreated from fragments",
      "visibly unstable certainty",
    ],
  },
};
