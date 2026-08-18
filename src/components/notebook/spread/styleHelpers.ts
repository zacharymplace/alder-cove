import type { NotebookNote } from "@/data/notebook/notebookOne";

export function spreadShellClass(paperTone?: "aged" | "water-damaged" | "warm") {
  switch (paperTone) {
    case "water-damaged":
      return "bg-[#e2d0a2]";
    case "warm":
      return "bg-[#f0dfad]";
    case "aged":
    default:
      return "bg-[#ecdfb7]";
  }
}

export function spreadResidueClass(residueDensity?: "light" | "heavy" | "soft") {
  switch (residueDensity) {
    case "heavy":
      return "opacity-70";
    case "soft":
      return "opacity-25";
    case "light":
    default:
      return "opacity-40";
  }
}

export function noteClass(variant?: NotebookNote["variant"]) {
  switch (variant) {
    case "founding":
      return "text-4xl font-black uppercase leading-tight";
    case "contradiction":
      return "border border-dashed border-neutral-700/20 bg-white/10";
    case "warning":
      return "border-l-2 border-red-900/50 bg-red-100/20";
    case "map":
      return "border border-blue-900/20 bg-blue-50/20";
    case "symbol":
      return "border border-amber-900/20 bg-amber-50/20";
    case "log":
      return "bg-white/20";
    default:
      return "italic";
  }
}

export function handwritingClass(handwriting?: NotebookNote["handwriting"]) {
  switch (handwriting) {
    case "coauthor":
      return "tracking-[0.02em] leading-[1.05] font-black";
    case "archivist":
      return "tracking-[0.08em]";
    case "skeptic":
      return "tracking-tight italic";
    case "sibling":
      return "tracking-wide";
    case "chameleon":
      return "tracking-normal";
    default:
      return "";
  }
}

export function phaseClass(phase?: NotebookNote["yearPhase"]) {
  switch (phase) {
    case "childhood":
      return "opacity-100";
    case "early-adolescence":
      return "opacity-90";
    case "late-adolescence":
      return "opacity-80";
    default:
      return "";
  }
}
