import { component$, useComputed$ } from "@builder.io/qwik"
import type { TotalMaterialProps } from "~/type/db/dashboard.type"

export const MaterialWarehouse = component$(
  ({ data }: { data: TotalMaterialProps }) => {
    // const datas = [
    //   { name: "Aaron", city: "Syria", size: 823 },
    //   { name: "Eddie", city: "Tuvalu", size: 918 },
    //   { name: "Roy", city: "Iraq", size: 110 },
    //   { name: "sd", city: "Iraq", size: 110 },
    //   { name: "Linnie", city: "Ecuador", size: 644 },
    //   { name: "Jordan", city: "Algeria", size: 913 },
    // ]

    // const total = datas.flatMap((d) => d.size).reduce((a, b) => a + b, 0);
    const total = useComputed$<number>(() => {
      return data.material.reduce((acc, d) => acc + d.berat, 0)
    })
    // const datasWithPercentage = datas.map((data) => ({
    //   ...data,
    //   percent: (data.size / total) * 100,
    // }));

    // console.log(datasWithPercentage);
    return (
      <div class="rounded bg-base-100 p-5  shadow  ">
        <h1 class="text-xl font-bold">Material Warehouse</h1>
        <div class="overflow-x-auto">
          <table class="table table-xs static sm:table-sm md:table-md ">
            {/* head */}
            <thead>
              <tr>
                <th>Material</th>
                <th>In </th>
                <th>Total {total}Kg</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.combinedData.map((d) => (
                <tr key={d.nama}>
                  <td>
                    <div>
                      <div class="text-lg font-bold">{d.nama}</div>
                      <div class="text-sm ">{d.kategori}</div>
                    </div>
                  </td>
                  <td>
                    <div class="text-sm opacity-50">{d.user?.alamat}</div>
                  </td>
                  <td>{d.berat}Kg</td>
                  <th>
                    <button class="btn btn-info btn-sm">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th colSpan={2}>
                  <div class="join">
                    <button class="btn join-item btn-sm">«</button>
                    <button class="btn join-item btn-sm">Page 22</button>
                    <button class="btn join-item btn-sm">»</button>
                  </div>
                </th>
                <th colSpan={2}>
                  <select class="select select-bordered select-sm w-full max-w-xs">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  },
)

// const datass = [
//   { name: "Aaron", kategori: "Glass", berat: 823 },
//   { name: "Eddie", kategori: "Wool", berat: 918 },
//   { name: "Roy", kategori: "String", berat: 110 },
//   { name: "sd", kategori: "Steel", berat: 110 },
//   { name: "Linnie", kategori: "Gold", berat: 644 },
//   { name: "Jordan", kategori: "Silver", berat: 913 },
// ]
