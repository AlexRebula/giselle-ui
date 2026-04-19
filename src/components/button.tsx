import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function Button({ asChild = false, className, type = 'button', ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn('giselle-button', className)}
      {...props}
      {...(!asChild ? { type } : {})}
    />
  );
}
