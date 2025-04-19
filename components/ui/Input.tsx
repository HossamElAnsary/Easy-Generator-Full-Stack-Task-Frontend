import clsx from "clsx";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, className, ...rest }) => {

  return (
    label ? (
      <label className="flex flex-col gap-2">
        {label}
        <input
          type="text"
          id={rest.id || rest.name}
          className={clsx(`p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`, className)}
          {...rest}
        />
      </label>
    ) : (
      <input
        type="text"
        id={rest.id || rest.name}
        className={clsx(`border border-gray-300 rounded p-1`, className)}
        {...rest}
      />
    )
  );
};

export default Input;