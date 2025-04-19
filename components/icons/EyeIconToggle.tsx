import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface EyeIconToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

const EyeIconToggle: FC<EyeIconToggleProps> = ({
  isOpen,
  className,
  ...buttonProps
}) => (
  <button
    type="button"
    tabIndex={-1}
    className={clsx(
      'absolute inset-y-0 right-3 flex items-center px-2 text-gray-400 focus:outline-none',
      className
    )}
    {...buttonProps}
  >
    {isOpen
      ? <EyeSlashIcon className="h-5 w-5" />
      : <EyeIcon      className="h-5 w-5" />
    }
  </button>
);

export default EyeIconToggle;
