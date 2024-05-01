import { $, useStore } from "@builder.io/qwik";
import { type Search } from "~/type/hook/Search"

export const useSearch = () => {
  return useStore<Search>({
    search: "",
    valueSearch: "",
    goSearch: $(function (this: Search) {
      console.log(this.goSearch)
      this.valueSearch = this.search ?? ""
    }),
  })
}
