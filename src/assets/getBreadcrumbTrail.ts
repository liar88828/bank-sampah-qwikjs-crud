import { listBreadcrumbs } from "./listBreadcrumbs";

export interface BreadcrumbItem {
  name: string;
  link: string;
}

// Usage
// const breadcrumbTrail = getBreadcrumbTrail(listBreadcrumbs, "Edit");
// console.log(breadcrumbTrail); // Output: ["User", "Profile", "Edit"]
//--------
export function getBreadcrumbTrail(itemName: string): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [];

  const findItem = (
    items: any[],
    name: string,
    parentLink: string = "",
  ): boolean => {
    for (const item of items) {
      const link = parentLink + item.link;

      if (item.name === name) {
        trail.push({ name: item.name, link });
        return true;
      }
      if (item.sub && findItem(item.sub, name, link)) {
        trail.push({ name: item.name, link });
        return true;
      }
    }
    return false;
  };

  findItem(listBreadcrumbs, itemName);

  return trail.reverse();
}
