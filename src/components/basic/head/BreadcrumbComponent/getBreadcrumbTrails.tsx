import type { Breadcrumb, ListBreadcrumbs } from "~/type/tag/Breadcrumb.type"

export function getBreadcrumbTrails(
  location: string,
  listBreadcrumbs: ListBreadcrumbs,
  parentLink: string = "",
): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = []
  let currentPath = ""

  for (const item of listBreadcrumbs) {
    currentPath += item.link
    const links = parentLink + item.link
    if (location.includes(currentPath)) {
      breadcrumbs.push({ name: item.name, link: links })
      if (item.sub && item.sub.length > 0) {
        const subTrail = getBreadcrumbTrails(location, item.sub, links)
        breadcrumbs.push(...subTrail)
      }

      break
    }

    currentPath = ""
  }

  return breadcrumbs
}
