import React from 'react';
import { applicationVersion } from '../../constants/general'

function ApplicationVersion() {
  return (
    <div className='px-4 py-1.5 rounded-[0.9rem] border-1 border-base w-fit tracking-widest'>
      <span>v</span>
      <span>{applicationVersion}</span>
    </div>
  );
}

export default ApplicationVersion;
