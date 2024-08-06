"use client"
import { FC, InputHTMLAttributes, useState } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { ErrorMessage } from "./RHFErrorMessage";
import SvgColor from "../SvgColor";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  helperText?: string;
}

const PasswordToggleButton: FC<{
  onClick: () => void;
  isPasswordVisible: boolean;
}> = ({ onClick, isPasswordVisible }) => (
  <button
    className="text-gray-500 absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
    type="button"
    onClick={onClick}
  >
    <SvgColor
      width={24}
      height={24}
      src={`/src/assets/icons/ic_password_${
        isPasswordVisible ? "eye-close" : "eye"
      }.svg`}
    />
  </button>
);

export const RHFTextfield: FC<InputProps> = ({
  name,
  label,
  type = "text",
  helperText,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error: FieldError | undefined = errors[name] as FieldError;
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () =>
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));

  // ${inputType === "password" ? "font-black tracking-widest" : ""}

  return (
    <div>
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={label}
          className={`font-medium text-base border ${
            error ? "border-red" : "border-gray-50"
          } rounded-lg px-4 py-5 w-full bg-gray-150  focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-green-500"
          } focus:border-transparent focus:placeholder-transparent`}
          {...register(name)}
          {...props}
        />

        {type === "password" && (
          <PasswordToggleButton
            onClick={togglePasswordVisibility}
            isPasswordVisible={inputType === "password"}
          />
        )}
      </div>
      {helperText && <p className="ml-2.5 mt-1 text-gray-300">{helperText}</p>}
      <ErrorMessage error={error} />
    </div>
  );
};
