import { type QRL, component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const OptionsCard = component$(
  ({ onDelete, onEdit }: { onDelete: QRL<() => void>; onEdit: string }) => {
    return (
      <div class="space-x-2">
        <Link href={onEdit} class="btn btn-info">
          Edit
        </Link>
        <button class="btn btn-error" onClick$={onDelete}>
          Delete
        </button>
      </div>
    )
  },
)
