import React from "react";
import { cn } from "~/utils/general";

type ToggleSidebarButtonProps = {} & React.ComponentProps<'label'>

export function ToggleSidebarButton({ className, ...delegated }: ToggleSidebarButtonProps) {
  return (
    <label 
      htmlFor="my-drawer-3" 
      aria-label="open sidebar" 
      className={cn(
        'bg-base-200',
        'flex items-center justify-center',
        className
      )}
      {...delegated}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-6 w-6 stroke-current mt-[-0.2rem]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </label>
  )
}