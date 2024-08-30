import React from "react";

const SocialsButton = ({ icon, link, text }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center p-4 hover:bg-95-navy hover:text-95-white cursor-pointer">
        <img src={icon} alt={text} className="w-6 h-6 mr-3" />
        <span className="first-letter:underline">{text}</span>
      </div>
    </a>
  );
};

export default SocialsButton;
