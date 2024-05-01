import { component$ } from "@builder.io/qwik"
import { Heads } from "~/components/basic/head/Heads"
import { MaterialSampah } from "~/components/page/material/component/MaterialSampah"
import { NasabahActive } from "~/components/page/material/component/NasabahActive"
import { useLoadMaterial, useLoadNasabah } from "./layout"

export default component$(() => {
  const loadData = useLoadMaterial()
  const loadDataNasabah = useLoadNasabah()

  return (
    <section class=" container ">
      <div class="space-y-5">
        <Heads />
        <NasabahActive data={loadDataNasabah.value} />
        <MaterialSampah data={loadData.value} />
      </div>
    </section>
  )
})
