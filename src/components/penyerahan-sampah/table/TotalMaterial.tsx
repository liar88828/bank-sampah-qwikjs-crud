import { component$ } from "@builder.io/qwik";
import { Pagination } from "~/components/basic/pagination";
import { TotalMaterialProps } from "~/type/penyerahan-sampah.type";

export const TotalMaterial = component$(
  ({ data }: { data: TotalMaterialProps }) => {
    return (
      <section class="rounded-b-lg  bg-white p-5 shadow sm:rounded-lg ">
        <div class="mb-2 flex items-center justify-between gap-2">
          <h2 class="text-xl font-bold">Opsi Penukaran</h2>
        </div>
        <div class="overflow-x-auto  bg-base-100 shadow-lg">
          <table class="table table-zebra table-xs static  rounded ">
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
                  <td>{d?.jenis}</td>

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
      </section>
    );
  },
);
