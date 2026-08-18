import { expect, test, type Page } from "@playwright/test";

// Automates docs/qa/ARCHIVE_ROUTE_SMOKE.md. Step numbers in comments map to
// that document's "Manual Smoke Sequence" so the two stay easy to compare.
// Per docs/planning/ARCHIVE_NEXT_EXPANSION_GATE.md, this sequence should
// keep passing before new archive content is added.

function artifactCard(page: Page, title: string) {
  return page
    .locator("article")
    .filter({ has: page.getByRole("heading", { name: title, exact: true }) });
}

// Hovering an artifact card inserts focus-state copy into the DOM, which
// reflows the card and shifts its "pick up" / "approach artifact" link.
// A plain .click() computes its target position before that reflow, so
// pick-up links are hovered first (letting the reflow settle) and clicked
// as a separate step.
async function pickUpArtifact(page: Page, cardTitle: string, linkName: string) {
  const link = artifactCard(page, cardTitle).getByRole("link", {
    name: linkName,
  });
  await link.hover();
  await link.click();
}

test("archive route smoke sequence", async ({ page }) => {
  // 1-2. Landing page invites the player into the archive, not the notebook.
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Enter Archive" })).toBeVisible();
  await expect(page.getByText("Open Notebook")).toHaveCount(0);

  // 3-4. Enter the archive and confirm the archivist preface appears.
  await page.getByRole("link", { name: "Enter Archive" }).click();
  await expect(page).toHaveURL(/\/archive$/);
  await expect(page.getByText("archivist preface")).toBeVisible();

  // 5-6. Dismiss the preface; the archive desk becomes interactable.
  await page.getByRole("button", { name: "begin handling archive" }).click();
  await expect(page.getByText("archivist preface")).toHaveCount(0);
  await expect(page.getByText("Filter by access")).toBeVisible();

  // 7. Access filters change which artifacts are visible.
  const notebookCard = artifactCard(page, "Notebook One — Shared Group Notebook");
  await expect(notebookCard).toBeVisible();
  await page.getByRole("button", { name: "private", exact: true }).click();
  await expect(notebookCard).toHaveCount(0);
  await page.getByRole("button", { name: "all", exact: true }).click();
  await expect(notebookCard).toBeVisible();

  // 8-9. Trigger Unresolved Wording, then return to the archive.
  await page.getByRole("button", { name: "Unresolved Wording" }).click();
  await expect(page.getByText("unresolved wording comparison")).toBeVisible();
  await page.getByRole("button", { name: "return to archive" }).click();
  await expect(page.getByText("unresolved wording comparison")).toHaveCount(0);

  // 10-11. Trigger Partial Fragment, then return to the archive.
  await page.getByRole("button", { name: "Partial Fragment" }).click();
  await expect(page.getByText("partial readability event")).toBeVisible();
  await page.getByRole("button", { name: "return to archive" }).click();
  await expect(page.getByText("partial readability event")).toHaveCount(0);

  // 12. Archive handling resumes once every reveal has been seen.
  await expect(page.getByText("archive handling resumed")).toBeVisible();

  // 13-14. Pick up Notebook One; the shared route redirects to /notebook.
  await pickUpArtifact(page, "Notebook One — Shared Group Notebook", "pick up");
  await expect(page).toHaveURL(/\/notebook$/);

  // 15. "set notebook down" returns to the archive.
  await page.getByRole("link", { name: "set notebook down" }).click();
  await expect(page).toHaveURL(/\/archive$/);

  // 16. Pick up the Flood Recovery Packet.
  await pickUpArtifact(page, "Flood Recovery Packet — Box 1", "approach artifact");
  await expect(page).toHaveURL(/\/archive\/flood-recovery-packet-001$/);

  // 17-19. Recovery contamination, cross-artifact links, and fingerprints render.
  await expect(
    page.getByText("recovery contamination review")
  ).toBeVisible();
  await expect(
    page.getByText("cross-artifact relationship review")
  ).toBeVisible();
  await expect(page.getByText("archivist fingerprints")).toBeVisible();

  await page.getByRole("link", { name: "set object down" }).first().click();
  await expect(page).toHaveURL(/\/archive$/);

  // 20-21. Mara's private journal stays sealed; no readable journal text.
  await pickUpArtifact(page, "Mara — Private Journal Fragment", "approach artifact");
  await expect(page).toHaveURL(/\/archive\/mara-private-journal-fragment$/);
  await expect(page.getByText("handling restriction")).toBeVisible();
  await expect(
    page.getByText("sealed pending emotional review")
  ).toBeVisible();

  await page.getByRole("link", { name: "set object down" }).first().click();
  await expect(page).toHaveURL(/\/archive$/);

  // 22-23. Reset handling; the preface and reveal sequence can be replayed.
  await page.getByRole("button", { name: "reset handling" }).click();
  await expect(page.getByText("archivist preface")).toBeVisible();
  await page.getByRole("button", { name: "begin handling archive" }).click();
  await expect(
    page.getByRole("button", { name: "Unresolved Wording" })
  ).toBeVisible();
});

for (const documentId of ["east-shore-shelter-map", "council-meeting-fragments"]) {
  // 24-27. Unindexed document routes get the in-world not-found handling.
  test(`unindexed document route (${documentId}) shows in-world not-found handling`, async ({
    page,
  }) => {
    await page.goto(`/archive/${documentId}`);

    await expect(
      page.getByRole("heading", { name: "Material Not Located" })
    ).toBeVisible();
    await expect(page.getByText("generic 404")).toHaveCount(0);

    const setObjectDownLinks = page.getByRole("link", {
      name: "set object down",
    });
    await expect(setObjectDownLinks).toHaveCount(2);

    await setObjectDownLinks.first().click();
    await expect(page).toHaveURL(/\/archive$/);
  });
}

test("withdrawn document route shows in-world withdrawn handling, distinct from not-found", async ({
  page,
}) => {
  // 28-30. Eli's interview note was indexed, then withdrawn at request --
  // a different in-world state than "never indexed" (not-found above).
  await page.goto("/archive/eli-interview-note");

  await expect(
    page.getByRole("heading", { name: "Withdrawn At Request" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Material Not Located" })
  ).toHaveCount(0);

  const setObjectDownLinks = page.getByRole("link", {
    name: "set object down",
  });
  await expect(setObjectDownLinks).toHaveCount(2);

  await setObjectDownLinks.first().click();
  await expect(page).toHaveURL(/\/archive$/);
});
