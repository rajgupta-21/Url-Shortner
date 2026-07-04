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
      className={`rounded-lg bg-blue-600 text-sm text-gray-600 cursor-pointer disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {buttonText}
    </button>
  );
};

export default Button;
