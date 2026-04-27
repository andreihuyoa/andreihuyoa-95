import type { ChangeEventHandler, ReactNode } from "react";

type TextInputType = "email" | "password" | "search" | "tel" | "text" | "url";

interface BaseInputFieldProps {
  name: string;
  placeholder: string;
  value: string;
}

interface TextareaInputFieldProps extends BaseInputFieldProps {
  type: "textarea";
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

interface TextInputFieldProps extends BaseInputFieldProps {
  type?: TextInputType;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

type InputFieldProps = TextareaInputFieldProps | TextInputFieldProps;

const InputField = (props: InputFieldProps): ReactNode => {
  if (props.type === "textarea") {
    return (
    <textarea
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      spellCheck={false}
      className="text-95-black focus:outline-95-darkgray focus:border-95-white spellcheck h-full w-full resize-none overflow-auto bg-transparent p-1 focus:rounded-sm focus:border focus:outline focus:outline-1"
    />
    );
  }

  return (
    <input
      name={props.name}
      type={props.type ?? "text"}
      value={props.value}
      placeholder={props.placeholder}
      className="text-95-black w-full bg-transparent focus:ring-0 focus:outline-none"
      onChange={props.onChange}
    />
  );
};

export default InputField;
