import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { LuBook } from "@qwikest/icons/lucide"

export const DetailButton = component$(({ href }: { href: string }) => {
  return (
    <Link class="btn btn-info btn-xs" href={href}>
      <LuBook />
    </Link>
  )
})
