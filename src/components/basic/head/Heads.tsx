import { Slot, component$ } from "@builder.io/qwik"
import { Breadcrumbs } from "~/components/basic/head/BreadcrumbComponent/Breadcrumbs"

export const Heads = component$(() => {
  return (
    <>
      <Breadcrumbs />
      <Slot />
    </>
  )
})
