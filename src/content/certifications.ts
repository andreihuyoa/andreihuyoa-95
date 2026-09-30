const assetRoot = "/assets/WebsiteMode/certifications";
const credlyBadgeUrl = (badgeId: string): string =>
  `https://www.credly.com/badges/${badgeId}`;

export type CertificationGroupId =
  | "experience"
  | "ai"
  | "engineering"
  | "design";

export type CertificationKind = "badge" | "certificate";

export interface CertificationGroup {
  id: CertificationGroupId;
  label: string;
}

export interface CertificationImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CertificationLogo {
  src: string;
  /** `cover` for square marks that fill the tile, `contain` for wordmarks. */
  fit: "contain" | "cover";
}

export interface CertificationFact {
  label: string;
  value: string;
}

export interface CertificationVerification {
  /** Site name shown in the viewer action, e.g. "verify on credly". */
  site: string;
  url: string;
}

export interface Certification {
  id: string;
  group: CertificationGroupId;
  kind: CertificationKind;
  title: string;
  issuer: string;
  /** ISO date: `YYYY-MM-DD`, or `YYYY-MM` when only the month is known. */
  issuedOn: string;
  credentialId?: string;
  logo: CertificationLogo;
  image: CertificationImage;
  summary: string;
  skills: string[];
  /** Extra viewer rows shown after the issued/issuer/credential facts. */
  facts?: CertificationFact[];
  verification?: CertificationVerification;
}

/** Display order of the groups on the certifications page. */
export const certificationGroups: CertificationGroup[] = [
  { id: "experience", label: "experience" },
  { id: "ai", label: "ai" },
  { id: "engineering", label: "engineering" },
  { id: "design", label: "design" },
];

