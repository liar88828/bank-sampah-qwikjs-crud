import { getDate } from "~/lib/utils/date"
import { $, component$ } from "@builder.io/qwik"
import { useDeleteUserMaterial } from "~/action/material.action"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { DeleteButton } from "~/components/button/DeleteButton"
import { DetailButton } from "~/components/button/DetailButton"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { type Material } from "@prisma/client"

export const MaterialTableIndex = component$(
  ({ data }: { data: Material[] }) => {
    const dataDelete = useDeleteUserMaterial()
    const handlerDelete = $((id: number) => {
      dataDelete.submit({ id })
    })
    const isActive = dataDelete.isRunning
    return (
      <CardLayout title="Material's directory" href="/table/material/create">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-xs static  rounded bg-base-100">
            <OptionTableHead
              data={[
                "No",
                "Kode",
                "Nama",
                "Jenis",
                "Berat",
                "Create",
                "Action",
              ]}
            />
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th>{i + 1}</th>
                  <td>{d.id}</td>
                  <td>{d.nama}</td>
                  <td>{d.kategori}</td>
                  <td>{d.berat}</td>
                  <td>{getDate(d.createdAt)}</td>
                  <td class="flex flex-nowrap gap-2">
                    <DetailButton href={`/table/material/detail/${d.id}`} />
                    <DeleteButton
                      id={d.id}
                      handler={handlerDelete}
                      isActive={isActive}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <OptionTableFoot
              data={data.map((list) => list.nama)}
              href={"/table/material/"}
            />
          </table>
        </div>
      </CardLayout>
    )
  },
)
