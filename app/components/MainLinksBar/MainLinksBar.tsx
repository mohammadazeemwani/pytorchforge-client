import * as React from 'react';
import { links } from './links';
import type { MotionProps } from 'motion/react';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router';
import { cn } from '~/utils/general';
import ApplicationVersion from '../ApplicationVersion';
// const Link = motion.create(NativeLink)


type MainLinksBarProps = {
  showVersion?: boolean,
  showHorizontalRow?: boolean,
  linksContainerClass?: string,
  /** 
   * This will overwrite the default logic for showing the container which as of now is to show only on selective routes
   * 💀 But if set true, make sure it is not called somewhere else true on same page or the selective logic is not making it true
   * @default false
   */
  showStateOfMainLinkBar?: boolean
} & React.ComponentProps<'div'> & MotionProps

function MainLinksBar({ className, showVersion=true, showHorizontalRow=true, linksContainerClass, showStateOfMainLinkBar=false, ...delegated}: MainLinksBarProps) {
  const location = useLocation();
  const showMainLinksBar = React.useMemo(() => {
    return showStateOfMainLinkBar || links.map(l => l.href).includes(location.pathname)
  }, [location])
  
  return (
    <motion.div 
      className={cn(
        'bg-base-200',
        'mr-7 flex flex-col items-center rounded-[0.85rem]',
        'pt-2.5 pb-4 px-3',
        'origin-top',
        !showMainLinksBar && 'hidden',
        className
      )}
      layoutId='main-links-bar-container'

      {...delegated}
    >
      {showVersion && (
        <ApplicationVersion 
          className={cn(
            'py-1 rounded-lg',
          )}
        />
      )}
      {showHorizontalRow && (
        <div
          className={cn(
            'divider w-[67%] mx-auto',
          )}
        />
      )}
      <div
        className={cn(
          'flex flex-col gap-5',
          linksContainerClass
        )}
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
          >
            {location.pathname === link.href && (
              <motion.div 
                className='z-1 absolute inset-0 header-btn-active rounded-[0.55rem]' 
                layoutId='current-sidebar-first-paint-route-style'
              />
            )}
            <motion.span 
              className='z-2 relative'
              layout="position"
              layoutId={`sidebar-first-paint-${link.label}`}  
            >
              {link.label}
            </motion.span> 
          </Link>
        ))}
        </div>
      </motion.div>
  );
}

export default MainLinksBar;
