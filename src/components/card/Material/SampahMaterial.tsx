import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { PropsFindOpsi } from "~/type/db/cart.type"

export const SampahMaterial = component$(
  ({ data }: { data: PropsFindOpsi }) => {
    return (
      <div class=" card card-compact static bg-base-100">
        <div class="card-body">
          <div class="rounded-lg bg-base-100 p-5 shadow">
            <div class="gap-5 sm:flex">
              <h1 class="text-md font-bold sm:text-xl ">Sampah Material</h1>
            </div>
            {/* ------ */}
            <div class="overflow-x-auto">
              <table class="table table-xs static sm:table-sm md:table-md ">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>id</th>
                    <th>Nama</th>
                    <th>Berat</th>
                    <th>Kategori</th>
                    <th>Status</th>
                    <th>Harga</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.Cases.flatMap((d, i) => (
                    <tr key={d.id}>
                      <td>{i + 1}</td>
                      <td>{d.id}</td>
                      <td>{d.Material?.nama}</td>
                      <td>
                        {d.Material?.berat} {d.Material?.satuan}
                      </td>
                      <td>{d.Material?.kategori}</td>
                      <td>{d.status}</td>
                      <td>{d.Material?.harga}</td>
                      <th class="flex gap-2">
                        <Link
                          href={`/table/material/detail/${d.id_material}`}
                          class="btn btn-info btn-xs"
                        >
                          details
                        </Link>
                        <Link
                          href={`/table/material/detail/${d.id_material}`}
                          class="btn btn-error btn-xs"
                        >
                          Batal
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
