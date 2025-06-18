import * as React from 'react';
import { links } from './links';
import { Link, useLocation } from 'react-router';
import { cn } from '~/utils/general';
import { MainLogo } from '../MainLogo';
import ThemeToggler from '../ThemeToggler';

type HeaderProps = { } & React.ComponentProps<'header'>

function Header({ className }: HeaderProps) {
  const location = useLocation();

  return (
    <header className={cn(
      'flex justify-between',
      className
    )}>
      <Link to="/">
        <MainLogo className='w-[3rem]' />
      </Link>
      <nav 
        className={cn(
          'flex gap-[2rem] justify-between items-center',
          'w-full mr-[-0.7rem] px-[0.7rem] py-2 bg-primary/10'
        )}
      >
        {links.map((link, i) => (
          <Link 
            key={i} 
            to={link.href}
            className={cn(
              location.pathname !== link.href ? 'link link-primary' : '',
            )}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggler className='scale-[0.8]' />
      </nav>
    </header>
  );
}

export default Header;
