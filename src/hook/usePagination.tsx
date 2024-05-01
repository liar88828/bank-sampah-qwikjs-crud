import { $, useStore } from "@builder.io/qwik"
import { type Pagination } from "~/type/hook/Pagination"

export const usePagination = () => {
  return useStore<Pagination>({
    pages: 0,
    increment: $(function (this: Pagination) {
      this.pages += 1
    }),
    decrement: $(function (this: Pagination) {
      if (this.pages > 0) {
        this.pages -= 1
      }
    }),
  })
}
