export interface Breadcrumb {
  name: string
  link: string
}

export type ListBreadcrumbs = {
  name: string
  link: string
  sub: {
    name: string
    link: string
    sub: {
      name: string
      link: string
      sub: never[]
    }[]
  }[]
}[]
