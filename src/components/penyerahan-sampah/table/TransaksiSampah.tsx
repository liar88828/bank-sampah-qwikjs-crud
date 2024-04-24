import { component$ } from "@builder.io/qwik";
import { Pagination } from "~/components/basic/pagination";
import {
  TestData,
  TransaksiSampahProps,
} from "../../../type/penyerahan-sampah.type";

export const TransaksiSampah = component$(
  ({ data }: { data: TransaksiSampahProps }) => {
    const getTotal = (list: TestData) => {
      return data.reduce((acc, curr: any) => {
        if (!curr?.[list]) {
          return acc;
        } else {
          return acc + curr[list];
        }
      }, 0);
    };
    const totalBerat = getTotal("total_berat");
    const totalHarga = getTotal("total_harga");

    return (
      <section class="rounded  bg-base-100 p-5 shadow  ">
        <div class="mb-2 flex items-center justify-between gap-2">
          <h2 class="text-xl font-bold">Transaksi Sampah</h2>
          <h2 class="text-lg font-semibold">Total Berat : {totalBerat}</h2>
          <h2 class="text-lg font-semibold">Total Harga : {totalHarga}</h2>
        </div>

        <div class="overflow-x-auto   ">
          <table class="table table-zebra table-xs static  rounded border ">
            <thead>
              <tr>
                <th>No</th>
                <th>Total Berat</th>
                <th>Total Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d?.id}>
                  <th>{i + 1}</th>
                  <td>{d?.berat}</td>
                  <td>{d?.harga}</td>

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
