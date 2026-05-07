import type { ReactElement } from "react";

const NotFound = (): ReactElement => {
  return (
    <div className="items-center justify-center px-12 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center">
          <img
            src="/assets/Projects/web-ss-replace-frontend-later.png"
            alt="404"
            className="h-auto w-48 max-w-xs md:max-w-md lg:max-w-md"
          />
        </div>
        <h2 className="font-MS95 py-2 text-2xl font-extrabold">
          Healthcare Recommendation API Model
        </h2>
        <p className="text-sm text-gray-700"> </p>
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
              As part of our thesis, I built the backend for CSRP (Healthcare
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
              produced results with ~70ms average latency. The project was
              packaged as a Flask API and deployed via Docker, available at{" "}
              <a
                href="https://csrp.andreihuyoa.dev/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-2"
              >
                csrp.andreihuyoa.dev
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
