import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-dark hover:to-secondary-dark",
        outline:
          "border-4 border-border bg-transparent text-white hover:bg-primary/10",
        ghost: "text-gray-400 hover:text-primary",
        nav: "bg-muted text-white hover:bg-primary-dark p-2 rounded-full",
        presale:
          "w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:from-primary-dark hover:to-secondary-dark",
        hero: "w-full sm:w-auto bg-muted text-white hover:bg-primary/10 relative overflow-hidden group",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
