import { component$ } from "@builder.io/qwik"
import { Instruction } from "~/components/basic/Instruction"
import { FormCreateMaterial } from "~/components/page/material/form/create-material"

export const CreateIndexMaterial = component$(() => {
  return (
    <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
      <Instruction title={"material"} />
      <FormCreateMaterial />
    </div>
  )
})
