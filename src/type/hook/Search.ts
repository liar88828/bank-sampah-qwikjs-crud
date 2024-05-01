import type { QRL } from "@builder.io/qwik"

export type Search = {
  search?: string
  valueSearch: string
  goSearch: QRL<(this: Search) => void>
}
