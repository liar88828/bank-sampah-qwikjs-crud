import { component$ } from "@builder.io/qwik"
import { getDate } from "~/lib/utils/date"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { type TableChildComponent } from "~/type/db/table.type"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { Modals } from "~/components/card/Modals"
import { InputValue } from "~/components/card/InputValue"

// create-penukaran
export const TableChildPenukaran = component$(
  ({ data, handlerAdd, href, loading }: TableChildComponent) => {
    return (
      <CardLayout class="md:card-compact" title={"Create-Penukaran"}>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-xs static  rounded bg-base-100">
            <OptionTableHead
              data={[
                "No",
                // "Kode",
                "Nama",
                "Kategori",
                "Berat",
                "Create",
                "Action",
              ]}
            />
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <th>{i + 1}</th>
                  {/* <td>{d.id}</td> */}
                  <td>{d.nama}</td>
                  <td>{d.kategori}</td>
                  <td>{d.berat}</td>
                  <td>{getDate(d.createdAt)}</td>
                  <td class="flex flex-wrap gap-2">
                    <Modals
                      id={i}
                      title="Masukan Berat Penukaran"
                      class=" btn-info btn-xs"
                    >
                      <InputValue
                        i={i}
                        loading={loading}
                        handlerAdd={handlerAdd}
                        data={d}
                      />
                    </Modals>
                  </td>
                </tr>
              ))}
            </tbody>

            <OptionTableFoot data={data.map((list) => list.nama)} href={href} />
          </table>
        </div>
      </CardLayout>
    )
  },
)
