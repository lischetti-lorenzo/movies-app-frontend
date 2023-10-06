type WrapperProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={`min-h-full text-primary-color flex justify-center items-center bg-cover ${className}`}
    >
      {children}
    </div>
  );
}
