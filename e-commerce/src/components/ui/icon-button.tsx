import { HTMLAttributes, ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: ReactElement;
}

const IconButton = ({ icon, className, ...rest }: IconButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'flex items-center justify-center rounded-full border bg-white p-2 shadow-md transition duration-200 hover:scale-110',
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
