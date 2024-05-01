import { component$ } from "@builder.io/qwik"
import { LuAlignJustify } from "@qwikest/icons/lucide"
import { Link } from "@builder.io/qwik-city"
import { listBreadcrumbs } from "~/assets/listBreadcrumbs"

export const SideBar = component$(() => {
  return (
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* Page content here */}
        <label for="my-drawer" class=" btn btn-square btn-ghost drawer-button ">
          <LuAlignJustify
            font-size={25}
            class="inline-block h-6 w-6 stroke-current"
          />
        </label>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ListLink />
      </div>
    </div>
  )
})

export const ListLink = component$(() => {
  return (
    <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
      <li class={"mb-10"}>Logo</li>
      {/* <li>
        <Link href="#">Item 1</Link>
      </li> */}
      {listBreadcrumbs.map((a) => (
        <li key={a.name}>
          <details>
            <summary>{a.name}</summary>
            <ul>
              {a.sub?.map((b) => (
                <li key={b.name}>
                  <Link href={a.link + b.link}>{b.name}</Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  )
})
