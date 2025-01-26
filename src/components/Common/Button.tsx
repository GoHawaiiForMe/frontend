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
      className={`w-full py-4 bg-color-blue-300 bold rounded-2xl  text-xl mobile-tablet:text-lg ${disabled ? "bg-color-gray-100 cursor-not-allowed" : "bg-color-blue-300"
        } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
