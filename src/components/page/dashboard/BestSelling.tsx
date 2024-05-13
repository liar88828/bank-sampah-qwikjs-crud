import { component$, useComputed$ } from "@builder.io/qwik"
import type { BestTransactionProps } from "~/type/db/dashboard.type"

// const data = [
//   {
//     user: {
//       nama: "Aaron",
//       nama_belakang: "baron",
//       alamat: "Syria",
//     },
//     berat: 823,
//   },
//   {
//     user: { nama: "Jordan", nama_belakang: "baron", alamat: "Algeria" },

//     berat: 913,
//   },
// ]

export const BestSelling = component$(
  ({ data }: { data: BestTransactionProps }) => {
    const totalBerat = useComputed$(() => {
      return data.material.reduce((acc, a) => (acc + a?.berat) as number, 0)
    })

    const getPercentage = (berat: number) => {
      return ((berat / totalBerat.value) * 100).toPrecision(2)
    }
    return (
      <div class=" rounded p-2 shadow ">
        <h1 class="text-xl font-bold">Best Material Transaction</h1>

        <div class="overflow-x-auto">
          <table class="table table-xs static sm:table-sm md:table-md ">
            {/* head */}
            <thead>
              <tr>
                <th class="text-xl font-bold">Name</th>
                <th class="text-xl">Revenue ($ {totalBerat.value})</th>
                <th class="text-xl"> (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.combinedData.map((d) => (
                <tr key={d.users?.nama}>
                  <td class="">
                    <div class="flex items-center gap-3">
                      <div class="avatar static">
                        <div class="h-12 w-full rounded">
                          <img
                            height={10}
                            width={20}
                            src="https://picsum.photos/200/300?random=2"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          {d.users?.nama} {d.users?.nama_belakang}
                        </div>
                        <div class="text-sm  ">{d.users?.alamat}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex  gap-2">
                      <span class="">${d.materials?.sumBerat}</span>
                      <span class="w-fit">
                        <input
                          type="range"
                          min={0}
                          max={totalBerat.value}
                          value={d.materials?.sumBerat}
                          class="range range-accent range-xs "
                        />
                      </span>
                    </div>
                  </td>
                  <td class="w-fit">
                    {getPercentage(d.materials?.sumBerat as number)}%
                  </td>
                  <th>
                    <button class="btn btn-info  btn-sm">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th colSpan={2}>
                  <div class="join">
                    <button class="btn join-item ">«</button>
                    <button class="btn join-item ">Page 22</button>
                    <button class="btn join-item ">»</button>
                  </div>
                </th>
                <th colSpan={2}>
                  <select class="select select-bordered   w-full max-w-xs">
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
