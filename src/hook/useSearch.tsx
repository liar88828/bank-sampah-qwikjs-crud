import { $, useStore } from "@builder.io/qwik";
import { Search } from "../type/global.type";

export const useSearch = () => {
  return useStore<Search>({
    search: '',
    valueSearch: '',
    goSearch: $(function (this: Search) {
      console.log(this.goSearch);
      this.valueSearch = this.search || '';
    })
  });
};
