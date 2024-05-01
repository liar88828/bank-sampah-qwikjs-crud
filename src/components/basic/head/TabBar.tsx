import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { type LinkNavigation } from "~/type/tag/LinkNavigation.type"

export const TabBar = component$(({ data }: { data: LinkNavigation[] }) => {
  const location = useLocation()
  const path = location.url.pathname
  // console.log(path, title)
  const isActive = (title: string): boolean =>
    path.includes(title.toLocaleLowerCase())
  return (
    <div role="tablist" class="tabs-lifted tabs-xs tabs static sm:tabs-md">
      {data.map((d) => (
        <Link
          key={d.title}
          href={d.href}
          role="tab"
          class={`tab static ${isActive(d.title) && "tab-active "}`}
        >
          {d.title}
        </Link>
      ))}
    </div>
  )
})
