interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  onClick,
  children,
  variant = "primary",
  type,
  className,
}: ButtonProps): JSX.Element => {
  const primaryStyle = "bg-white text-black hover:bg-gray-300";
  const outlineStyle = "border border-white text-white hover:bg-zinc-600";
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 w-20 rounded text-base font-semibold duration-150 ${
        variant === "primary" ? primaryStyle : outlineStyle
      } ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};
