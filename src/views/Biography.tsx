const imagecuzz = "/assets/Biography/mememe.jpg";
import type { ReactElement } from "react";
import { calculateAge } from "../utils/birthday";

const Biography = (): ReactElement => {
  const birthDate = new Date(2002, 9, 9); //Year, Month - 1, Day
  const age = calculateAge(birthDate);

  return (
    <div className="bg-95-gray px-12 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center">
          <img
            src={imagecuzz}
            alt="Andrei Huyo-a"
            className="h-auto w-full max-w-xs md:max-w-md lg:max-w-lg"
          />
        </div>
        <h2 className="font-MS95 py-2 text-2xl font-extrabold">
          Carl Andrei H. Del Rosario
        </h2>
        <div className="flex flex-col gap-2 text-xs font-medium text-gray-700">
          <h4>Full Stack Developer • Computer Science @ Adamson University</h4>
          <h4>Philippines 📍</h4>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 *:h-5 *:w-auto *:rounded-none *:text-xs">
          <img
            alt="TypeScript"
            src="https://img.shields.io/badge/-TypeScript-3B82F6"
          />
          <img alt="Go" src="https://img.shields.io/badge/-Go-60A5FA" />
          <img alt="Python" src="https://img.shields.io/badge/-Python-3B82F6" />
          <img
            alt="Next.js"
            src="https://img.shields.io/badge/-Next.js-2563EB"
          />
          <img alt="React" src="https://img.shields.io/badge/-React-1D4ED8" />
          <img alt="AWS" src="https://img.shields.io/badge/-AWS-1E40AF" />
          <img alt="Docker" src="https://img.shields.io/badge/-Docker-1E3A8A" />
          <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-172554" />
          <img
            alt="PostgreSQL"
            src="https://img.shields.io/badge/-PostgreSQL-0F172A"
          />
        </div>
        <div className="pt-4">
          <h3 className="font-600 font-MS95 pb-1 text-lg underline decoration-dotted underline-offset-2">
            About Me
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              I&apos;m a {age}-year-old full stack developer and Computer
              Science student at Adamson University. I&apos;m currently working
              at Shinka Studios, where I build and maintain features for a land
              sales web application using Next.js and Go, while also doing my
              internship at Strastan Solutions Corp.
            </p>
            <p>
              My focus these days is shifting toward cloud engineering.
              I&apos;ve been working with AWS services and containerization
              tools like Docker, and I&apos;m actively learning more about its
              infrastructure, scalability, and cloud-native architectures. I
              find the challenge of designing systems that can handle scale and
              reliability really engaging.
            </p>
            <p>
              In my current role at Shinka Studios, I contribute to a
              production-grade web platform by improving data flows between
              frontend and backend services, building internal tooling for sales
              report generation and operational visibility, and delivering
              reliable features and fixes. I keep implementation details
              high-level while focusing on engineering fundamentals:
              correctness, maintainability, and performance. In parallel, my
              internship at Strastan Solutions Corp is strengthening my
              day-to-day practices in a professional engineering environment.
              Before these roles, I built the backend for Hilom, a Healthcare
              Facility Recommender System that suggests hospitals and clinics
              based on required medical services and user location. The project
              combined content-based filtering with geospatial ranking (via
              distance calculations) and used a validated dataset of healthcare
              facilities in Ermita, Manila, alongside synthetic interaction data
              for model training and evaluation. In our experiments, the system
              achieved a Mean Average Precision (MAP) of 0.67 and generated
              recommendations with ~70ms average latency.
            </p>
            <p>
              When I&apos;m not coding, I enjoy reading and listening to music.
              I&apos;m always open to connecting with others in tech, especially
              those working in cloud infrastructure and distributed systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
