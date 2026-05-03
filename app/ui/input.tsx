"use client";

import React from "react";

type InputProps = {
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  className = "",
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <span className="px-3">{name}</span>
      <input
        placeholder={placeholder}
        className={`bg-white text-black p-3 rounded-xl border ${className}`}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Input;
