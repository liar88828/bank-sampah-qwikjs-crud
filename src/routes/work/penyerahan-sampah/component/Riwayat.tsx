import { component$, Resource } from "@builder.io/qwik";
import { useGetPenukaran, useGetTransaksiSampah } from "../layout";
import { Pagination } from "~/components/basic/pagination";
import { OpsiPenukaran } from "./OpsiPenukaran";
import {
  TestData,
  TotalMaterialProps,
} from "../../type/penyerahan-sampah.type";
import { getDate } from "~/lib/date";

// const test:TestData='total_berat'

export const Riwayat = component$(() => {
  const dataLoad = useGetPenukaran();

  return (
    <div class="rounded-lg bg-white p-5 shadow">
      <div class="space-y-5">
        <Resource
          value={dataLoad}
          onPending={() => <span class="loading loading-spinner"></span>}
          onRejected={() => <span>Error</span>}
          onResolved={(data) => {
            return (
              <>
                <section>
                  <div class="mb-2 flex items-center justify-between gap-2">
                    <h2 class="text-xl font-bold">Riwayat Penukaran</h2>
                  </div>

                  <div class="overflow-x-auto  bg-base-100 shadow-lg">
                    <table class="table table-zebra table-xs static  rounded ">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Tanggal Penukaran</th>
                          <th>Nama Penukar</th>
                          <th>Alamat Penukar</th>
                          <th>No Hp Penukar</th>
                          <th>Harga Tukar</th>
                          <th>Deskripsi Tukar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((d, i) => (
                          <tr key={d?.id}>
                            <th>{i + 1}</th>
                            <td>{getDate(d?.tgl_tukar)}</td>
                            <td>{d?.User?.nama}</td>
                            <td>{d?.User?.alamat}</td>
                            <td>{d?.User?.no_hp}</td>
                            <td>{d?.Opsi_Penukaran?.harga}</td>
                            <td>{d?.Opsi_Penukaran?.deskripsi}</td>

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
                            <button class="btn btn-primary btn-xs">
                              Action
                            </button>
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </>
            );
          }}
        />
      </div>
    </div>
  );
});
