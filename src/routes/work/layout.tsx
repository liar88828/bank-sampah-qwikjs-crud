import { Slot, component$ } from "@builder.io/qwik"
import { listTab } from "~/assets/listTab"
import { Heads } from "~/components/basic/head/Heads"
import { TabBar } from "~/components/basic/head/TabBar"

export default component$(() => {
  return (
    <section class=" container ">
      <Heads>
        <TabBar data={listTab.work} />
      </Heads>
      <Slot />
    </section>
  )
})
