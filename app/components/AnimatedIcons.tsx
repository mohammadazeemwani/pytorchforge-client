import { 
  Cog as RawCog,
  RotateCwIcon as RawRotateCwIcon
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "~/utils/general";

export function Cog({ className }: LucideProps) {
  return (
    <RawCog 
      className={cn(
        'transition-transform duration-300 ease-out',
        'hover:rotate-[55deg] focus:rotate-[55deg]',
        'hover:scale-[1.09] focus:scale-[1.09]',
        className
      )}
    />
  )
}
export function RotateCwIcon({ className }: LucideProps) {
  return(
    <RawRotateCwIcon 
      className={cn(
        'transition-transform duration-300 ease-out',
        'hover:rotate-[55deg] focus:rotate-[35deg]',
        className
      )}
    />
  )
}