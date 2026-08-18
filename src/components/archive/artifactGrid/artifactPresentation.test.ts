import { describe, expect, test } from "vitest";

import {
  artifactInteractionClass,
  dotClass,
  focusLanguage,
  handlingStateClass,
  handlingStateLabel,
} from "./artifactPresentation";

describe("dotClass", () => {
  test("maps known access classes to their dot color", () => {
    expect(dotClass("shared")).toBe("bg-amber-200");
    expect(dotClass("semi-private")).toBe("bg-blue-300");
    expect(dotClass("private")).toBe("bg-red-700");
    expect(dotClass("illicitly-acquired")).toBe("bg-violet-400");
  });

  test("falls back to neutral for unknown access classes", () => {
    expect(dotClass("unknown")).toBe("bg-neutral-400");
  });
});

describe("handlingStateClass", () => {
  test("maps known handling states to a text color", () => {
    expect(handlingStateClass("stable")).toBe("text-emerald-200/70");
    expect(handlingStateClass("sealed")).toBe("text-neutral-300/65");
  });

  test("falls back to a default color for unknown states", () => {
    expect(handlingStateClass("unknown")).toBe("text-neutral-300/60");
  });
});

describe("handlingStateLabel", () => {
  test("defaults to awaiting review when state is missing", () => {
    expect(handlingStateLabel(undefined)).toBe("awaiting review");
  });

  test("replaces dashes with spaces", () => {
    expect(handlingStateLabel("over-handled")).toBe("over handled");
  });
});

describe("artifactInteractionClass", () => {
  test("private artifacts get a slow, restrained hover", () => {
    expect(
      artifactInteractionClass({ accessClass: "private", type: "private-journal" })
    ).toContain("duration-700");
  });

  test("illicitly-acquired artifacts get their own hover treatment", () => {
    expect(
      artifactInteractionClass({
        accessClass: "illicitly-acquired",
        type: "copied-fragment",
      })
    ).toContain("duration-1000");
  });

  test("over-handled shared artifacts lift further on hover", () => {
    expect(
      artifactInteractionClass({
        accessClass: "shared",
        type: "shared-notebook",
        handlingState: "over-handled",
      })
    ).toContain("translate-y-[-7px]");
  });

  test("default artifacts get the standard lift", () => {
    expect(
      artifactInteractionClass({ accessClass: "shared", type: "shared-notebook" })
    ).toContain("translate-y-[-5px]");
  });
});

describe("focusLanguage", () => {
  test("private artifacts get restrained approach language", () => {
    expect(
      focusLanguage({ accessClass: "private", type: "private-journal" })
    ).toBe("the archive slows before this one");
  });

  test("illicitly-acquired artifacts flag unclear provenance", () => {
    expect(
      focusLanguage({ accessClass: "illicitly-acquired", type: "copied-fragment" })
    ).toBe("the record does not explain how this arrived");
  });

  test("drying artifacts reference water", () => {
    expect(
      focusLanguage({
        accessClass: "shared",
        type: "recovery-packet",
        handlingState: "drying",
      })
    ).toBe("paper still remembers water");
  });

  test("over-handled artifacts reference repeated handling", () => {
    expect(
      focusLanguage({
        accessClass: "shared",
        type: "shared-notebook",
        handlingState: "over-handled",
      })
    ).toBe("edges lift slightly from repeated handling");
  });

  test("defaults to a neutral handling-notes message", () => {
    expect(
      focusLanguage({ accessClass: "shared", type: "shared-notebook" })
    ).toBe("handling notes shift into view");
  });
});
