import { type ClassList, Slot, component$ } from "@builder.io/qwik"

export const CardTutor = component$(
  ({ class: ClassName }: { class?: ClassList }) => {
    return (
      <div
        class={`card static  bg-base-200 ${ClassName} card-compact shadow sm:card-normal `}
      >
        <div class="card-body ">
          <Slot />
        </div>
      </div>
    )
  },
)
