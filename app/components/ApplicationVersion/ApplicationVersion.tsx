import React from 'react';
import { cn } from '~/utils/general';
import { getVersion } from '@tauri-apps/api/app';

type ApplicationVersionProps = {

} & React.ComponentProps<'div'>

function ApplicationVersion({ className}: ApplicationVersionProps) {
  const [version, setVersion] = React.useState<string | null>(null);
  React.useEffect(() => {
    const updateVersion = async () => {
      const appVersion = await getVersion();
      setVersion(appVersion)
    }
    updateVersion();
  }, [])

  return (
    <div 
      className={cn(
        'px-4 py-1.5 rounded-[0.9rem] border-1 border-base w-fit tracking-widest',
        'font-mono',
        className
      )}
    >
      <span>v</span>
      <span>{version}</span>
    </div>
  );
}

export default ApplicationVersion;
