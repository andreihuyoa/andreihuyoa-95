import {
  certificationGroups,
  certifications,
  type Certification,
  type CertificationFact,
  type CertificationGroup,
} from "../content/certifications";
import { siteName, siteUrl } from "../seo";

export interface CertificationGroupWithItems extends CertificationGroup {
  items: Certification[];
}

const toUtcDate = (issuedOn: string): Date =>
  new Date(`${issuedOn.length === 7 ? `${issuedOn}-01` : issuedOn}T00:00:00Z`);

/**
 * Formats an ISO issue date as `Sep 29, 2026`, or `Jun 2026` when the source
 * only records the month.
 */
export const formatCertificationDate = (issuedOn: string): string =>
  new Intl.DateTimeFormat("en", {
    day: issuedOn.length === 7 ? undefined : "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(toUtcDate(issuedOn));

/** Short, uppercase credential reference shown on cards, e.g. `ID 519A43C3`. */
export const formatCredentialReference = (
  certification: Certification,
): string =>
  certification.credentialId
    ? `ID ${certification.credentialId.slice(0, 8).toUpperCase()}`
    : certification.kind === "certificate"
      ? "employer-issued"
      : "no public ID";

/**
 * Rows for the viewer's detail list: issue date, credential, extras. The
 * issuer already sits under the viewer title, so it is not repeated here.
 */
export const getCertificationFacts = (
  certification: Certification,
): CertificationFact[] => [
  {
    label: "Issued",
    value: formatCertificationDate(certification.issuedOn),
  },
  ...(certification.credentialId
    ? [
        {
          label: "Credential",
          value: certification.credentialId.slice(0, 8).toUpperCase(),
        },
      ]
    : []),
  ...(certification.facts ?? []),
];

/**
 * Groups certifications in page order, newest first inside each group, and
 * drops groups that have nothing in them yet.
 */
export const getCertificationGroups = (): CertificationGroupWithItems[] =>
  certificationGroups
    .map((group) => ({
      ...group,
      items: certifications
        .filter((certification) => certification.group === group.id)
        .sort(
          (a, b) =>
            toUtcDate(b.issuedOn).getTime() - toUtcDate(a.issuedOn).getTime(),
        ),
    }))
    .filter((group) => group.items.length > 0);

/** Most recent certifications across every group, for landing previews. */
export const getLatestCertifications = (count: number): Certification[] =>
  [...certifications]
    .sort(
      (a, b) =>
        toUtcDate(b.issuedOn).getTime() - toUtcDate(a.issuedOn).getTime(),
    )
    .slice(0, count);

/**
 * schema.org Person with `hasCredential` entries so search engines can read
 * each credential's issuer, date, and verification URL.
 */
export const getCertificationsStructuredData = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carl Andrei Del Rosario",
  alternateName: siteName,
  url: siteUrl,
  hasCredential: certifications.map((certification) => ({
    "@type": "EducationalOccupationalCredential",
    name: certification.title,
    description: certification.summary,
    credentialCategory: certification.kind,
    dateCreated: certification.issuedOn,
    image: new URL(certification.image.src, siteUrl).toString(),
    recognizedBy: {
      "@type": "Organization",
      name: certification.issuer,
    },
    ...(certification.verification
      ? { url: certification.verification.url }
      : {}),
  })),
});
