import { component$ } from "@builder.io/qwik"
import { getDate } from "~/lib/utils/date"
import { OptionTableHead } from "~/components/table/OptionTableHead"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { InputValue } from "~/components/card/InputValue"
import { Modals } from "~/components/card/Modals"
import { type TableChildComponent } from "~/type/db/table.type"

export const TableChildPenyerahan = component$(
  ({ data, handlerAdd, href, loading }: TableChildComponent) => {
    return (
      <div class="card static bg-base-100 sm:card-compact">
        <div class="card-body">
          <div class=" flex items-center gap-2">
            <h1>Material</h1>
          </div>

          <div class="overflow-x-auto">
            <table class="table table-zebra table-xs static  rounded bg-base-100">
              <OptionTableHead
                data={[
                  "No",
                  "Kode",
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
                    <td>{d.id}</td>
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
              <OptionTableFoot
                data={data.map((list) => list.nama)}
                href={href}
              />
            </table>
          </div>
        </div>
      </div>
    )
  },
)