export const certifications: Certification[] = [
  {
    id: "strastan-certificate-of-recognition",
    group: "experience",
    kind: "certificate",
    title: "Certificate of Recognition",
    issuer: "Strastan Solutions Corp.",
    issuedOn: "2026-06",
    logo: { src: `${assetRoot}/logos/strastan.jpg`, fit: "cover" },
    image: {
      src: `${assetRoot}/certificate-of-recognition-intern.jpeg`,
      alt: "Certificate of Recognition from Strastan Solutions Corp. awarded to Carl Andrei H. Del Rosario for AWS serverless development.",
      width: 1920,
      height: 1357,
    },
    summary:
      "Awarded for hands-on work with Cognito, Lambda, SQS, SNS, EventBridge, S3, CloudFront, API Gateway, DynamoDB and CloudWatch, plus frontend work in React, Next.js, Tailwind CSS and React Query.",
    skills: ["AWS Lambda", "DynamoDB", "API Gateway", "Next.js", "React Query"],
    facts: [
      {
        label: "Program",
        value: "Full stack developer internship, Feb–Jun 2026",
      },
      { label: "Verification", value: "Signed certificate, no public ID" },
    ],
  },
  {
    id: "mongodb-building-rag-apps",
    group: "ai",
    kind: "badge",
    title: "Building RAG Apps Using MongoDB",
    issuer: "MongoDB",
    issuedOn: "2026-09-29",
    credentialId: "519a43c3-b68b-4ca8-9591-e391c28edda5",
    logo: { src: `${assetRoot}/logos/mongodb.png`, fit: "cover" },
    image: {
      src: `${assetRoot}/badges/mongodb-building-rag-apps.png`,
      alt: "Building RAG Apps Using MongoDB badge issued by MongoDB",
      width: 600,
      height: 600,
    },
    summary:
      "Building retrieval-augmented generation apps on MongoDB: integrating vector search, tuning retrieval workflows and improving LLM-powered apps. One hour of training plus a skill check.",
    skills: ["GenAI", "MongoDB", "RAG"],
    verification: {
      site: "credly",
      url: credlyBadgeUrl("519a43c3-b68b-4ca8-9591-e391c28edda5"),
    },
  },
  {
    id: "lfd121-developing-secure-software",
    group: "engineering",
    kind: "badge",
    title: "LFD121: Developing Secure Software",
    issuer: "The Linux Foundation",
    issuedOn: "2025-04-01",
    credentialId: "6ae62973-877b-49f5-ae76-69663f360dae",
    logo: { src: `${assetRoot}/logos/linux-foundation.png`, fit: "contain" },
    image: {
      src: `${assetRoot}/badges/lfd121-developing-secure-software.png`,
      alt: "LFD121: Developing Secure Software badge issued by The Linux Foundation",
      width: 600,
      height: 600,
    },
    summary:
      "Practical steps to counter most kinds of attacks: secure design principles, careful implementation, verification, handling vulnerability reports and evaluating the software supply chain.",
    skills: [
      "Secure Design",
      "Supply Chain",
      "Risk Management",
      "Security Verification",
    ],
    verification: {
      site: "credly",
      url: credlyBadgeUrl("6ae62973-877b-49f5-ae76-69663f360dae"),
    },
  },
  {
    id: "lfs170-blockchain",
    group: "engineering",
    kind: "badge",
    title: "LFS170: Blockchain, Understanding Its Uses and Implications",
    issuer: "The Linux Foundation",
    issuedOn: "2025-03-29",
    credentialId: "9fafb6f4-6f9e-4c25-a289-0f20b8cb1762",
    logo: { src: `${assetRoot}/logos/linux-foundation.png`, fit: "contain" },
    image: {
      src: `${assetRoot}/badges/lfs170-blockchain.png`,
      alt: "LFS170: Blockchain, Understanding Its Uses and Implications badge issued by The Linux Foundation",
      width: 600,
      height: 600,
    },
    summary:
      "How blockchain works and where it fits across industries, covering cryptography, smart contracts and governance models.",
    skills: [
      "Blockchain",
      "Cryptography",
      "Smart Contracts",
      "Governance Models",
    ],
    verification: {
      site: "credly",
      url: credlyBadgeUrl("9fafb6f4-6f9e-4c25-a289-0f20b8cb1762"),
    },
  },
  {
    id: "cisco-introduction-to-cybersecurity",
    group: "engineering",
    kind: "badge",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issuedOn: "2025-03-04",
    credentialId: "6feb794c-8d13-49c6-8b4c-7533ff1c53cb",
    logo: { src: `${assetRoot}/logos/cisco.png`, fit: "contain" },
    image: {
      src: `${assetRoot}/badges/cisco-introduction-to-cybersecurity.png`,
      alt: "Introduction to Cybersecurity badge issued by Cisco Networking Academy",
      width: 600,
      height: 600,
    },
    summary:
      "Introductory cybersecurity from Cisco Networking Academy: the global impact of cyber threats, network vulnerabilities, threat detection and protecting data privacy.",
    skills: [
      "Cybersecurity",
      "Threat Detection",
      "Network Vulnerabilities",
      "Data Privacy",
    ],
    verification: {
      site: "credly",
      url: credlyBadgeUrl("6feb794c-8d13-49c6-8b4c-7533ff1c53cb"),
    },
  },
  {
    id: "ibm-enterprise-design-thinking-practitioner",
    group: "design",
    kind: "badge",
    title: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    issuedOn: "2023-08-16",
    credentialId: "f07170cc-d8ad-4525-9ed8-df254bea8e5b",
    logo: { src: `${assetRoot}/logos/ibm.png`, fit: "contain" },
    image: {
      src: `${assetRoot}/badges/ibm-enterprise-design-thinking-practitioner.png`,
      alt: "Enterprise Design Thinking Practitioner badge issued by IBM",
      width: 600,
      height: 600,
    },
    summary:
      "Applying Enterprise Design Thinking in everyday work at practitioner level: empathy, ideation and user-centered research.",
    skills: ["Design Thinking", "User Research", "Ideation", "UX"],
    verification: {
      site: "credly",
      url: credlyBadgeUrl("f07170cc-d8ad-4525-9ed8-df254bea8e5b"),
    },
  },
];
