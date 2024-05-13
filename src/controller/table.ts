import type { RequestEventLoader } from "@builder.io/qwik-city"
import type { NameOrId, PaginationType } from "~/type/controller/PaginationType"
import type {
  LoadTutorialOption,
  listTutorialPage,
} from "~/type/pages/tutorial.type"
import { auth } from "./auth"

export class TableController {
  private getOption(request: RequestEventLoader) {
    const query = request.query.get
    return {
      id: auth.userId(request),
      page: query("page"),
      search: query("search"),
    }
  }

  pagination = <T>(
    // id: T,
    // page: string | null,
    // search: string | null,
    request: RequestEventLoader,
    other?: T,
  ): PaginationType<any, T> => {
    const { id, page, search } = this.getOption(request)

    const pageNumber = Number(page ?? 0)
    const sanitizedPage = pageNumber <= 0 ? 0 : pageNumber
    const sanitizedSearch = search ?? ""
    const newOther = other ? other : Object.create(null)
    return { id, page: sanitizedPage, search: sanitizedSearch, other: newOther }
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
