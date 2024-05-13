import { Slot, component$ } from "@builder.io/qwik"

export const TableLayout = component$(() => {
  return (
    <div class="overflow-x-auto">
      <table class="table table-zebra table-xs static  rounded ">
        <Slot />
      </table>
    </div>
  )
})
