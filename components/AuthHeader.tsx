import Link from 'next/link';
import { FC } from 'react';
import Button from './ui/Button';

interface AuthHeaderProps {
  prompt: string;
  actionText: string;
  href: string;
}

const AuthHeader: FC<AuthHeaderProps> = ({ prompt, actionText, href }) => (
  <header className="mb-8">
    <p className="flex justify-end items-center text-sm text-gray-600 gap-2">
      <span>{prompt}</span>
      <Link href={href}>
        <Button variant="tertiary" size="sm">{actionText}</Button>
      </Link>
    </p>
  </header>
);

export default AuthHeader;
