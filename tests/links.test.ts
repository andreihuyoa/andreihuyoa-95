import { describe, expect, it } from "vitest";

import {
  contactEmail,
  getGmailComposeUrl,
  getMailtoUrl,
} from "../src/utils/links";

describe("getMailtoUrl", () => {
  it("returns a bare mailto link without options", () => {
    expect(getMailtoUrl()).toBe(`mailto:${contactEmail}`);
  });

  it("encodes spaces as %20 instead of +", () => {
    const url = getMailtoUrl({ subject: "Hello there", body: "a&b\nc" });

    expect(url).toBe(
      `mailto:${contactEmail}?subject=Hello%20there&body=a%26b%0Ac`,
    );
  });
});

describe("getGmailComposeUrl", () => {
  it("targets the contact address with subject and body", () => {
    const url = new URL(getGmailComposeUrl({ subject: "Hi", body: "Yo" }));

    expect(url.origin).toBe("https://mail.google.com");
    expect(url.searchParams.get("to")).toBe(contactEmail);
    expect(url.searchParams.get("su")).toBe("Hi");
    expect(url.searchParams.get("body")).toBe("Yo");
  });
});
