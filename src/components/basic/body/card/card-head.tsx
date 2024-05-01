import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { type PropsHeadCard } from "~/type/tag/PropsHeadCard"

export const CardHead = component$(
  ({ title, href, class: classes }: PropsHeadCard) => {
    const isActive = href?.length !== 0 && href

    return (
      <div class=" flex items-center gap-2">
        <h1 class={`card-title text-sm font-bold sm:text-2xl ${classes}`}>
          {title}
        </h1>
        {isActive && (
          <Link class="btn btn-primary btn-xs" href={href}>
            Create
          </Link>
        )}
      </div>
    )
  },
)
