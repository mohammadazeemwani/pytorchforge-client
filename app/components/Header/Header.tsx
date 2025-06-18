import * as React from 'react';
import { links } from './links';
import { Link as NativeLink, useLocation } from 'react-router';
import { cn } from '~/utils/general';
import { MainLogo } from '../MainLogo';
import ThemeToggler from '../ThemeToggler';
import { motion } from 'motion/react';
const Link = motion.create(NativeLink)

type HeaderProps = { } & React.ComponentProps<'header'>

function Header({ className }: HeaderProps) {
  const location = useLocation();
  const showLogo = React.useMemo(() => location.pathname !== '/', [location.pathname])

  return (
    <header className={cn(
      'flex justify-between',
      className
    )}>
      {showLogo && (
        <Link to="/">
          <MainLogo className='w-[3rem]' />
        </Link>
      )}
      <motion.nav 
        className={cn(
          'flex gap-[2rem] justify-between items-center',
          'mr-[-0.7rem] px-[0.7rem] py-[0.5rem] bg-primary/10',
          'rounded-lg'
        )}
        animate={{
          width: showLogo ? 'auto': '100%'
        }}
      >
        {links.map((link, i) => (
          <Link 
            layoutId={link.href}
            layout="position"
            key={i} 
            to={link.href}
            className={cn(
              location.pathname !== link.href ? 'link link-primary' : '',
            )}
          >
            <button className='btn btn-ghost border-0 hover:bg-[var(--color-base-100)]'>
              {link.label}
            </button>
          </Link>
        ))}
        <motion.div 
          className='w-fit'
          layoutId='theme-change-container'
          layout="position"
        >
          <ThemeToggler className='scale-[0.8]' />
        </motion.div>
      </motion.nav>
    </header>
  );
}

export default Header;
