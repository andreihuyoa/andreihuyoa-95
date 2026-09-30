import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactElement } from "react";

import { CertificationCard } from "../../../components/website/CertificationCard";
import { CertificationViewer } from "../../../components/website/CertificationViewer";
import { MotionReveal } from "../../../components/website/MotionReveal";
import { SeoHead } from "../../../components/website/SeoHead";
import {
  revealViewport,
  staggerContainer,
  staggerItem,
} from "../../../components/website/motion";
import {
  certifications,
  type Certification,
} from "../../../content/certifications";
import {
  getCertificationGroups,
  getCertificationsStructuredData,
} from "../../../lib/certifications";

const certificationGroups = getCertificationGroups();
const structuredData = getCertificationsStructuredData();

/**
 * Grouped certification showcase. Cards open a detail viewer; each card's
 * verify link goes straight to the issuer's verification page.
 */
const CertificationsPage = (): ReactElement => {
  const [openCertification, setOpenCertification] =
    useState<Certification | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  const handleOpen = (
    certification: Certification,
    trigger: HTMLButtonElement,
  ): void => {
    triggerRef.current = trigger;
    setOpenCertification(certification);
  };

  const handleClose = (): void => {
    setOpenCertification(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <SeoHead
        metadata={{
          canonicalPath: "/certifications",
          description:
            "Certifications and badges earned by Andrei Huyo-a across AI, software engineering, security, and design, each with a link to verify it.",
          title: "Certifications | Andrei Huyo-a",
        }}
        structuredData={structuredData}
      />
      <MotionReveal>
        <section
          className="min-h-full py-10 max-[760px]:pt-5 max-[760px]:pb-12"
          aria-labelledby="certifications-title"
        >
          <header className="mb-10 max-w-2xl">
            <p className="font-website-display text-website-text-muted m-0 text-sm tracking-tighter">
              03 - certifications
            </p>
            <h1
              className="mt-3 mb-0 text-4xl leading-none font-semibold"
              id="certifications-title"
            >
              Certifications
            </h1>
            <p className="text-website-text-soft mt-4 mb-0 text-base leading-[1.4]">
              Badges and certificates I've earned, grouped by field. Open one
              for the details, or verify it straight on the issuer's site.
            </p>
          </header>

          <div className="border-website-border/20 font-website-display text-website-text-muted mb-8 flex justify-between border-b pb-3 text-xs uppercase">
            <span>{certifications.length} records</span>
            <span>newest first</span>
          </div>

          <div className="flex flex-col gap-12">
            {certificationGroups.map((group) => (
              <section
                aria-labelledby={`certifications-${group.id}`}
                className="@container"
                key={group.id}
              >
                <h2
                  className="font-website-display m-0 mb-4 text-sm font-normal tracking-tighter"
                  id={`certifications-${group.id}`}
                >
                  {group.label}{" "}
                  <span className="text-website-text-muted">
                    · {group.items.length}
                  </span>
                </h2>
                <motion.ul
                  className="m-0 grid list-none grid-cols-1 gap-6 p-0 max-[760px]:gap-4 @lg:grid-cols-2 @3xl:grid-cols-3"
                  initial={reduceMotion ? false : "hidden"}
                  variants={staggerContainer}
                  viewport={revealViewport}
                  whileInView={reduceMotion ? undefined : "visible"}
                >
                  {group.items.map((certification) => (
                    <motion.li key={certification.id} variants={staggerItem}>
                      <CertificationCard
                        certification={certification}
                        onOpen={handleOpen}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>
            ))}
          </div>
        </section>
      </MotionReveal>
      <CertificationViewer
        certification={openCertification}
        onClose={handleClose}
      />
    </>
  );
};

export default CertificationsPage;
