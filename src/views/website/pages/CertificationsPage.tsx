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
  type CertificationGroupWithItems,
} from "../../../lib/certifications";

const certificationGroups = getCertificationGroups();
const structuredData = getCertificationsStructuredData();

/** Employer-issued certificates live in the "experience" group. */
const workGroups = certificationGroups.filter(
  (group) => group.id === "experience",
);
const personalGroups = certificationGroups.filter(
  (group) => group.id !== "experience",
);

const divisions: Array<{
  id: string;
  label: string;
  groups: CertificationGroupWithItems[];
  /** Show each field group (ai, engineering, ...) as a sub-heading. */
  showGroupHeadings: boolean;
}> = [
  {
    id: "work",
    label: "Work certifications",
    groups: workGroups,
    showGroupHeadings: false,
  },
  {
    id: "personal",
    label: "Personal certifications",
    groups: personalGroups,
    showGroupHeadings: true,
  },
];

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
            {divisions
              .filter((division) => division.groups.length > 0)
              .map((division) => (
                <div
                  aria-labelledby={`certifications-${division.id}-title`}
                  className="flex flex-col gap-8"
                  key={division.id}
                  role="group"
                >
                  <h2
                    className="font-website-display text-website-text-muted m-0 text-sm font-normal tracking-tighter"
                    id={`certifications-${division.id}-title`}
                  >
                    {division.label}
                  </h2>
                  {division.groups.map((group) => (
                    <section
                      aria-label={
                        division.showGroupHeadings ? undefined : group.label
                      }
                      aria-labelledby={
                        division.showGroupHeadings
                          ? `certifications-${group.id}`
                          : undefined
                      }
                      className="@container"
                      key={group.id}
                    >
                      {division.showGroupHeadings ? (
                        <h3
                          className="font-website-display m-0 mb-4 text-sm font-normal tracking-tighter"
                          id={`certifications-${group.id}`}
                        >
                          {group.label}{" "}
                          <span className="text-website-text-muted">
                            · {group.items.length}
                          </span>
                        </h3>
                      ) : null}
                      <motion.ul
                        className="m-0 grid list-none grid-cols-1 gap-6 p-0 max-[760px]:gap-4 @lg:grid-cols-2 @3xl:grid-cols-3"
                        initial={reduceMotion ? false : "hidden"}
                        variants={staggerContainer}
                        viewport={revealViewport}
                        whileInView={reduceMotion ? undefined : "visible"}
                      >
                        {group.items.map((certification) => (
                          <motion.li
                            key={certification.id}
                            variants={staggerItem}
                          >
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
