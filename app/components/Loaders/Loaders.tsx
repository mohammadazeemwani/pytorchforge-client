import * as React from 'react';
import { cn } from '~/utils/general';
import './style.css'

type LoadersProps = {
  /** keep this the name of div in styles file */
  variant: 'settings'
} & React.ComponentProps<'div'>

function Loaders({ className, variant }: LoadersProps) {
  return (
    <div
      className={cn(
        '',
        variant,
        className,
      )}
    >
    </div>
  );
}

export default Loaders;
