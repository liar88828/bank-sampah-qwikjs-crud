import { component$, useSignal } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"
import { LuSearch } from "@qwikest/icons/lucide"

export const OptionTableFoot = component$(
  ({
    href,
    data,
    length = [1],
  }: {
    length?: number[]
    data: string[]
    href: string
  }) => {
    const local = useLocation()
    const search = useSignal<string>("")
    const page = local.url.searchParams.get("page") as string
    const buttonMore = data.length === 0
    const buttonLess = data.length > 0 || page === "0"
    return (
      <tfoot>
        <tr>
          <th colSpan={3}>
            <div class="join">
              <Link
                // aria-disabled={buttonOff}
                href={`${href}?page=${Number(page) - 1}`}
                class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
              >
                «
              </Link>
              <button class="btn join-item btn-sm">Page {page}</button>
              <Link
                aria-disabled={buttonMore}
                href={`${href}?page=${Number(page) + 1}`}
                class={`btn join-item btn-sm ${buttonMore && "btn-disabled"}`}
              >
                »
              </Link>
            </div>
          </th>
          {length.map((d) => (
            <th key={Number(d)}></th>
          ))}
          <th colSpan={3} class="">
            <input
              //@ts-ignore
              list="search_name"
              type="text"
              class="input input-sm input-bordered w-36 sm:min-w-fit"
              placeholder="Cari Nama : Alex...."
              bind:value={search}
            />
            <datalist id="search_name">
              {data.map((d) => {
                return <option value={d} key={d} />
              })}
            </datalist>
            <Link
              type="button"
              class="btn btn-square btn-primary btn-sm"
              href={`${href}/?page=${Number(page)}&search=${search.value} `}
            >
              <LuSearch />
            </Link>
          </th>
        </tr>
      </tfoot>
    )
  },
)
