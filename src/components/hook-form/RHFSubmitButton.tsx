type RHFSubmitButtonProps = {
  label?: string;
};

export const RHFSubmitButton: React.FC<RHFSubmitButtonProps> = ({
  label = "Submit",
}) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {label}
    </button>
  );
};
