import { InputHTMLAttributes, forwardRef } from "react";
import Eye from "@/public/icons/eye.svg";
import SlashEye from "@/public/icons/slash-eye.svg";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import FormInputError from "@/public/icons/form-input-error.svg";

type InputProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  name?: string;
  hasError?: boolean;
  errorText?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: HTMLInputElement["type"];
  customPrefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  onKeyPress?: (e: any) => void;
  isArea?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      hasError,
      errorText,
      className,
      inputClassName,
      labelClassName,
      type = "text",
      customPrefix,
      suffix,
      disabled,
      isArea = false,
      ...props
    }: InputProps,
    ref
  ) => {
    const [currentType, setCurrentType] =
      useState<HTMLInputElement["type"]>(type);
    const [slashEye, setSlashEye] = useState(false);

    return (
      <div className="gap-0 h-24 w-full">
        <div
          className={twMerge(
            "border-b-2 border-gray-400",
            disabled && "border-gray-300",
            hasError && "border-red-400",
            className
          )}
        >
          <label
            htmlFor={name}
            className={twMerge("text-sm block mx-2.5", labelClassName)}
          >
            {label}
          </label>
          <div className="flex w-full items-center">
            {customPrefix && (
              <div className={twMerge("pl-2.5", disabled && "text-gray-300")}>
                {customPrefix}
              </div>
            )}
            {isArea ? (
              <textarea
                id={name}
                name={name}
                ref={ref as any}
                className={twMerge(
                  "text-primary-color text-lg w-full pl-2.5 py-2",
                  disabled && " text-gray-300",
                  inputClassName
                )}
                {...props}
              ></textarea>
            ) : (
              <input
                id={name}
                name={name}
                ref={ref}
                type={currentType}
                className={twMerge(
                  "text-primary-color text-lg w-full pl-2.5 py-2",
                  disabled && " text-gray-300",
                  inputClassName
                )}
                {...props}
              ></input>
            )}
            {type === "password" && (
              <button
                key="bnew"
                name="bnew"
                type="button"
                onClick={() => {
                  setCurrentType(
                    currentType === "password" ? "text" : "password"
                  );
                  setSlashEye(!slashEye);
                }}
                className="ml-2"
              >
                {!slashEye && (
                  <Image src={Eye} alt="Eye" className="mr-2.5"></Image>
                )}
                {slashEye && (
                  <Image
                    src={SlashEye}
                    alt="Slash Eye"
                    className="mr-2.5"
                  ></Image>
                )}
              </button>
            )}
            {suffix && (
              <div className={twMerge("pr-2.5", disabled && "text-gray-300")}>
                {suffix}
              </div>
            )}
          </div>
        </div>
        {hasError && (
          <div className="flex mt-2 pl-2.5">
            <Image src={FormInputError} alt="input-error" />
            <span className="text-xs text-red-400 pl-2">{errorText}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
