import React from 'react';
import { cn } from '~/utils/general';
import ApplicationVersion from '../ApplicationVersion';
import { Link, useLocation } from 'react-router';
import { links } from './links';
import { motion } from 'motion/react';

type SideBarProps = {
  variant: 'sidebar' | 'first-paint'
} & React.ComponentProps<'section'>

function SideBar({ variant, className, ...delegated}: SideBarProps) {
  const location = useLocation();

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
        <div className='prose dark:prose-invert relative'>
          <ApplicationVersion />
          <div className='divider divider-base divider-start'>Section</div>
          <div className='flex flex-col gap-5'>
            {links.map((link, i) => (
              <Link 
                key={i} 
                to={link.href}
                className={cn(
                  'no-underline',
                  'relative rounded-[0.55rem]',
                  'py-[0.15rem] px-3',
                  'text-[1.16rem]',
                )}  
              >
                {location.pathname === link.href && (
                  <motion.div 
                    className='z-1 absolute inset-0 header-btn-active rounded-[0.55rem]' 
                    layoutId='current-sidebar-route-style'
                  />
                )}
                <span className='z-2 relative'>{link.label}</span> 
              </Link>
            ))}
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
