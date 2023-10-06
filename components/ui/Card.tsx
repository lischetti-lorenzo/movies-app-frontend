type CardProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`w-80 md:w-screen md:max-w-xl login-form bg-primary-color p-8 rounded-md flex flex-col gap-8 ${className}`}
    >
      {children}
    </div>
  );
}
