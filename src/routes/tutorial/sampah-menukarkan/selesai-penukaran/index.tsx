import { component$ } from "@builder.io/qwik"
import { Foot, TablePenukaran } from "../layout"

export default component$(() => {
  return (
    <>
      <TablePenukaran />
      <Foot />
    </>
  )
})
