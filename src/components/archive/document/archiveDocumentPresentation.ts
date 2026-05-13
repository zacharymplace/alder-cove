import type { ArchiveDocument } from "@/data/archive/archiveDocuments";

export type ArchiveDocumentPresentation = {
  eyebrow: string;
  title: string;
  body: string;
  status: string;
  tone: "private" | "illicit" | "semi-private" | "shared";
};

export function getArchiveDocumentPresentation(
  document: ArchiveDocument
): ArchiveDocumentPresentation {
  if (document.accessClass === "private") {
    return {
      eyebrow: "restricted handling",
      title: "This does not feel shared.",
      body:
        "The archive can identify the fragment, but the way it entered preservation makes the act of reading feel different.",
      status: "sealed pending emotional review",
      tone: "private",
    };
  }

  if (document.accessClass === "illicitly-acquired") {
    return {
      eyebrow: "unsettled acquisition",
      title: "The archive should not make this easy.",
      body:
        "This item appears preserved outside normal consent. Its presence creates pressure before its contents do.",
      status: "access delayed",
      tone: "illicit",
    };
  }

  if (document.accessClass === "semi-private") {
    return {
      eyebrow: "limited handling",
      title: "This was not meant for everyone.",
      body:
        "The material sits between shared memory and private memory. It can be acknowledged without being opened casually.",
      status: "awaiting careful review",
      tone: "semi-private",
    };
  }

  return {
    eyebrow: "shared handling",
    title: "This object was meant to be held together.",
    body:
      "Shared artifacts carry communal memory, but later copying and preservation can still change what survives.",
    status: "available for handling",
    tone: "shared",
  };
}

export function archiveDocumentShellClass(
  tone: ArchiveDocumentPresentation["tone"]
) {
  switch (tone) {
    case "private":
      return "border-red-950/30 bg-[#120e0d]";
    case "illicit":
      return "border-violet-900/30 bg-[#100d14]";
    case "semi-private":
      return "border-blue-900/25 bg-[#0e1115]";
    default:
      return "border-amber-100/10 bg-[#11100d]/80";
  }
}
