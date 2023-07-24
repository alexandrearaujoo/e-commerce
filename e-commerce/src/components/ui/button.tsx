'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button
        {...rest}
        ref={ref}
        className={cn(
          'w-auto rounded-full border-transparent bg-black px-5 py-3 font-semibold text-white transition duration-200 hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
