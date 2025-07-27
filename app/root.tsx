import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import { defaultThemeType } from "./constants/general"
import ThemeProvider from "./providers/Theme.provider"

import type { Route } from "./+types/root"
import "./app.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { cn } from "./utils/general"
import React from "react"
import SideBar from "./components/SideBar/SideBar"
import MainLinksBar from "./components/MainLinksBar"
import { checkForAppUpdates } from "updater"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/canela-text-trial",
  },
  {
    rel: "icon",
    href: "/logo-light.svg",
    media:"(prefers-color-scheme: light)"
  },
  {
    rel: "icon",
    href: "/logo-dark.svg",
    media:"(prefers-color-scheme: dark)"
  },
]

export function loader({}: Route.LoaderArgs) {
  return {
    renderDate: new Date().toString()
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en"
      className={cn(
        'error-glow-prep' // this is imp for animation that happens in FormErrorContext
      )}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <ThemeProvider>
        <body className={cn(
          "drawer",
        )}>
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div
            className={cn(
              "drawer-content relative",
              "flex flex-col justify-between min-h-[100vh]",
              "custom-body",
            )}
          >
            <Header />
            <main className="flex-1">
              {children}
              <MainLinksBar />
            </main>
            <Footer />
          </div>
          <div className="z-20 drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <SideBar 
              className="menu bg-base-200 min-h-full w-[15rem] p-4"             
            />
          </div>
        </body>
        <ScrollRestoration />
        <Scripts />
      </ThemeProvider>
    </html>
  )
}

export default function App() {
  React.useEffect(() => {
    (async () => {
      await checkForAppUpdates()
    })()
  }, [])

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
