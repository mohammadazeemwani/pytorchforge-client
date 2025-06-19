import React from 'react';
import { cn } from '~/utils/general';
import ApplicationVersion from '../ApplicationVersion';

type SideBarProps = {
  variant: 'sidebar' | 'first-paint'
} & React.ComponentProps<'section'>

function SideBar({ variant, className, ...delegated}: SideBarProps) {
  return (
    <section
      className={cn(
        variant === 'sidebar' && 'z-2',
        '',
        className
      )}
      {...delegated}
    >
      {variant === 'sidebar' && (
        <div className='prose dark:prose-invert'>
          <ApplicationVersion />
          <hr />
          <div>
            <p>Version number</p>
            <p>We will put sitemap links here</p>
            <p>Home</p>
            <p>Inference</p> ... etc
          </div>
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
