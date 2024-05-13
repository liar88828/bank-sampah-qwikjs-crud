import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { getDate } from "~/lib/utils/date"
import type { Opsi } from "@prisma/client"
import { CardLayout } from "~/components/basic/body/card/card-layout"

export const TableIndexPenyerahan = component$(
  ({
    data,
    link,
  }: {
    data: Opsi[]
    link: {
      page: string
    }
  }) => {
    return (
      <CardLayout href="create" title="Penyerahan's directory">
        <div class="overflow-x-auto ">
          <table class="table table-zebra table-xs static  rounded  bg-base-100">
            <OptionTableHead
              data={[
                "No",
                "Kode",
                "Tanggal",
                "Berat",
                "Harga",
                "Deskripsi",
                "Action",
              ]}
            />

            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th>{i + 1}</th>
                  <th>{d.id}</th>
                  <td>{getDate(d.createdAt)}</td>
                  <td>{d.berat ?? "kosong"}</td>
                  <td>{d.harga ?? "kosong"}</td>
                  <td>{d.deskripsi || "kosong"}</td>
                  <td class="flex flex-nowrap gap-2">
                    <Link
                      href={
                        "detail/" +
                        //link.detail
                        d.id
                      }
                      class="btn btn-primary btn-xs"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <OptionTableFoot
              data={data.map((list) => list.typeOpsiId as string)}
              href={link.page}
            />
          </table>
        </div>
      </CardLayout>
    )
  },
)
