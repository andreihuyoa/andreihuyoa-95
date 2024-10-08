import React from "react";
import imageKo from "../assets/Biography/mememe.jpg";
import { calculateAge } from "../assets/utils/birthday";

const Biography = () => {
  const birthDate = new Date(2002, 9, 9); //Year, Month - 1, Day
  const age = calculateAge(birthDate);

  return (
    <div className="bg-95-gray px-12 py-6">
      <div>
        <img
          src={imageKo}
          alt="Andrei Huyo-a"
          className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
        />
        <h2 className="font-MSW98UIBold text-2xl py-5">Carl Andrei H. Del Rosario</h2>
        <h4 className="text-gray-600 font-medium text-xs">
          Computer Science Undergrad @ Adamson University • Lokalista
        </h4>
        <h4 className="">Philippines 📍</h4>
        <div className="flex flex-wrap mt-5 gap-2 items-center *:w-auto *:h-5 *:rounded-none *:text-xs ">
          <img alt="Laravel" src="https://img.shields.io/badge/-Laravel-red" />
          <img alt="PHP" src="https://img.shields.io/badge/-PHP-blue" />
          <img alt="Javascript" src="https://img.shields.io/badge/-Javascript-yellow" />
          <img alt="HTML/CSS" src="https://img.shields.io/badge/-HTML%2FCSS-bluegreen" />
          <img alt="Figma" src="https://img.shields.io/badge/-Figma-8c5aee" />
          <img alt="Git" src="https://img.shields.io/badge/-Git-c29d62" />
        </div>
        <div className="pt-7">
          <h3 className="underline underline-offset-2 decoration-dotted   font-MSW98UIBold text-md pb-1">
            About Me
          </h3>
          <div className="*:font-thin *:text-sm *:pb-2.5">
            <p>
              I&apos;m a {age} year old Computer Science Student at day and a gamer at night!
              Creating fun and impactful software that serves me and people around me is my drive
              and passion.
            </p>
            <p>
              I love staying up to date with the latest tech trends and development frameworks
              across all platforms. While I normally dwell in app design and development, I also
              love development in different platforms.
            </p>
            <p>
              At 21, for our thesis we along with my co-student at Adamson University made
              Lokalista. It gained the attention of our computer science department, earning an
              invitation to present and showcase our program at our Adamson University&apos;s Neo
              Science and Technology Incubation Center (AduNest) annual Incubation Camp.
            </p>
            <p>
              I always look forward to collaborate and gain experience with companies, and people in
              diverse fields, including (but not limited to😹) e-commerce, art, and design
              industries.
            </p>
            <p>
              In my spare time, I enjoy listening to music and read my books in my room, which helps
              me to unwind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
