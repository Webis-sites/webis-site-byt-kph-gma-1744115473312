import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary/70',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-secondary/70',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:ring-accent/70',
        text: 'text-foreground hover:bg-accent/20 active:bg-accent/30 focus-visible:ring-accent/70',
        glass: 'backdrop-blur-md bg-white/20 border border-white/30 shadow-glass text-foreground hover:bg-white/30 active:bg-white/40 focus-visible:ring-white/50',
        neumorphic: 'bg-neumorphic text-foreground shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed focus-visible:ring-foreground/30 transition-shadow',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
      rtl: {
        true: 'direction-rtl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      rtl: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rtl,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, rtl, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className={cn("mr-2", { "ml-2 mr-0 order-last": rtl })}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cn("ml-2", { "mr-2 ml-0 order-first": rtl })}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Utility function for class merging (to be placed in utils/cn.ts)
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }