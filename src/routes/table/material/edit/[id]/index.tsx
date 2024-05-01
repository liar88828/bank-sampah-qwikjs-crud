import { component$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Instruction } from "~/components/basic/Instruction"
import { FormEditMaterial } from "~/components/page/material/form/form-edit-material"
import { db } from "~/db/db"

export const useGet = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10)
  const res = await db.material.findId(id)
  if (!res) {
    status(404)
  }
  return res
})

export default component$(() => {
  const loadData = useGet()
  return (
    <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
      <Instruction title={"material"} />
      <FormEditMaterial data={loadData.value} />
    </div>
  )
})
