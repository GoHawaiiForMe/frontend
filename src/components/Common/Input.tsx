import React, { forwardRef } from "react";
import Image from "next/image";
import icon_visible_off from "@public/assets/icon_visibility_off.svg";
import icon_visible_on from "@public/assets/icon_visibility_on.svg";

type InputProps = {
  type: "text" | "password" | "textarea";
  value?: string;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"input">, "type"> &
  Omit<React.ComponentPropsWithoutRef<"textarea">, "type">;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      type,
      name,
      value,
      onChange,
      placeholder = "",
      className = "",
      error = false,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const inputType =
      type === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`mb-4 h-40 w-full resize-none rounded-xl border bg-color-gray-50 p-4 ${className}`}
          {...rest}
        />
      ) : type === "password" ? (
        <div className="relative">
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={isPasswordVisible ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-16 w-full rounded-xl border p-4 pc:text-xl mobile-tablet:text-lg ${
              error ? "border-color-red-200" : "border-color-blue-300"
            } ${className}`}
            {...rest}
          />
          <Image
            src={isPasswordVisible ? icon_visible_on : icon_visible_off}
            onClick={togglePasswordVisibility}
            width={24}
            height={24}
            alt={isPasswordVisible ? "비밀번호 보기" : "비밀번호 감추기"}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        </div>
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={`h-16 w-full rounded-xl border p-4 pc:text-xl mobile-tablet:text-lg ${
            error ? "border-color-red-200" : "border-color-blue-300"
          } ${className}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
      );

    return (
      <div>
        {label && (
          <label className="semibold mb-4 block pc:text-xl mobile-tablet:text-lg" htmlFor={name}>
            {label}
          </label>
        )}
        {inputType}
      </div>
    );
  },
);

export default Input;
