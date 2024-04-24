import { BreadcrumbItem } from "../getBreadcrumbTrail";
import { listBreadcrumbs } from "../listBreadcrumbs";

function getBreadcrumbTrailObject(
  listBreadcrumbs: any[],
  itemName: string,
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [];

  const findItem = (items: any[], name: string): boolean => {
    for (const item of items) {
      if (item.name === name) {
        trail.push({ name: item.name, link: item.link });
        return true;
      }
      if (item.sub && findItem(item.sub, name)) {
        trail.push({ name: item.name, link: item.link });
        return true;
      }
    }
    return false;
  };

  findItem(listBreadcrumbs, itemName);

  return trail.reverse();
}

function getBreadcrumbTrail3(itemName: string): BreadcrumbItem[] {
  console.time();

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
  console.timeEnd();

  return trail.reverse();
}


function getBreadcrumbTrail2(itemName: string): BreadcrumbItem[] {
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
