import React from "react";

const InputField = ({ name, type = "text", placeholder, value, onChange }) => {
  return type === "textarea" ? (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      spellCheck={false}
      className="w-full h-full p-1 overflow-auto text-95-black resize-none focus:outline focus:outline-1 focus:outline-95-darkgray focus:border-95-white focus:border focus:rounded-sm bg-transparent spellcheck"
    />
  ) : (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className="w-full text-95-black bg-transparent focus:outline-none focus:ring-0"
      onChange={onChange}
    />
  );
};

export default InputField;
