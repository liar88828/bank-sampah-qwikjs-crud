import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const TableHeadCreate = component$(
  ({ title, href }: { title: string; href: string }) => {
    return (
      <div class=" flex items-center gap-2">
        <h1 class="card-title text-sm">{title}</h1>
        <Link class="btn btn-info btn-xs" href={href}>
          Create
        </Link>
      </div>
    )
  },
)
