import * as React from 'react';
import { links } from './links';
import type { MotionProps } from 'motion/react';
import { motion } from 'motion/react';
import { useLocation, Link as NativeLink } from 'react-router';
import { cn } from '~/utils/general';
const Link = motion.create(NativeLink)


type MainLinksBarProps = {} & React.ComponentProps<'div'> & MotionProps

export function MainLinksBarForHome({ className, ...delegated}: MainLinksBarProps) {
  const location = useLocation();

  return (
    <motion.div 
      className={cn(
        'bg-base-200',
        'mr-7 flex gap-5 items-center rounded-[0.85rem]',
        'pt-2.5 pb-4 px-3',
        className
      )}
      layoutId='main-links-bar-container'
      // initial={{ opacity: 0}}
      // animate={{ opacity: 1}}
      // transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}

      {...delegated}
    >
      {links.map((link, i) => (
        <Link 
          key={i} 
          to={link.href}
          className={cn(
            'no-underline',
            'relative rounded-[0.55rem]',
            'py-[0.3rem] px-3',
            'text-[1.16rem]',
          )}
          layout="position"
          layoutId={`sidebar-first-paint-${link.label}`}  
          transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}
        >
          {location.pathname === link.href && (
            <motion.div 
              className='z-1 absolute inset-0 header-btn-active rounded-[0.55rem]' 
              layoutId='current-sidebar-first-paint-route-style'
            />
          )}
          <span 
            className='z-2 relative'
          >
            {link.label}
          </span> 
        </Link>
      ))}
      </motion.div>
  );
}