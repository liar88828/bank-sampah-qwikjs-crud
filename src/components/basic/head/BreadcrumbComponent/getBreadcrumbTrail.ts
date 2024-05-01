import { listBreadcrumbs } from "~/assets/listBreadcrumbs"

export interface BreadcrumbItem {
  name: string
  link: string
}

export function getBreadcrumbTrail(titleName: string): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = []

  const findItem = (
    items: any[],
    titleItem: string,
    parentLink: string = "",
  ): boolean => {
    for (const item of items) {
      const link = parentLink + item.link
      if (item.name === titleItem) {
        trail.push({ name: item.name, link })
        return true
      }
      if (item.sub && findItem(item.sub, titleItem, link)) {
        trail.push({ name: item.name, link })
        return true
      }
    }
    return false
  }

  findItem(listBreadcrumbs, titleName)
  return trail.reverse()
}

/**
 * Example Usage
const breadcrumbTrail = getBreadcrumbTrail(listBreadcrumbs, "Edit");
console.log(breadcrumbTrail); // Output: ["User", "Profile", "Edit"]
 */
