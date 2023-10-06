import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "xs";
  key?: string;
};

const buttonVariants = cva(
  "flex justify-center items-start relative cursor-pointer hover:opacity-80 transition-all duration-200",
  {
    variants: {
      intent: {
        primary: "rounded-md bg-button-accent text-tertiary-color",
        ghost: "p-4 bg-transparent text-button-accent",
        outline:
          "w-full bg-transparent text-primary-color border rounded-md border-current",
      },
      size: {
        xs: "py-1 px-1",
        sm: "py-3 px-4",
        md: "py-4 px-8",
      },
    },
  }
);

function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        buttonVariants({ intent: variant, size: size }),
        disabled &&
          "bg-button-disabled-accent text-white cursor-not-allowed hover:opacity-100",
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { PrimaryButton, buttonVariants };
