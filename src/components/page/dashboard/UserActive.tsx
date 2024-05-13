import { component$ } from "@builder.io/qwik"
import type { UserActiveDashboard } from "~/type/db/dashboard.type"

// const datas = [
//   { name: "Barbara", city: "Turkmenistan", work: "admin" },
//   { name: "Isabelle", city: "El Salvador", work: "product" },
//   { name: "Josephine", city: "Peru", work: "developer" },
//   { name: "Ophelia", city: "Equatorial Guinea", work: "developer" },
//   { name: "Beatrice", city: "Grenada", work: "developer" },
// ];

export const UserActive = component$(
  ({ data }: { data: UserActiveDashboard[] }) => {
    return (
      <div class="rounded bg-base-100 p-5 shadow ">
        <h1 class="text-xl font-bold">Active Users</h1>
        <div class="overflow-x-auto">
          <table class="table table-xs static sm:table-sm md:table-md ">
            {/* head */}
            <thead>
              {/* <tr>
              <th>User </th>
              <th>As </th>
              <th>Total </th>
              <th></th>
            </tr> */}
            </thead>

            <tbody>
              {data.map((d) => (
                <tr key={d.nama}>
                  {/* {i + 1}.  */}
                  <td class="flex items-center gap-2  ">
                    <div class="avatar static  ">
                      <div class="w-10 rounded-full  ring-2 ring-primary ">
                        <img
                          height={50}
                          width={50}
                          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="text-lg font-bold">
                        {d.nama} {d.nama_belakang}
                      </div>
                      <div class="text-sm">{d.alamat}</div>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="">{d.User_Option?.role}</div>
                      <input
                        type="checkbox"
                        checked={true}
                        class="checkbox-success checkbox"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="btn btn-info  btn-sm">Info</div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>
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
