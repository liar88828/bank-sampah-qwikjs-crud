import { Resource, component$, useSignal } from "@builder.io/qwik";
import { useLoadMaterial } from "..";
import { JenisSampah } from "../../dashboard/components/JenisSampah";
import { useNavigate } from "@builder.io/qwik-city";

export const MaterialSampah = component$(() => {
  const datas = useLoadMaterial();
  const nav = useNavigate();
  const nama = useSignal('')
  // console.log(datasWithPercentage);
  return (
    <>
      <Resource
        value={datas}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(data) => {
          // const total = datas.flatMap((d) => d.size).reduce((a, b) => a + b, 0);

          return (
            <>
              <div class="rounded-lg bg-base-100 p-5 shadow">
                <div class='flex items-center gap-5'>
                  <h1 class="text-xl font-bold">Sampah Material</h1>
                  <JenisSampah data={data.group} />

                  <div class="flex items-center gap-5">
                    <input
                      type="text"
                      class='input input-bordered'
                      bind:value={nama} />

                    <button class='btn btn-info'
                      onClick$={() => nav("/menu/page?nama=" + nama.value)}>
                      Search
                    </button>
                  </div>

                </div>
                <div class="overflow-x-auto">
                  <table class="table table-xs static sm:table-sm md:table-md ">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>id</th>
                        <th>Nama</th>
                        <th>Berat</th>
                        <th>Jenis</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {data.load.map((d, i) => (
                        <tr key={d.id}>
                          <td>{i + 1}</td>
                          <td>{d.id}</td>
                          <td>{d.nama}</td>
                          <td>{d.jenis}</td>
                          <td>{d.berat}Kg</td>
                          <th>
                            <button class="btn btn-info btn-sm">details</button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                    <tr>
                      <th
                      // colSpan={2}
                      >
                        <div class="join">
                          <button class="btn join-item btn-sm">«</button>
                          <button class="btn join-item btn-sm">Page 22</button>
                          <button class="btn join-item btn-sm">»</button>
                        </div>
                      </th>
                      <th
                      // colSpan={2}
                      >
                        <select class="select select-bordered select-sm w-full max-w-xs">
                          <option disabled selected>
                            Who shot first?
                          </option>
                          <option>Han Solo</option>
                          <option>Greedo</option>
                        </select>
                      </th>
                    </tr>
                  </tfoot> */}
                  </table>
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
});
