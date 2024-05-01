import { Slot, component$ } from "@builder.io/qwik"

export const CardBody = component$(({ class: classes }: { class?: string }) => {
  return (
    <div
      class={`card  card-compact static bg-base-100 sm:card-normal ${classes}`}
    >
      <div class="card-body">
        <Slot />
      </div>
    </div>
  )
})
