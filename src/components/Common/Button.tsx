type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  label,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bold w-full rounded-2xl bg-color-blue-300 py-4 text-xl hover:scale-[1.01] mobile-tablet:text-lg ${
        disabled ? "cursor-not-allowed bg-color-gray-100" : "bg-color-blue-300"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
