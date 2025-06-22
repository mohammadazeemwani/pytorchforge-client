import React from "react";
import { cn } from "~/utils/general";
import { members } from "./about-data";
import { AnimatePresence, motion, type MotionProps } from "motion/react";

type MembersSectionProps = {} & React.ComponentProps<'section'>
const imgVariants: MotionProps['variants'] = {
  'initial': { scale: 1, y: 0 },
  'hoverState': { scale: 1.1, y: 10 }
}
const imgContainerVariants: MotionProps['variants'] = {
  'initial': { borderRadius: 100 },
  'hoverState': { borderRadius: 10 }
}

export function MembersSection({ className, ...delegated}: MembersSectionProps) {
  return (
    <section
      aria-description="Members of MLPipelines"
      id="members-section"
      className={cn(
        'prose dark:prose-invert',
        'mt-[4.8rem] sm',
        className
      )}
      {...delegated}
    >
      <h2>Members</h2>
      <div
        className={cn(
          'mt-9 flex flex-col items-stretch gap-[1rem]',
        )}
      >
      <AnimatePresence mode="wait">
      {members.map(({imgURL, altText, name, description}, i) => {
        // we are doing i+1 cz css even: counts from 1 -- onwards
        const evenEntry = React.useMemo(() => (i+1)%2===0, [])
        // for context think 💭 even to be second one (like haroon for now)
        const [isHovered, setIsHovered] = React.useState(false)

        return (
          <>
          <motion.div 
            key={i} 
            className={cn(
            )}
            initial={{ x: evenEntry ? '35%': '-35%', opacity: 0.3 }}
            animate={{ x: evenEntry ? '0': '0', opacity: 1}}
            exit={{ x: evenEntry ? '-35%': '35%', opacity: 0}}
            transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}
          >
            <motion.div
              className={cn(
                'not-prose',
                "w-[9rem] sm:w-[11rem] aspect-square",
                'overflow-hidden',
                'mb-2 glass',
                evenEntry ? 'float-right ml-7': 'float-left mr-7',
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              variants={imgContainerVariants}
              transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}
              initial={'initial'}
              animate={isHovered? 'hoverState': 'initial'}
            >
              <motion.img 
                src={imgURL} 
                alt={altText} 
                className={cn(
                  "w-full h-full object-cover",
                )} 
                variants={imgVariants}
                transition={{ type: 'spring', duration: 0.7, stiffness: 600, damping: 60 , restDelta: 0.001}}
                initial={'initial'}
                animate={isHovered? 'hoverState': 'initial'}
              />
            </motion.div>
            <div className="">
              <h3 className="mt-0!">{name}</h3>
              {description.map((desc, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: desc }}></p>
              ))}
            </div>
          </motion.div>
          <div className="hidden not-last:block">
            <div className="divider mx-auto w-[60%]" />
          </div>
          </>
        )
      })}
      </AnimatePresence>
      </div>
    </section>
  )
}