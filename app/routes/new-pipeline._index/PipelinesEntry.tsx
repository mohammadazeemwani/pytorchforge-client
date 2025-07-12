import React from "react";
import { cn } from "~/utils/general";
import { motion, type MotionProps } from "motion/react";
import { Link } from "react-router";

type PipelinesEntryProps = {} & React.ComponentProps<'div'>

export function PipelinesEntry({ className, ...delegated}: PipelinesEntryProps) {
  return (
    <div
      aria-description=""
      className={cn(
        'w-full',
        'mt-[3.2rem] flex flex-col gap-12',
        'sm:flex-row',
        className
      )}
      {...delegated}
      >
      <PipelineEntryCard 
        lightImageURL="new-pipeline/dl-light.svg"
        darkImageURL="new-pipeline/dl-dark.svg"
        figureClass="w-[13.5rem]"
        title="Deep Learning"
        content="Create pipelines using visual editor using frameworks (currently only torch), load data, apply transformations, view and train scripts and export the models to onnx or pt for tasks like image audio and text."
        contentContainerClass="mt-[0.7rem]"
        callToActionText="Start"
        callToActionHref="/new-pipeline/dl"
      />
      <PipelineEntryCard 
        lightImageURL="new-pipeline/ml-light.svg"
        darkImageURL="new-pipeline/ml-dark.svg"
        figureClass="w-[15rem]"
        title="Machine Learning"
        content="Guides through preprocessing using integrated dataframe viewer, training models, evaluate runs ,compare to previous runs, and create scripts for these tasks."
        contentContainerClass="mt-[-0.8rem]"
        callToActionText="Coming Soon"
        callToActionClass="btn-disabled"
      />
    </div>
  )
}


type PipelineEntryCardProps = {
  lightImageURL: string,
  darkImageURL: string,
  figureClass?: string,
  title: string,
  content: string,
  contentContainerClass?: string,
  callToActionText: string,
  callToActionClass?: string,

  /** Defaults to # */
  callToActionHref?: string
} & React.ComponentProps<'div'> & MotionProps
function PipelineEntryCard({ 
  className,
  lightImageURL,
  darkImageURL,
  figureClass,
  title,
  content,
  contentContainerClass,
  callToActionText,
  callToActionClass,
  callToActionHref="#",
}: PipelineEntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 1.1, stiffness: 400, damping: 60 , restDelta: 0.001}}
      className={cn(
        className,
        'card bg-base-200 shadow-sm z-0'
      )}
    >
      <figure className={cn("px-10 pt-3 not-prose mx-auto", figureClass)}>
        <img
          src={lightImageURL}
          alt="Machine Learning Logo"
          className="w-full h-full object-cover rounded-xl block dark:hidden" />
        <img
          src={darkImageURL}
          alt="Deep Learning Logo"
          className="w-full h-full object-cover rounded-xl hidden dark:block" />
      </figure>
      <div
        className={cn(
          "card-body items-center text-center",
          "prose dark:prose-invert",
          contentContainerClass
        )}
      >
        <h2>{title}</h2>
        <p className="">{content}</p>
        <div className="card-actions w-full">
          <Link to={callToActionHref} prefetch="intent" className="w-full">
          <button
            className={cn(
              "w-full",
              "btn btn-primary",
              callToActionClass
            )}
          >
            {callToActionText}
          </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}