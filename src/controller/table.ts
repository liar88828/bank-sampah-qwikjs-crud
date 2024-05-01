import type { ControlPaginationReturn } from "~/type/controller/PaginationType"
import type {
  LoadTutorialOption,
  listTutorialPage,
} from "~/type/pages/tutorial.type"

export class TableController {
  pagination = <T>(
    id: T,
    page: string | null,
    search: string | null,
  ): ControlPaginationReturn<T> => {
    const pageNumber = Number(page ?? 0)
    const sanitizedPage = pageNumber <= 0 ? 0 : pageNumber
    const sanitizedSearch = search ?? ""
    return { id, page: sanitizedPage, search: sanitizedSearch }
  }

  tutorial(
    query: URLSearchParams,
    array: listTutorialPage,
  ): LoadTutorialOption {
    const no = Number(query.get("no"))
    return {
      no,

      kembali: no === 0,
      lanjut: array.length - 1 === no,
      link: {
        linkLanjut: array[no].link.after,
        linkCurrent: array[no].link.current,
        linkKembali: array[no].text,
      },
      text: array[no].text,
      list: array[no].list,
      array,
    }
  }
}
