import React from "react";

const InputField = ({ name, type = "text", placeholder, value, onChange }) => {
  return type === "textarea" ? (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full h-full p-1 overflow-auto resize-none focus:outline-none focus:rounded-sm focus:border-95-black focus:border-2 bg-transparent text-95-white"
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
