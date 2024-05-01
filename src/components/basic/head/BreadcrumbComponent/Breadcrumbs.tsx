import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { getBreadcrumbTrails } from "./getBreadcrumbTrails"
import { listBreadcrumbs } from "~/assets/listBreadcrumbs"

export const Breadcrumbs = component$(() => {
  const location = useLocation()
  const path = location.url.pathname
  const breadcrumbs = getBreadcrumbTrails(path, listBreadcrumbs)

  return (
    <div class="breadcrumbs static text-sm">
      <ul class="static">
        {breadcrumbs.map((d) => (
          <li key={d.name} class="static">
            <Link class="static" href={d.link}>
              {d.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})
