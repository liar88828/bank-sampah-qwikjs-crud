import { component$ } from "@builder.io/qwik"
import { Instruction } from "~/components/basic/Instruction"
import { FormCreateMaterial } from "./create-material"

export const FormIndexMaterial = component$(() => {
  return (
    <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
      <Instruction title={"material"} />
      <FormCreateMaterial />
    </div>
  )
})
