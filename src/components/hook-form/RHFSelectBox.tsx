import { FC, SelectHTMLAttributes } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { ErrorMessage } from "./RHFErrorMessage";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
}

export const RHFSelectBox: FC<SelectProps> = ({
  name,
  label,
  options,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error: FieldError | undefined = errors[name] as FieldError;

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <select
        id={name}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm hover:border-indigo-500 transition-colors duration-200"
        {...register(name)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
};
