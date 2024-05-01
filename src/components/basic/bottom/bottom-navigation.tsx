import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { type JSX } from "@builder.io/qwik/jsx-runtime"
import {
  LuBarChart,
  LuDumbbell,
  LuHome,
  LuTableProperties,
  LuUser,
} from "@qwikest/icons/lucide"

type TBottomNavbar = { icon: JSX.Element; title: string; href: string }

const listBottomNavbar: TBottomNavbar[] = [
  {
    title: "home",
    icon: <LuHome class="h-5 w-5" />,
    href: "/home",
  },
  {
    title: "menu",
    icon: <LuBarChart class="h-5 w-5" />,
    href: "/menu",
  },
  {
    title: "table",
    icon: <LuTableProperties class="h-5 w-5" />,
    href: "/table",
  },
  {
    title: "user",
    icon: <LuUser class="h-5 w-5" />,
    href: "/user",
  },
  {
    title: "tutorial",
    icon: <LuDumbbell class="h-5 w-5" />,
    href: "/tutorial",
  },
]

export const BottomNavigation = component$(() => {
  const location = useLocation()
  const path = location.url.pathname
  return (
    <div
      class="btm-nav btm-nav-sm sm:hidden"
      // onChange$$={(event) => (position.value = { x: event.x, y: event.y })}
    >
      {listBottomNavbar.map((d) => {
        const isActive = path.includes(d.title)
        console.log(d.title)
        return (
          <Link
            href={d.href}
            class={`text-primary ${isActive && "active"}`}
            key={d.title}
          >
            {d.icon}
          </Link>
        )
      })}
    </div>
  )
})
