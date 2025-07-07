import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  prerender: [
    '/',
    '/help',
    '/about',
    '/inference',
    '/new-pipeline',
    '/new-pipeline/dl',
  ],
  future: {
    unstable_middleware: true,
  }
} satisfies Config;


declare module "react-router" {
  interface Future {
    unstable_middleware: true; // 👈 Enable middleware types
  }
}