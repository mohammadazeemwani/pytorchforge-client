import React from 'react';
import { cn } from '~/utils/general';
import ApplicationVersion from '../ApplicationVersion';
import { Link } from 'react-router';

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
          <div className='divider divider-base divider-start'>Section</div>
          <div>
            <Link to="/new-pipeline">New Pipeline</Link>
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
