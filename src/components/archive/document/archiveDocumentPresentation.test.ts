import { describe, expect, test } from "vitest";

import type { ArchiveDocument } from "@/data/archive/archiveDocuments";

import {
  archiveDocumentShellClass,
  getArchiveDocumentPresentation,
} from "./archiveDocumentPresentation";

function documentWithAccessClass(
  accessClass: ArchiveDocument["accessClass"]
): ArchiveDocument {
  return {
    id: "test-document",
    title: "Test Document",
    type: "interview-note",
    accessClass,
    acquisitionMethod: "kept-by-group",
    emotionalRisk: "low",
    handlingState: "stable",
    pageIds: [],
    description: "A document used for testing.",
  };
}

describe("getArchiveDocumentPresentation", () => {
  test("private documents get the private tone", () => {
    const presentation = getArchiveDocumentPresentation(
      documentWithAccessClass("private")
    );
    expect(presentation.tone).toBe("private");
  });

  test("illicitly acquired documents get the illicit tone", () => {
    const presentation = getArchiveDocumentPresentation(
      documentWithAccessClass("illicitly-acquired")
    );
    expect(presentation.tone).toBe("illicit");
  });

  test("semi-private documents get the semi-private tone", () => {
    const presentation = getArchiveDocumentPresentation(
      documentWithAccessClass("semi-private")
    );
    expect(presentation.tone).toBe("semi-private");
  });

  test("shared documents get the shared tone", () => {
    const presentation = getArchiveDocumentPresentation(
      documentWithAccessClass("shared")
    );
    expect(presentation.tone).toBe("shared");
  });
});

describe("archiveDocumentShellClass", () => {
  test("maps every tone to a distinct class string", () => {
    const tones: Array<ReturnType<typeof getArchiveDocumentPresentation>["tone"]> = [
      "private",
      "illicit",
      "semi-private",
      "shared",
    ];

    const classes = tones.map((tone) => archiveDocumentShellClass(tone));

    expect(new Set(classes).size).toBe(tones.length);
  });
});
