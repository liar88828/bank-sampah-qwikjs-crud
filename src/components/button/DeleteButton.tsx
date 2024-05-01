import { type QRL, component$ } from "@builder.io/qwik"
import { LuX } from "@qwikest/icons/lucide"

export const DeleteButton = component$(
  ({
    isActive,
    handler,
    id,
  }: {
    isActive: boolean
    id: any
    handler: QRL<(id: number) => void>
  }) => {
    return (
      <button
        type="submit"
        class={`btn btn-error btn-xs  ${isActive && "btn-disabled"}`}
        onClick$={async () => {
          await handler(id)
        }}
      >
        <LuX />
      </button>
    )
  },
)
