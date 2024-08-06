import { FieldError } from "react-hook-form";

export const ErrorMessage: React.FC<{ error: FieldError | undefined }> = ({
  error,
}) =>
  error ? (
    <p className="text-xs ml-2.5 text-red-500 mt-2">{error.message}</p>
  ) : null;
