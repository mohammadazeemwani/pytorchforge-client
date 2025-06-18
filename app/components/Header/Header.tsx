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
        <MainLogo className='w-[2.2rem]' />
      </Link>
      <nav className='flex gap-[2rem] justify-between items-center'>
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
        <ThemeToggler />
      </nav>
    </header>
  );
}

export default Header;
