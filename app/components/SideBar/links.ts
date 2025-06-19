export type SidebarLink = {
  href: string,
  label: string
}

export const links: SidebarLink[] = [
  { href: '/new-pipeline', label: 'New Pipeline'},
  { href: '/inference', label: 'Inference'},
]