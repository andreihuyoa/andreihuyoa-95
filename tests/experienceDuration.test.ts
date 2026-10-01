// tests/experienceDuration.test.ts
import { describe, expect, test } from "vitest";
import { formatExperienceDuration } from "../src/utils/experienceDuration";

describe("formatExperienceDuration", () => {
  test.each([
    ["Jan—Jan 2026", { hasYears: false, label: "1 MO" }],
    ["Apr—May 2024", { hasYears: false, label: "2 MOS" }],
    ["Feb—Jun 2026", { hasYears: false, label: "5 MOS" }],
    ["Jan 2025—Dec 2025", { hasYears: true, label: "1 yr" }],
    ["Jan 2025—Jan 2026", { hasYears: true, label: "1 yr 1 mo" }],
    ["Mar 2025—Aug 2026", { hasYears: true, label: "1 yr 6 mos" }],
    ["Jan 2022—Mar 2024", { hasYears: true, label: "2 yrs 3 mos" }],
  ])("%s", (range, expected) => {
    expect(formatExperienceDuration(range)).toEqual(expected);
  });

  test("assumes the previous year when a yearless start month is after the end month", () => {
    // Nov 2025 to Feb 2026
    expect(formatExperienceDuration("Nov—Feb 2026")).toEqual({
      hasYears: false,
      label: "4 MOS",
    });
  });

  test.each([
    "Mar 2025 - Jun 2026", // hyphen instead of em dash
    "Mar 2025—Present",
    "Sept 2025—Jun 2026",
    "Foo—Jun 2026",
    "Mar 2026—Feb 2025", // end before start
    "",
  ])("returns an empty label for %j", (range) => {
    expect(formatExperienceDuration(range)).toEqual({
      hasYears: false,
      label: "",
    });
  });
});
