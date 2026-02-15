const InputField = ({ name, type = "text", placeholder, value, onChange }) => {
  return type === "textarea" ? (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      spellCheck={false}
      className="text-95-black focus:outline-95-darkgray focus:border-95-white spellcheck h-full w-full resize-none overflow-auto bg-transparent p-1 focus:rounded-sm focus:border focus:outline focus:outline-1"
    />
  ) : (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      className="text-95-black w-full bg-transparent focus:ring-0 focus:outline-none"
      onChange={onChange}
    />
  );
};

export default InputField;
