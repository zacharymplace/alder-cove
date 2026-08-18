import { describe, expect, test } from "vitest";

import {
  calculateArchivistInstability,
  getHighestUnlockedStage,
  getRevealDefinition,
} from "./progression";

describe("getRevealDefinition", () => {
  test("returns the matching definition", () => {
    expect(getRevealDefinition("archive-preface").stage).toBe("orientation");
  });

  test("throws on an unknown reveal id", () => {
    // @ts-expect-error deliberately invalid id to test the guard
    expect(() => getRevealDefinition("not-a-real-reveal")).toThrow(
      "Unknown archive reveal: not-a-real-reveal"
    );
  });
});

describe("getHighestUnlockedStage", () => {
  test("returns orientation when nothing is unlocked", () => {
    expect(getHighestUnlockedStage([])).toBe("orientation");
  });

  test("returns the stage of a single unlocked reveal", () => {
    expect(getHighestUnlockedStage(["unresolved-wording"])).toBe("softening");
  });

  test("returns the most advanced stage among several unlocked reveals", () => {
    expect(
      getHighestUnlockedStage([
        "archive-preface",
        "unresolved-wording",
        "partial-fragment",
        "private-journal-presence",
      ])
    ).toBe("preservation-conflict");
  });

  test("stage priority is independent of array order", () => {
    expect(
      getHighestUnlockedStage([
        "private-journal-presence",
        "archive-preface",
      ])
    ).toBe(
      getHighestUnlockedStage(["archive-preface", "private-journal-presence"])
    );
  });
});

describe("calculateArchivistInstability", () => {
  test("sums to zero with no unlocked reveals", () => {
    expect(calculateArchivistInstability([])).toBe(0);
  });

  test("sums instability across unlocked reveals", () => {
    expect(
      calculateArchivistInstability(["unresolved-wording", "partial-fragment"])
    ).toBe(1 + 2);
  });

  test("ignores duplicate ids beyond their single definition", () => {
    expect(
      calculateArchivistInstability([
        "unresolved-wording",
        "unresolved-wording",
      ])
    ).toBe(1);
  });
});
