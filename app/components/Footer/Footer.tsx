import * as React from 'react';

function Footer() {
  const year = React.useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className='flex flex-col justify-between items-center'>
      <small>&copy; {year}</small>
    </footer>
  );
}

export default Footer;
