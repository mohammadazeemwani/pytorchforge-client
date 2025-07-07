import * as React from "react"
import { links } from "./links"
import type { MotionProps } from "motion/react"
import { AnimatePresence, motion } from "motion/react"
import { useLocation, Link as NativeLink } from "react-router"
import { cn } from "~/utils/general"
import ApplicationVersion from "../ApplicationVersion"
import Loaders from "../Loaders"
const Link = motion.create(NativeLink)

type MainLinksBarProps = {
  linksContainerClass?: string
  /**
   * This will overwrite the default logic for showing the container which as of now is to show only on selective routes
   * 💀 But if set true, make sure it is not called somewhere else true on same page or the selective logic is not making it true
   * @default false
   */
  showForMainPage?: boolean
} & React.ComponentProps<"div"> &
  MotionProps

function MainLinksBar({
  className,
  linksContainerClass,
  showForMainPage = false,
  ...delegated
}: MainLinksBarProps) {
  const location = useLocation()
  const showMainLinksBar = React.useMemo(() => {
    return showForMainPage || links.some((l) => location.pathname.startsWith(l.href))
  }, [location])

  // const showAtCenter = React.useMemo(() => {
  //   return location.pathname === '/'
  // }, [location])

  if (!showMainLinksBar) return null

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "bg-base-200",
          "flex flex-col items-center rounded-[0.85rem]",
          "pt-2.5 pb-4 px-2",
          "origin-top",
          !showForMainPage && "link-bar-right",
          showForMainPage && "link-bar-center px-4 sm:px-8",
          className,
        )}
        layoutId="main-links-bar-container"
        initial={{ opacity: 1 }}
        // animate={{ opacity: 1}}
        transition={{ type: "spring", duration: 1, stiffness: 400, damping: 60, restDelta: 0.001, }}
        exit={{ opacity: 0 }}
        {...delegated}
      >
        {showForMainPage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start"
          >
            <h2 className="mt-2 text-2xl font-semibold" >
              Choose a <i>workflow</i>
            </h2>
            <Loaders variant="settings" className="scale-[0.45] mr-[-0.7rem] mt-[-0.1rem]" />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ApplicationVersion className={cn("py-1 rounded-lg")} />
          </motion.div>
        )}
        <div className={cn(
          "divider w-[57%] mx-auto sm:w-[62%]",
          showForMainPage && 'mt-[-0.2rem] mb-2 sm:mb-4',
        )} />
        <div
          className={cn(
            "flex flex-col gap-5",
            showForMainPage && "flex-row gap-6 sm:gap-8",
            linksContainerClass,
          )}
        >
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className={cn(
                "no-underline w-fit",
                "relative rounded-[0.55rem]",
                "py-[0.3rem] px-3 sm:px-4",
                showForMainPage && 'px-0 sm:px-0',
                "text-[1.16rem] font-normal",
              )}
              layout="preserve-aspect"
              layoutId={`sidebar-first-paint-${link.label}`}
              transition={{ type: "spring", duration: 1, stiffness: 400, damping: 60, restDelta: 0.001, }}
            >
              {location.pathname === link.href && (
                <motion.div
                  className="z-1 absolute inset-0 header-btn-active rounded-[0.55rem]"
                  layoutId="current-sidebar-first-paint-route-style"
                />
              )}
              {showForMainPage === true && (
                <button 
                  className={cn(
                    "btn text-[1.1rem] sm:text-[1.2rem]",
                    link.href === '/new-pipeline' 
                      ? 'btn-primary'
                      : 'btn-neutral dark:btn-accent btn-dash'
                  )}
                >
                  {link.label}
                </button>
              )}
              {showForMainPage === false && (
                <span className={cn("z-2 relative")}>
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MainLinksBar
