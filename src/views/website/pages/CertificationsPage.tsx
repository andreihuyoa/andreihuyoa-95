import type { ReactElement } from "react";

import { MotionReveal } from "../../../components/website/MotionReveal";

/**
 * Provides the dedicated route foundation for certification records.
 */
const CertificationsPage = (): ReactElement => (
  <MotionReveal>
    <section
      className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
      aria-labelledby="certifications-title"
    >
      <header className="mb-12 max-w-2xl">
        <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
          03 - credentials
        </p>
        <h1
          className="mt-3 mb-0 text-4xl leading-none font-semibold"
          id="certifications-title"
        >
          Certifications
        </h1>
      </header>

      <div className="border-website-border grid min-h-72 place-items-center border-y border-dashed px-6 text-center">
        <p className="font-website-display text-website-text-muted m-0 max-w-md text-sm leading-relaxed">
          Credential records and verification details are being prepared.
        </p>
      </div>
    </section>
  </MotionReveal>
);

export default CertificationsPage;
