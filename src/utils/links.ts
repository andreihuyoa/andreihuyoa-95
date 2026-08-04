export const contactEmail = "andrei.huyoa.me@gmail.com";

export const contactUrls = {
  github: "https://github.com/andreihuyoa",
  instagram: "https://www.instagram.com/unabridgedeeyore",
  linkedin: "https://www.linkedin.com/in/carl-andrei-del-rosario-3bab57257/",
} as const;

export type ContactUrlKey = keyof typeof contactUrls;

interface MailtoOptions {
  subject?: string;
  body?: string;
}

export const getContactUrl = (key: ContactUrlKey): string => contactUrls[key];

export const getMailtoUrl = ({ subject, body }: MailtoOptions = {}): string => {
  const params = new URLSearchParams();

  if (subject) {
    params.set("subject", subject);
  }

  if (body) {
    params.set("body", body);
  }

  const query = params.toString();

  return query ? `mailto:${contactEmail}?${query}` : `mailto:${contactEmail}`;
};
