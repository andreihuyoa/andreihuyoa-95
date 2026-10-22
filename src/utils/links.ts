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

/**
 * Builds a `mailto:` URL to the contact address. Parameters are percent-encoded
 * (spaces as `%20`) because mail clients show `+` literally in mailto links.
 */
export const getMailtoUrl = ({ subject, body }: MailtoOptions = {}): string => {
  const params: string[] = [];

  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }

  return params.length
    ? `mailto:${contactEmail}?${params.join("&")}`
    : `mailto:${contactEmail}`;
};

/**
 * Builds a Gmail web compose URL to the contact address, for visitors without
 * a desktop mail app registered for `mailto:` links.
 */
export const getGmailComposeUrl = ({
  subject,
  body,
}: MailtoOptions = {}): string => {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: contactEmail });

  if (subject) {
    params.set("su", subject);
  }

  if (body) {
    params.set("body", body);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
};
