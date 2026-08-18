/**
 * The shape actually rendered by the archive index grid. Most entries are
 * full ArchiveDocument records, but a couple of synthetic/fallback entries
 * (see ArchiveIndexPage) are plain object literals whose string fields are
 * widened (not narrowed to ArchiveDocument's literal unions) and which
 * omit `handlingState` entirely — so every field here is intentionally
 * looser than ArchiveDocument, and consumers fall back to
 * "awaiting-review" when handlingState is absent.
 */
export type ArchiveDisplayArtifact = {
  id: string;
  title: string;
  type: string;
  accessClass: string;
  acquisitionMethod: string;
  emotionalRisk: string;
  handlingState?: string;
  pageIds: string[];
  description: string;
  ethicalPressure?: string;
};

export function dotClass(accessClass: string) {
  switch (accessClass) {
    case "shared":
      return "bg-amber-200";
    case "semi-private":
      return "bg-blue-300";
    case "private":
      return "bg-red-700";
    case "illicitly-acquired":
      return "bg-violet-400";
    default:
      return "bg-neutral-400";
  }
}

export function handlingStateClass(state: string) {
  switch (state) {
    case "stable":
      return "text-emerald-200/70";
    case "drying":
      return "text-amber-200/70";
    case "over-handled":
      return "text-red-200/70";
    case "reconstructed":
      return "text-violet-200/70";
    case "awaiting-review":
      return "text-blue-200/70";
    case "sealed":
      return "text-neutral-300/65";
    default:
      return "text-neutral-300/60";
  }
}

export function handlingStateLabel(state?: string) {
  return (state ?? "awaiting-review").replaceAll("-", " ");
}

export function artifactInteractionClass(document: {
  accessClass: string;
  type: string;
  handlingState?: string;
}) {
  if (document.accessClass === "private") {
    return "duration-700 ease-out group-hover:translate-y-[-3px] group-hover:rotate-[-0.3deg]";
  }

  if (document.accessClass === "illicitly-acquired") {
    return "duration-1000 ease-out group-hover:translate-y-[-2px] group-hover:rotate-[0.2deg]";
  }

  if (document.handlingState === "over-handled") {
    return "duration-300 ease-out group-hover:translate-y-[-7px] group-hover:rotate-[0.4deg]";
  }

  return "duration-300 ease-out group-hover:translate-y-[-5px]";
}

export function focusLanguage(document: {
  accessClass: string;
  type: string;
  handlingState?: string;
}) {
  if (document.accessClass === "private") {
    return "the archive slows before this one";
  }

  if (document.accessClass === "illicitly-acquired") {
    return "the record does not explain how this arrived";
  }

  if (document.handlingState === "drying") {
    return "paper still remembers water";
  }

  if (document.handlingState === "over-handled") {
    return "edges lift slightly from repeated handling";
  }

  return "handling notes shift into view";
}
