import { component$ } from "@builder.io/qwik"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { Pagination } from "~/components/basic/pagination"
import type { TMaterial } from "~/type/db/table.type"

export const TotalMaterial = component$(({ data }: { data: TMaterial[] }) => {
  return (
    <CardLayout class="md:card-compact" title={"Opsi Penukaran"}>
      <div class="overflow-x-auto  ">
        <table class="table table-zebra table-xs static  rounded border ">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Berat</th>
              <th>Jenis</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d?.id}>
                <th>{i + 1}</th>
                <td>{d?.nama}</td>
                <td>{d?.berat}</td>
                <td>{d?.kategori}</td>

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
          <tfoot>
            <tr>
              <th colSpan={2}>
                <Pagination />
              </th>
              <th>
                <button class="btn btn-info btn-xs">Print</button>
              </th>
              <th>
                <button class="btn btn-primary btn-xs">Action</button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </CardLayout>
  )
})
