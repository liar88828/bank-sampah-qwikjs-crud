import { component$ } from "@builder.io/qwik"
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city"
import { Heads } from "~/components/basic/head/Heads"
import { DetailTransaksi } from "~/components/card/Material/DetailTransaksi"
import { db } from "~/db/db"

export const useLoadMaterialId = routeLoader$(async ({ params }) => {
  return db.menu.findId_Relations(Number(params.id_material))
})

export const useActionMaterialBeli = routeAction$(
  async (_data, { params }) => {
    const id = Number(params.id_material)
    const jumlah = Number(_data.jumlah)
    return db.menu.findMaterialUpdate(id, jumlah)
  },
  zod$({
    jumlah: z.string(),
  }),
)

export default component$(() => {
  return (
    <div class="container space-y-5">
      <Heads />
      <DetailTransaksi />
    </div>
  )
})
