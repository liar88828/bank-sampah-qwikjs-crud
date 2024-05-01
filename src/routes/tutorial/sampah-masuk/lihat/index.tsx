/* eslint-disable prefer-const */
import { FormIndexMaterial } from "~/components/page/material/form/form-index-material"
import { Foot } from "../layout"
import { component$ } from "@builder.io/qwik"

export default component$(() => {
  return (
    <>
      <FormIndexMaterial />
      <Foot />
    </>
  )
})
