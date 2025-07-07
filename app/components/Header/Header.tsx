import * as React from 'react';
import { links } from './links';
import type { NavigationLinks } from './links';
import { Link as NativeLink, useLocation } from 'react-router';
import { cn } from '~/utils/general';
import { MainLogo } from '../MainLogo';
import ThemeToggler from '../ThemeToggler';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useWindowWidth } from '~/hooks/useWindowWidth';
import { ToggleSidebarButton } from '../SideBar/ToggleSidebarButton';
const Link = motion.create(NativeLink)

type HeaderProps = { } & React.ComponentProps<'header'>

function Header({ className }: HeaderProps) {
  const location = useLocation();
  const windowWidth = useWindowWidth();
  const showLogo = React.useMemo(() => location.pathname !== '/', [location.pathname])
  const containerRef = React.useRef<HTMLElement | null>(null)
  const [containerRect, setContainerRect] = React.useState<null | DOMRect>(null)
  const [hoveredLinkHref, setHoveredLinkHref] = React.useState<null | NavigationLinks['href']>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect())
    }
  }, [windowWidth])

  return (
    <LayoutGroup>
    <header 
      className={cn(
        'relative flex mt-[var(--header-gutter)] mb-[3rem] sm:mb-[2.2rem]',
        className
      )}
      ref={containerRef}
    >
      <div className='mr-auto flex items-center'>
        <ToggleSidebarButton 
          className={cn(
            'sidebarBreakpoint:hidden',
            'rounded-[0.8rem] h-[97%] px-[0.5rem] mr-3 sm:mr-4'
          )}
        /> 
        {showLogo && (
          <Link to="/" className='w-[2.9rem] lg:mb-[-0.2rem]'>
            <MainLogo className='w-[2.9rem] h-[2.9rem]' />
          </Link>
        )}
      </div>
      <nav 
        className={cn(
          'relative flex gap-5 justify-between items-center',
          'pr-[0.7rem] pl-[0.9rem] py-[0.28rem]',
          showLogo ? 'w-fit': `w-full`,
          'max-sidebarBreakpoint:w-fit',
        )}
        // layout="size"
        // animate={{ width: showLogo ? '30%': '100%' }}
        // animate={{ width: showLogo ? '': `${containerRect?.width}px` }}
        // animate={{ width: showLogo ? '230px': `${containerRect?.width}px` }}
        // transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001, from: 'left'}}
      >
        {links.map((link, i) => (
          <Link 
            layoutId={link.href}
            layout="position"
            transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}
            key={i} 
            to={link.href}
            className={cn(
              'relative rounded-[0.55rem]',
              'py-[0.15rem] px-3',
              'text-[1.16rem]',
            )}   
            onHoverStart={() => setHoveredLinkHref(link.href)}
            onHoverEnd={() => setHoveredLinkHref(null)}         
          >
            {location.pathname === link.href && (
              <motion.div 
                className='z-1 absolute inset-0 header-btn-active rounded-[0.55rem]' 
                layoutId='current-route-style'
              />
            )}
            <span className='z-2 relative'>{link.label}</span> 
          </Link>
        ))}
        <motion.div 
          className='w-fit inline'
          layoutId='theme-change-container'
          layout="position"
        >
          <ThemeToggler svgClass='w-[1.45rem]' />
        </motion.div>
      </nav>

      <motion.div 
        className={cn(
          'bg-base-200 rounded-[1rem]',
          'z-[-1] absolute top-0 bottom-0 right-0',
          'max-sidebarBreakpoint:w-[230px]!',
        )}
        layout
        animate={{ width: showLogo ? 230 : containerRect?.width ?? '100%' }}
        transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001 }}
      />
    </header>
    </LayoutGroup>
  );
}

export default Header;
