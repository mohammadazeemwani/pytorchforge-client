import { 
  Cog as RawCog,
  RotateCwIcon as RawRotateCwIcon,
  Trash2 as RawTrash2
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

export function Trash2({ className }: LucideProps) {
  return(
    <RawTrash2
      className={cn(
        'transition-transform duration-300 ease-out',
        'hover:animate-[wiggle_1s_ease-in-out_infinite] focus:animate-[wiggle_1s_ease-in-out_infinite]',
        className
      )}
    />
  )
}