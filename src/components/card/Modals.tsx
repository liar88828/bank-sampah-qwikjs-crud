import { component$, Slot } from "@builder.io/qwik"
import { LuPlus } from "@qwikest/icons/lucide"

export const Modals = component$(
  ({
    title,
    id,
    class: className,
  }: {
    title: string
    id: string | number
    class: string
  }) => {
    return (
      <>
        <button
          class={`btn  ${className}`}
          onClick$={() => {
            //@ts-ignore
            document.getElementById(`my_modal_${id}`)?.showModal()
          }}
        >
          <LuPlus />
        </button>
        <dialog id={`my_modal_${id}`} class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">{title}</h3>
            <Slot />
            {/* <p class="py-4">Press ESC key or click the button below to close</p> */}
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button class="btn">Close</button>
          </form>
        </dialog>
      </>
    )
  },
)
