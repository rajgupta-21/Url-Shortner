"use client";

import React from "react";

type ButtonProps = {
  buttonText: string;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  buttonText,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={` rounded-lg bg-blue-600 text-gray-600 text-sm cursor-pointer ${className}`}
      {...rest}
    >
      {buttonText}
    </button>
  );
};

export default Button;
