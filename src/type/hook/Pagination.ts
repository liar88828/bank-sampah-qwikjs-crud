import type { QRL } from "@builder.io/qwik"

export type Pagination = {
  pages: number
  increment: QRL<(this: Pagination) => void>
  decrement: QRL<(this: Pagination) => void>
}
