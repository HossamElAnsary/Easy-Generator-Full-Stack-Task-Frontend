import clsx from "clsx";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant,
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-md',
  lg: 'px-7 py-4 text-lg',
};

const baseStyle = `transition duration-300`;

const styles: Record<ButtonVariant, string> = {
  primary: `${baseStyle} w-full py-3 text-white text-base font-medium rounded-full
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:opacity-90 transition`,
  secondary: `${baseStyle} inline-block px-8 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition`,
  tertiary: `${baseStyle} bg-white text-red rounded-full hover:bg-blue hover:text-white `,
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = 'primary',
  className = '',
  size = 'md',
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={clsx(
        styles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;