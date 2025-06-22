import React from 'react';
import { applicationVersion } from '../../constants/general'
import { cn } from '~/utils/general';

type ApplicationVersionProps = {

} & React.ComponentProps<'div'>

function ApplicationVersion({ className}: ApplicationVersionProps) {
  return (
    <div 
      className={cn(
        'px-4 py-1.5 rounded-[0.9rem] border-1 border-base w-fit tracking-widest',
        'font-mono',
        className
      )}
    >
      <span>v</span>
      <span>{applicationVersion}</span>
    </div>
  );
}

export default ApplicationVersion;
