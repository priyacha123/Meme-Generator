"use client";
import { cn } from "../../lib/utils";

export const ButtonsCard = ({
  children,
  className,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-15 w-full bg-white overflow-hidden relative flex items-center justify-center",
        className
      )}>
      <div className="absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
