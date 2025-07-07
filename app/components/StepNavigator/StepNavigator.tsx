import * as React from 'react';
import { cn } from '~/utils/general';
import { AnimatePresence, motion } from 'motion/react';
import { useStepContext } from './StepContext';

type StepCounterProps = {
  slugToLabelMapper: Record<string, string>,
} & React.ComponentProps<'div'>


export function StepNavigator({
  slugToLabelMapper,
  className
}: StepCounterProps) {
  const { currentStep, goTo} = useStepContext()

  const slugs = React.useMemo(() => {
    return Object.keys(slugToLabelMapper).slice(0, currentStep)
  }, [slugToLabelMapper, currentStep])
  
  /** active means that this slug is in the hover-active / focus-active state */
  const [activeSlug, setActiveSlug] = React.useState<null | string>(null);
  
  /** Will be the index slug that is active but from the slugs array; and slugs only contain the back steps */
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)
  React.useEffect(() => {
    if (activeSlug) {
      setActiveIndex(slugs.indexOf(activeSlug))
    } else {
      setActiveIndex(-1)
    }
  }, [activeSlug, slugs])
  
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        // when user shuffles abruptly, it goes out of viewport; eg. the slider on mobile
        'relative overflow-hidden',
        'mb-8 sm:h-9',
        className
      )}
    >
    <motion.div
      className={cn(
        'absolute flex gap-2'
      )}
      transition={{
        staggerChildren: 0.1
      }}
    >
      <AnimatePresence>
      {slugs.map((slug, i) => {
        const isActive = activeIndex === i
        
        return (
          <motion.button
            id={slug}
            key={slug}
            aria-label={`Button to navigate to step ${i+1}. ${slugToLabelMapper[slug]}`}
            initial={{ opacity: 0, y: 24, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: isActive? 1.1: 1, }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ type: 'spring', duration: 0.5, stiffness: 650, damping: 50 , restDelta: 0.001}}
            className={cn(
              'bg-base-200 px-3 py-0.5 rounded-sm',
              'flex items-center gap-1.5 text-nowrap',
              'cursor-pointer',
            )}
            onMouseEnter={() => setActiveSlug(slug)}
            onMouseLeave={() => setActiveSlug(null)}
            onFocus={() => setActiveSlug(slug)}
            onBlur={() => setActiveSlug(null)}
            onClick={() => goTo(i+1)}
          >
            <span className='relative top-[-0.05rem]'>
              {i+1}
            </span>
            <AnimatePresence>
            {isActive && (
              <motion.span
                className={cn(
                  "font-serif overflow-hidden inline-block",
                )}
                initial={{ maxWidth: 0 }}
                animate={{ maxWidth: 200 }} // we take 200 < make it the max of words.
                exit={{ maxWidth: 0 }}
                transition={{ duration: 0.5, restDelta: 0.001 }}
              >
                {slugToLabelMapper[slug]}
              </motion.span>
            )} 
            </AnimatePresence>
          </motion.button>
        )
      })}
      </AnimatePresence>
    </motion.div>
    <div
      className={cn(
        'sm:hidden',
        'mt-[3rem]',
      )}
    >
      {/* slider for mobile to change active and navigate */}
      <input 
        type="range" 
        min={0} 
        max={slugs.length-1} 
        value={activeIndex}
        onChange={(e) => setActiveIndex(parseInt(e.target.value))}
        className="range range-xs" 
      />
    </div>
    </div>
  );
}