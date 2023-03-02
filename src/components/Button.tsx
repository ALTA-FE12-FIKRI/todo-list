import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button className="bg-gray-600 border border-black-500" {...props} >
      {label}
    </button>
  );
};

export default Button;