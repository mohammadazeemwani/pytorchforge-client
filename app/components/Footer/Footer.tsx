import * as React from 'react';
import { cn } from '~/utils/general';
import { MainLogo } from '../MainLogo';
import { useRenderedAt } from '~/hooks/useRenderedAt';

type FooterProps = {} & React.ComponentProps<'footer'>

function Footer({ className, ...delegated }: FooterProps) {
  // const currentYear = React.useMemo(() => new Date().getFullYear(), [])
  const renderedDate = useRenderedAt()?.toLocaleString();

  return (
    <footer
      className={cn(
        'flex justify-between items-center',
        'mt-[14rem] mb-[0.6rem] px-5 pt-2 pb-1',
        'rounded-2xl',
        'bg-[var(--color-base-200)]'
      )}
      {...delegated}
    >
      <MainLogo className='w-[2.5rem]' layoutId={''} layout={false} animate={false} />
      <div className='flex flex-col gap-0.5 justify-center sm:gap-1'>
        {renderedDate && (
          <time className='text-xs sm:text-[0.8rem]' dateTime={renderedDate}>{renderedDate}</time>
        )}
        <small className='sm:text-[0.8rem] text-center'>&copy; 2025 - Present</small>
        {/* hard coding date because 2025 is starting year and it will never change */}
        {/* Maybe later year we will change to 2025 - {presentYear} */}
      </div>
    </footer>
  );
}

export default Footer;
