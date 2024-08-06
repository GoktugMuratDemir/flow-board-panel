import { useFormContext } from "react-hook-form";

export const RHFFormValues = () => {
  const { watch } = useFormContext();
  const values = watch();

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(values).map(([key, value]) => (
        <code key={key}>
          <span className="text-blue-500">{`${
            key.charAt(0).toUpperCase() + key.slice(1)
          }:`}</span>
          {JSON.stringify(value, null, 2)}
        </code>
      ))}
    </div>
  );
};
