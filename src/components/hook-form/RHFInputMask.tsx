import { FC, InputHTMLAttributes } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { ErrorMessage } from "./RHFErrorMessage";
import InputMask from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  mask?: string;
  helperText?: string;
}

export const RHFInputMask: FC<InputProps> = ({
  name,
  label,
  mask = "999-999-9999",
  helperText,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error: FieldError | undefined = errors[name] as FieldError;

  return (
    <div>
      <div className="relative">
        <InputMask
          id={name}
          mask={mask || ""}
          alwaysShowMask
          placeholder={label}
          className={`font-medium text-base border ${
            error ? "border-red" : "border-gray-50"
          } rounded-lg px-4 py-5 w-full bg-gray-150 focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-green-500"
          } focus:border-transparent focus:placeholder-transparent`}
          {...register(name)}
          {...props}
        />
      </div>
      {helperText && <p className="ml-2.5 mt-1 text-gray-300">{helperText}</p>}
      <ErrorMessage error={error} />
    </div>
  );
};
