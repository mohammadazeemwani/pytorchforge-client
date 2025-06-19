import React from 'react';
import { cn } from '~/utils/general';

type SideBarProps = {
  variant: 'sidebar' | 'first-paint'
} & React.ComponentProps<'section'>

function SideBar({ variant, className, ...delegated}: SideBarProps) {
  return (
    <section
      className={cn(
        '',
        className
      )}
      {...delegated}
    >
      {variant === 'sidebar' && (
        <div>
          <p>Version number</p>
          <p>We will put sitemap links here</p>
          <p>Home</p>
          <p>Inference</p> ... etc
        </div>
      )}
    
      {variant === 'first-paint' && (
        <div>
          <p>Not sidebar content</p>
          <p></p>
          <p>Not sidebar content</p>
        </div>
      )}
    </section>
  );
}

export default SideBar;
