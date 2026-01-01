const imagecuzz = "/assets/Biography/mememe.jpg";
import { calculateAge } from "../utils/birthday";

const Biography = () => {
  const birthDate = new Date(2002, 9, 9); //Year, Month - 1, Day
  const age = calculateAge(birthDate);

  return (
    <div className="bg-95-gray px-12 py-6">
      <div className="flex flex-col gap-1">
        <img
          src={imagecuzz}
          alt="Andrei Huyo-a"
          className="h-auto w-full max-w-xs md:max-w-md lg:max-w-lg"
        />
        <h2 className="py-2 font-MS95 text-2xl font-extrabold">
          Carl Andrei H. Del Rosario
        </h2>
        <div className="flex flex-col gap-2 text-xs font-medium text-gray-700">
          <h4>Full Stack Developer • Computer Science @ Adamson University</h4>
          <h4>Philippines 📍</h4>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 *:h-5 *:w-auto *:rounded-none *:text-xs">
          <img
            alt="TypeScript"
            src="https://img.shields.io/badge/-TypeScript-blue"
          />
          <img
            alt="JavaScript"
            src="https://img.shields.io/badge/-JavaScript-yellow"
          />
          <img alt="Go" src="https://img.shields.io/badge/-Go-00ADD8" />
          <img alt="Python" src="https://img.shields.io/badge/-Python-3776AB" />
          <img
            alt="Next.js"
            src="https://img.shields.io/badge/-Next.js-black"
          />
          <img alt="React" src="https://img.shields.io/badge/-React-61DAFB" />
          <img alt="AWS" src="https://img.shields.io/badge/-AWS-232F3E" />
          <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED" />
          <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1" />
          <img
            alt="PostgreSQL"
            src="https://img.shields.io/badge/-PostgreSQL-336791"
          />
        </div>
        <div className="pt-4">
          <h3 className="font-600 pb-1 font-MS95 text-lg underline decoration-dotted underline-offset-2">
            About Me
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              I&apos;m a {age}-year-old full stack developer and Computer
              Science student at Adamson University. I recently worked at Shinka
              Studios, where I built and maintained features for production
              applications using Next.js and Go, and I&apos;m now focusing on
              finishing my degree while transitioning toward cloud engineering.
            </p>
            <p>
              My focus these days is shifting toward cloud engineering.
              I&apos;ve been working with AWS services and containerization
              tools like Docker, and I&apos;m actively learning more about
              infrastructure, scalability, and cloud-native architectures. I
              find the challenge of designing systems that can handle scale and
              reliability really engaging.
            </p>
            <p>
              During my time at Shinka Studios, I&apos;ve worked on optimizing
              data flows between frontend and backend systems, refactored
              browser extensions for web scraping automation, and consistently
              delivered features and bug fixes. Before that, I led the
              development of Lokalista, a full-stack freelancer management
              platform that integrated payment processing and email services.
              The project caught the attention of our department and we got to
              present it at Adamson&apos;s AduNest Incubation Camp.
            </p>
            <p>
              I also worked on a healthcare recommendation system that I built
              for my thesis, developing the frontend, backend, and neural model
              from scratch. The system recommends facilities based on
              users&apos; location and medical service preferences, combining
              content-based filtering with neural networks and geospatial
              algorithms. The system achieved a Mean Average Precision (MAP) of
              0.65 and 80.7% Recall@5, meeting the required recommendation
              quality metrics for the project.
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
