import React from "react";
import imageKo from "../assets/Biography/mememe.jpg";
import { calculateAge } from "../assets/utils/birthday";

const Biography = () => {
  const birthDate = new Date(2002, 9, 9); //Year, Month - 1, Day
  const age = calculateAge(birthDate);

  return (
    //   some kind of component to wrap it, preferably a window like component
    <div className="bg-95-darkgray px-2">
      <h1>Biography</h1>
      <div>
        {/* Uncomment nalang, ang laki eh */}
        {/* <img src={imageKo} alt="Andrei Huyo-a" className="w-full h-auto" /> */}
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
              {/* Make this age auto update! */}
              I&apos;m a {age} year old Computer Science Student who&apos;s a god at day but a gamer
              at night! Crafting impactful software that serves my community and people around me is
              my passion
            </p>
            <p>
              I thrive on staying updated with the latest tech trends and development frameworks
              across all platforms. While my heart lies in app design and development, I also excel
              in cross-platform app and web development, which keeps the bills paid.
            </p>
            <p>
              At 21, I co-founded Lokalista along with my co-student from the Philippines. Since
              then, it has garnered attention, being featured on our school AduNest (Adamson
              University Neo Science and Technology Incubation Center), &apos;s annual Incubation
              Camp, and earning a nomination from Apple&apos;s regional team for their annual design
              awards.
            </p>
            <p>
              Having collaborated with diverse companies worldwide, from e-commerce to art and
              design industries, I&apos;ve honed the ability to manage multiple projects
              simultaneously across various time zones.
            </p>
            <p>
              In my spare time, I indulge in scrolling through analog camera listings or admiring my
              collection, although shooting has taken a backseat due to my various work commitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
