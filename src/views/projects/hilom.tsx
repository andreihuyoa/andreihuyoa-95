import type { ReactElement } from "react";

const HILOM_SHOWCASE = "/assets/Projects/Hilom/hilom-mobile-3.png";
const HILOM_LIVE_URL = "https://csrp.andreihuyoa.dev";

const Hilom = (): ReactElement => {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6 md:px-12">
      <div className="flex w-full min-w-0 flex-col gap-1">
        <figure className="mx-auto w-full max-w-full">
          <img
            src={HILOM_SHOWCASE}
            alt="Hilom mobile app — service selection and facility map"
            className="mx-auto block h-auto w-full max-w-2xl object-contain"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <h2 className="font-MS95 py-2 text-xl font-extrabold sm:text-2xl">
          Hilom
        </h2>
        <p className="text-sm text-gray-700">
          Ermita Healthcare Facility Finder — thesis project
        </p>
        <p className="text-sm text-cyan-800">
          📍{" "}
          <a
            href={HILOM_LIVE_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2"
          >
            Link to the website
          </a>
        </p>
        <div className="flex flex-wrap items-center gap-2 *:h-5 *:w-auto *:rounded-none *:text-xs">
          <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB" />
          <img
            alt="Machine Learning"
            src="https://img.shields.io/badge/-Machine Learning-00ADD8"
          />
          <img
            alt="Next.js"
            src="https://img.shields.io/badge/-Next.js-black"
          />
          <img alt="AWS" src="https://img.shields.io/badge/-AWS-232F3E" />
          <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED" />
        </div>
        <div className="pt-4">
          <h3 className="font-600 font-MS95 pb-1 text-lg underline decoration-dotted underline-offset-2">
            About This Project
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              As part of our thesis, I built the backend for Hilom (Healthcare
              Facility Recommender System), which recommends hospitals and
              clinics based on a user&apos;s required medical services and their
              approximate location. The system combines content-based matching
              (service availability and facility attributes) with geospatial
              ranking using distance calculations (Haversine) to prioritize
              nearby, relevant options.
            </p>
            <p>
              The dataset was curated and validated for healthcare facilities in
              Ermita, Manila, and we generated synthetic interaction records to
              train and evaluate the ranking model. In our experiments, the
              recommender achieved a Mean Average Precision (MAP) of 0.67 and
              produced results with ~70ms average latency. The ranking API was
              packaged with Flask and Docker; the mobile-friendly finder UI is
              live at{" "}
              <a
                href={HILOM_LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-800 underline decoration-dotted underline-offset-2"
              >
                this website
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hilom;
