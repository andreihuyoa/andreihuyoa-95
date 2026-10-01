interface ExperienceDuration {
  hasYears: boolean;
  label: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Converts a resume date range into an inclusive years-and-months duration.
 */
export const formatExperienceDuration = (
  dateRange: string,
): ExperienceDuration => {
  const [startText, endText] = dateRange.split("—");
  const startMatch = startText?.trim().match(/^(\w{3})(?:\s+(\d{4}))?$/);
  const endMatch = endText?.trim().match(/^(\w{3})\s+(\d{4})$/);

  if (!startMatch || !endMatch) {
    return { hasYears: false, label: "" };
  }

  const startMonth = monthNames.indexOf(startMatch[1] ?? "");
  const endMonth = monthNames.indexOf(endMatch[1] ?? "");
  const endYear = Number(endMatch[2]);
  const startYear = Number(startMatch[2] ?? endYear);

  if (startMonth < 0 || endMonth < 0) {
    return { hasYears: false, label: "" };
  }

  const totalMonths =
    (endYear - startYear) * monthNames.length + endMonth - startMonth;
  const years = Math.floor(totalMonths / monthNames.length);
  const months = totalMonths % monthNames.length;
  const monthLabel = `${months} ${months === 1 ? "MO" : "MOS"}`;

  if (years === 0) {
    return { hasYears: false, label: monthLabel };
  }

  return {
    hasYears: true,
    label: `${years} yr${years === 1 ? "" : "s"}${months > 0 ? ` ${monthLabel.toLowerCase()}` : ""}`,
  };
};
