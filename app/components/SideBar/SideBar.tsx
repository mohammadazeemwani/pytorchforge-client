import React from 'react';
import { cn } from '~/utils/general';
import ApplicationVersion from '../ApplicationVersion';
import { Link as NativeLink, useLocation } from 'react-router';
import { links } from './links';
import { motion } from 'motion/react';
const Link = motion.create(NativeLink)

type SideBarProps = {} & React.ComponentProps<'div'>

function SideBar({ className, ...delegated}: SideBarProps) {
  const location = useLocation()

  return (
  <div 
    className={cn(
      'prose dark:prose-invert relative',
      className
    )}
    {...delegated}
  >
    <ApplicationVersion />
    <div className='divider divider-base divider-start mt-9 mb-6'>Section</div>
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
  );
}

export default SideBar;
