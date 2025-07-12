import * as React from "react"
import { cn } from "~/utils/general"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "input ",
        "aria-invalid:input-error rounded-selector",
        className
      )}
      {...props}
    />
  )
}

export { Input }
