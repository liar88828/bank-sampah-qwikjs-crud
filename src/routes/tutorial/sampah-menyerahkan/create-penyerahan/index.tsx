import { component$ } from "@builder.io/qwik"
import { Foot, CreatePenyerahanComponent } from "../layout"

export default component$(() => {
  return (
    <>
      <CreatePenyerahanComponent />
      <Foot />
    </>
  )
})
