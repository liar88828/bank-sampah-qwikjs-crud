import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const OptionsCard = component$(
  ({ onDelete, onEdit }: { onDelete: () => void; onEdit: string }) => {
    return (
      <div class="space-x-2">
        <button class="btn btn-error" onClick$={onDelete}>
          Delete
        </button>
        <Link href={onEdit} class="btn btn-warning">
          Edit
        </Link>
      </div>
    );
  },
);
