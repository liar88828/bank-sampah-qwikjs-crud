import { component$ } from "@builder.io/qwik"
import { Pagination } from "~/components/basic/pagination"
import { getDate } from "~/lib/utils/date"
import { TableLayout } from "~/components/basic/body/table"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import type { RiwayatPenukaranProps } from "~/db/join/RiwayatPenukaranUser"

export const Riwayat = component$(
  ({ data }: { data: RiwayatPenukaranProps[] }) => {
    // const dataLoad = useGetPenukaran()

    return (
      <CardLayout title="Riwayat Penukaran">
        <TableLayout>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal Penukaran</th>
              <th>Nama Penukar</th>
              <th>Alamat Penukar</th>
              <th>No Hp Penukar</th>
              <th>Harga Tukar</th>
              <th>Deskripsi Tukar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d?.id}>
                <th>{i + 1}</th>
                <td>{getDate(d?.tgl_transaksi)}</td>
                <td>{d?.userBuy?.nama}</td>
                <td>{d?.userBuy?.alamat}</td>
                <td>{d?.userBuy?.no_hp}</td>
                {/* <td>{d?.opsi_Penukaran?.harga}</td>
                  <td>{d?.opsi_Penukaran?.deskripsi}</td> */}

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
        </TableLayout>
      </CardLayout>
    )
  },
)
