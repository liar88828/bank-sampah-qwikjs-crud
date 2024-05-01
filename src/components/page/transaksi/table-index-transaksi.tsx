import { component$ } from "@builder.io/qwik"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import type { PropsTransaksiUser } from "~/type/controller/transaksi.type."
import { Link } from "@builder.io/qwik-city"
import { LuBook } from "@qwikest/icons/lucide"
import { getDate } from "~/lib/utils/date"

export const TableIndexTransaksi = component$(
  ({ data: { data } }: { data: PropsTransaksiUser }) => {
    return (
      <CardLayout href="/table/transaksi/create" title="Transaksi's directory">
        <div class="overflow-x-auto ">
          <table class="table table-zebra table-xs static  rounded  bg-base-100">
            <OptionTableHead
              data={[
                "No",
                // "Kode",
                "Tanggal",
                "Type",
                "Nama",
                "Berat",
                "Harga",
                "Total",
                "Deskripsi",
                "Action",
              ]}
            />
            <tbody>
              {data.map((d, i) => {
                // const opsi = d.Opsi?.Cases.map((a) => a)
                // opsi?.map((b) => b.Material)
                return (
                  <tr key={d.id}>
                    <th>{i + 1}</th>
                    {/* <td>{d.id}</td> */}
                    <td>{getDate(d.tgl_transaksi)}</td>
                    <td>{d.Opsi?.typeOpsiId}</td>
                    <td>{d.Opsi?.berat}</td>
                    <td>{d.Opsi?.harga}</td>
                    <td>{d.Opsi?.Cases.map((a) => a.Material?.nama)}</td>
                    <td>{d.Opsi?.Cases.map((a) => a.Material?.berat)}</td>
                    <td>{d.Opsi?.Cases.map((a) => a.Material?.deskripsi)}</td>

                    <td class="flex flex-nowrap gap-2">
                      <Link
                        // href={`/user/${opsi.types}/detail/${opsi.id}`}
                        class="btn btn-info btn-xs"
                      >
                        <LuBook />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>

            <OptionTableFoot
              length={[1, 2]}
              data={data.map((list) => list.id_status as string)}
              href={"/table/transaksi/"}
            />
          </table>
        </div>
      </CardLayout>
    )
  },
)
