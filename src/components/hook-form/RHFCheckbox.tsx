import { FC, InputHTMLAttributes } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { ErrorMessage } from "./RHFErrorMessage";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const CheckedIcon: FC<{ watchValue: boolean }> = ({ watchValue }) =>
  watchValue ? (
    <svg
      className="absolute top-0 left-0 w-4 h-4 fill-current text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
    </svg>
  ) : null;

export const RHFCheckbox: FC<CheckboxProps> = ({ name, label, ...props }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const error: FieldError | undefined = errors[name] as FieldError;
  const watchValue = watch(name);

  return (
    <div className="relative">
      <input
        id={name}
        type="checkbox"
        className="hidden"
        {...register(name)}
        {...props}
      />
      <label htmlFor={name} className="cursor-pointer">
        <div className="w-4 h-4 border border-gray-300 rounded inline-block mr-2 align-middle"></div>
        {label}
      </label>
      <ErrorMessage error={error} />
      <CheckedIcon watchValue={watchValue} />
    </div>
  );
};
