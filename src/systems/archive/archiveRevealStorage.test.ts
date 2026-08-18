import { describe, expect, test } from "vitest";

import { parseStoredArchiveReveals } from "./archiveRevealStorage";

describe("parseStoredArchiveReveals", () => {
  test("returns an empty object for null", () => {
    expect(parseStoredArchiveReveals(null)).toEqual({});
  });

  test("returns an empty object for an empty string", () => {
    expect(parseStoredArchiveReveals("")).toEqual({});
  });

  test("returns an empty object for malformed JSON", () => {
    expect(parseStoredArchiveReveals("{not json")).toEqual({});
  });

  test("returns an empty object when the parsed value is not an object", () => {
    expect(parseStoredArchiveReveals("5")).toEqual({});
    expect(parseStoredArchiveReveals("null")).toEqual({});
    expect(parseStoredArchiveReveals('"just a string"')).toEqual({});
  });

  test("parses a well-formed reveal record", () => {
    const raw = JSON.stringify({
      prefaceDismissed: true,
      seenEventIds: ["unresolved-wording"],
      handledArtifactIds: ["notebook-one-shared"],
    });

    expect(parseStoredArchiveReveals(raw)).toEqual({
      prefaceDismissed: true,
      seenEventIds: ["unresolved-wording"],
      handledArtifactIds: ["notebook-one-shared"],
    });
  });

  test("tolerates missing fields", () => {
    expect(parseStoredArchiveReveals("{}")).toEqual({});
  });
});
