import React from "react";
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
          <h4>Computer Science Undergrad @ Adamson University • Lokalista</h4>
          <h4>Philippines 📍</h4>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 *:h-5 *:w-auto *:rounded-none *:text-xs">
          <img alt="Laravel" src="https://img.shields.io/badge/-Laravel-red" />
          <img alt="PHP" src="https://img.shields.io/badge/-PHP-blue" />
          <img
            alt="Javascript"
            src="https://img.shields.io/badge/-Javascript-yellow"
          />
          <img
            alt="HTML/CSS"
            src="https://img.shields.io/badge/-HTML%2FCSS-bluegreen"
          />
          <img alt="Figma" src="https://img.shields.io/badge/-Figma-8c5aee" />
          <img alt="Git" src="https://img.shields.io/badge/-Git-c29d62" />
        </div>
        <div className="pt-4">
          <h3 className="font-600 pb-1 font-MS95 text-lg underline decoration-dotted underline-offset-2">
            About Me
          </h3>
          <div className="*:pb-2.5 *:text-sm *:font-light *:text-gray-700">
            <p>
              I&apos;m a {age} year old Computer Science Student at day and a
              gamer at night! Creating fun and impactful software that serves me
              and people around me is my drive and passion.
            </p>
            <p>
              I love staying up to date with the latest tech trends and
              development frameworks across all platforms. While I normally
              dwell in app design and development, I also love development in
              different platforms.
            </p>
            <p>
              At 21, for our thesis we along with my co-student at Adamson
              University made Lokalista. It gained the attention of our computer
              science department, earning an invitation to present and showcase
              our program at Adamson University&apos;s Neo Science and
              Technology Incubation Center (AduNest) annual Incubation Camp.
            </p>
            <p>
              I always look forward to collaborate and gain experience with
              companies, and people in diverse fields, including (but not
              limited to😹) e-commerce, art, and design industries.
            </p>
            <p>
              In my spare time, I enjoy listening to music and read my books in
              my room, which helps me to unwind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
