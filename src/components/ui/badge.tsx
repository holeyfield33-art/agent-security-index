import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-fg text-bg",
        secondary: "border-transparent bg-muted text-fg",
        outline: "border-border text-fg",
        destructive: "border-transparent bg-red-700 text-white",
      },
      tone: {
        critical: "border-transparent bg-red-100 text-red-900",
        high: "border-transparent bg-orange-100 text-orange-900",
        medium: "border-transparent bg-amber-100 text-amber-900",
        low: "border-transparent bg-emerald-100 text-emerald-900",
        accent: "border-transparent bg-amber-50 text-accent",
        muted: "border-transparent bg-muted text-muted-fg",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, tone }), className)} {...props} />;
}
