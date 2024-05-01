import { Slot, component$ } from "@builder.io/qwik"
import { listTab } from "~/assets/listTab"
import { TabBar } from "~/components/basic/head/TabBar"

export default component$(() => {
  return (
    <section class=" container">
      <TabBar data={listTab.work} />
      <div class="rounded-lg  bg-base-100">
        <Slot />
      </div>
    </section>
  )
})
