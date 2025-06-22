import React from "react";
import { useRouteLoaderData } from "react-router";
import type { loader as RootLoaderType } from "~/root";

export function useRenderedAt(): Date | null {
  const data = useRouteLoaderData<typeof RootLoaderType>('root')
  if (data?.renderDate) {
    return new Date(data.renderDate)
  } else {
    return null;
  }
}