import { expect, test } from "@playwright/test";

// Automates docs/qa/NOTEBOOK_ROUTE_SMOKE.md. Step numbers in comments map to
// that document's "Manual Smoke Sequence" so the two stay easy to compare.

test("notebook route smoke sequence", async ({ page }) => {
  // 1-2. Open the notebook directly; first spread, previous page disabled.
  await page.goto("/notebook");
  await expect(page.getByText(/lay flat 1 \/ \d+/)).toBeVisible();
  await expect(page.getByRole("button", { name: "← previous page" })).toBeDisabled();

  // 3. Default (recovered-layer) wording is visible on the first spread's Eli note.
  const defaultText = "Eli said the tunnels sounded wrong after storms.";
  const originalText = "he said they sounded wrong not dangerous";
  const reconstructedText = "Eli always tried to scare us after storms.";

  await expect(page.getByText(defaultText)).toBeVisible();

  // 4-5. Switch to original wording.
  await page.getByRole("button", { name: "original", exact: true }).click();
  await expect(page.getByText(originalText)).toBeVisible();
  await expect(page.getByText(defaultText)).toHaveCount(0);

  // 6-7. Switch to reconstructed wording.
  await page.getByRole("button", { name: "reconstructed", exact: true }).click();
  await expect(page.getByText(reconstructedText)).toBeVisible();
  await expect(page.getByText(originalText)).toHaveCount(0);

  // 8. Return to recovered (default) wording.
  await page.getByRole("button", { name: "recovered", exact: true }).click();
  await expect(page.getByText(defaultText)).toBeVisible();

  // 9-10. Select the note; preserved fragment and its pressure-reveal appear.
  await page.getByText(defaultText).click();
  await expect(page.getByText("preserved fragment")).toBeVisible();
  await expect(page.getByText("he wasnt trying to scare us")).toBeVisible();

  // 11-12. Lift the page closer; controls report left page focus.
  await page.getByRole("button", { name: "lift page closer" }).click();
  await expect(page.getByText(/left page focus/)).toBeVisible();

  // 13-14. Switch facing page; controls report right page focus.
  await page.getByRole("button", { name: "switch facing page" }).click();
  await expect(page.getByText(/right page focus/)).toBeVisible();

  // 15-16. Lay flat; controls return to lay-flat mode.
  await page.getByRole("button", { name: "lay flat" }).click();
  await expect(page.getByText(/lay flat 1 \/ \d+/)).toBeVisible();

  // 17-18. Advance to the next spread.
  await page.getByRole("button", { name: "next page →" }).click();
  await expect(page.getByText(/lay flat 2 \/ \d+/)).toBeVisible();

  // 19-20. Return to the first spread.
  await page.getByRole("button", { name: "← previous page" }).click();
  await expect(page.getByText(/lay flat 1 \/ \d+/)).toBeVisible();

  // 21-22. Set the notebook down; returns to the archive.
  await page.getByRole("link", { name: "set notebook down" }).click();
  await expect(page).toHaveURL(/\/archive$/);
});
