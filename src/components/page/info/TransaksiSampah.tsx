import { component$ } from "@builder.io/qwik"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import type { TotalTransaksiReturn } from "~/type/controller/transaksi.type."

export const TransaksiSampah = component$(
  ({ data }: { data: TotalTransaksiReturn }) => {
    // console.log(data)

    return (
      <section class="rounded  bg-base-100 p-5 shadow  ">
        <div class="mb-2 flex items-center justify-between gap-2">
          <h2 class="text-xl font-bold">Transaksi Sampah</h2>
          <h2 class="text-lg font-semibold">
            Total Berat : {data.hitung.totalBerat}
          </h2>
          <h2 class="text-lg font-semibold">
            Total Harga : {data.hitung.totalHarga}
          </h2>
        </div>

        <div class="overflow-x-auto   ">
          <table class="table table-zebra table-xs static  rounded  ">
            <OptionTableHead
              data={["No", "Total Berat", "Total Harga", "Action"]}
            />

            <tbody>
              {data.opsiPenukaran.map((d, i) => (
                <tr key={d?.id}>
                  <th>{i + 1}</th>
                  <td>{d?.berat}</td>
                  <td>{d?.harga}</td>

                  <td class="flex flex-nowrap gap-2">
                    {/* <Link
              href={`/table/transaksi/detail/${t.id}`}
              class="btn btn-primary btn-xs"
            >
              Detail
            </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <OptionTableFoot
              data={data.map((list) => list.deskripsi as string)}
              href={"/user/info/"}
            /> */}
          </table>
        </div>
      </section>
    )
  },
)
