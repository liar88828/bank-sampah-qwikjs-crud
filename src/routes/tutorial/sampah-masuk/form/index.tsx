import { component$ } from "@builder.io/qwik";
import { Foot } from "../layout";
import { FormIndexMaterial } from "~/components/page/material/form/form-index-material"

export default component$(() => {
  return (
    <>
      <FormIndexMaterial />
      <Foot />
    </>
  )
})
