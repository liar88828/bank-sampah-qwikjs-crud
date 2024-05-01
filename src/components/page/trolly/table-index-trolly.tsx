import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { type PropsTrollyCard } from "~/type/db/cart.type"

export const TableTrollyIndex = component$(
  ({ data }: { data: PropsTrollyCard[] }) => {
    return (
      <CardLayout title="Trolly directory">
        <div class="overflow-x-auto ">
          <table class="table table-zebra table-xs static  rounded  bg-base-100">
            <OptionTableHead
              data={[
                "No",
                "Kode",
                "Status",
                "Nama",
                "Harga",
                "Kategori",
                "Jumlah",
                "Berat",
                "Deskripsi",
                "Action",
              ]}
            />
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th>{i + 1}</th>
                  <th>{d.id}</th>
                  <td>{d.status}</td>
                  <td>{d?.Material?.nama ?? "kosong"}</td>
                  <td>{d?.Material?.harga ?? "kosong"}</td>
                  <td>{d?.Material?.kategori ?? "kosong"}</td>
                  <td>{d?.Material?.jumlah ?? "kosong"}</td>
                  <td>
                    {d?.Material?.berat ?? "kosong"} {d?.Material?.satuan ?? ""}
                  </td>
                  <td>{d?.Material?.deskripsi ?? "kosong"}</td>

                  <td class="flex flex-nowrap gap-2">
                    <Link
                      href={`/table/material/detail/${d?.Material?.id ?? "/"}`}
                      class="btn btn-primary btn-xs"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

            <OptionTableFoot
              data={data.map((list) => list.status)}
              href={"/table/trolly/"}
            />
            {/* <tfoot>
                    <tr>
                      <th colSpan={2}>
                        <div class="join">
                          <Link
                            // aria-disabled={buttonOff}
                            href={`/user/transaksi/?page=${Number(page) - 1}`}
                            class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
                          >
                            «
                          </Link>
                          <button class="btn join-item btn-sm">
                            Page {page}
                          </button>
                          <Link
                            aria-disabled={buttonOff}
                            href={`/user/transaksi/?page=${Number(page) + 1}`}
                            class={`btn join-item btn-sm ${buttonOff && "btn-disabled"}`}
                          >
                            »
                          </Link>
                        </div>
                      </th>
                      <th colSpan={2} class="">
                        <input
                          type="text"
                          class="input input-sm input-bordered"
                          placeholder="Cari Nama : Alex...."
                          bind:value={search}
                        />
                        <Link
                          type="button"
                          class="btn btn-square btn-primary btn-sm"
                          href={`/user/transaksi/?page=${Number(page)}&search=${search.value} `}
                        >
                          <LuSearch />
                        </Link>
                      </th>
                    </tr>
                  </tfoot> */}
          </table>
        </div>
      </CardLayout>
    )
  },
)
