import { component$, type QRL, useSignal } from "@builder.io/qwik"
import { LuPlus } from "@qwikest/icons/lucide"
import { getDate } from "~/lib/utils/date"

export const InputValue = component$(
  ({
    data: d,
    handlerAdd,
    loading,
    i,
  }: {
    i: number
    handlerAdd: QRL<(id: number, berat: number) => Promise<void>>
    loading: boolean
    data: {
      id: number
      nama: string
      deskripsi: string
      jumlah: number
      satuan: string
      berat: number
      kategori: string
      harga: number
      id_user: string | null
      createdAt: Date
      updatedAt: Date
    }
  }) => {
    const berat = useSignal<string>("")

    return (
      <div class="mt-2">
        <table class="table table-zebra table-xs static  rounded bg-base-100">
          <thead>
            <tr>
              <th>No</th>
              {/* <th>Kode</th> */}
              <th>Nama</th>
              <th>Kategori</th>
              <th>Berat</th>
              <th>Create</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <th>{i + 1}</th>
            {/* <td>{d.id}</td> */}
            <td>{d.nama}</td>
            <td>{d.kategori}</td>
            <td>{d.berat - Number(berat.value)}</td>
            <td>{getDate(d.createdAt)}</td>
            <td>
              <button
                class={`btn btn-primary btn-xs ${loading && "btn-disabled"}`}
                onClick$={() => {
                  if (Number(berat.value) <= d.berat) {
                    console.log(d.berat, "table")
                    console.log(berat.value, "value")
                    console.log(`tidak boleh berat ${berat.value}`)
                    handlerAdd(d.id, Number(berat.value))
                  }
                }}
              >
                <LuPlus />
              </button>
            </td>
          </tbody>
        </table>

        <label class="form-control">
          <input
            class="input input-primary "
            placeholder={`Masukan Berat Yang Dibutuhkan Max: ${d.berat}`}
            min={1}
            max={d.berat}
            type="number"
            onChange$={(_, el) => {
              berat.value = el.value
            }}
          />
        </label>

        {Number(berat.value) < d.berat ? (
          <p> </p>
        ) : (
          <p class="text-sm text-error">
            Tidak boleh lebih berat dart {d.berat}{" "}
          </p>
        )}
      </div>
    )
  },
)
