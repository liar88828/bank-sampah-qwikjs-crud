import { component$ } from "@builder.io/qwik"
import { Form, Link } from "@builder.io/qwik-city"
import { useCreateTransaksi } from "~/action/transaksi.action"
import { CardHead } from "~/components/basic/body/card/card-head"
import { CardBody } from "~/components/basic/body/card/card-body"
import { type UserSelect } from "~/db/join/join"

export const TransaksiCreate = component$(
  ({ select }: { select: UserSelect }) => {
    const createAction = useCreateTransaksi()
    const zodError = createAction?.value?.fieldErrors || null
    return (
      <CardBody>
        <CardHead
          href="/table/transaksi/create"
          title="Transaksi's directory"
        />
        <Form class="flex items-center text-center" action={createAction}>
          <label class="form-control">
            Tanggal Transaksi
            <input
              name="tgl_transaksi"
              class="input input-bordered"
              type="date"
              value={createAction.formData?.get("tgl_transaksi")}
            />
          </label>

          {/* <label class="form-control">
          Berat
          <input
            name="berat"
            class="input input-bordered"
            type={'number'}
            min="1"
            value={createAction.formData?.get("berat")}
          />
        </label>
         */}
          {/* <label class="form-control">
          Harga
          <input
            
            type={'number'}
            name="harga"
            class="input input-bordered"
            min="1"
            value={createAction.formData?.get("harga")}
          />
        </label> */}

          <label class="form-control">
            <select class="select select-bordered w-full  " name={"id_user"}>
              {/*<option disabled selected>Who shot first?</option>*/}
              {select.user.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nama || ""}
                </option>
              ))}
            </select>
          </label>

          {/*
        <label class="form-control">
          <select class="select select-bordered w-full  "
                  name={'id_material'}
          >
            {selectData.value.materials.map(m => (
              <option key={m.id} value={m.id}>{m.nama || ''}</option>
            ))}
          </select>
        </label>
         */}

          <div class="card-actions">
            <button type="submit" class="btn btn-success">
              Create
            </button>
            <Link href="/table/transaksi" class="btn btn-warning">
              Back
            </Link>
          </div>

          {createAction.value?.failed && (
            <>
              {/* {zodError?.berat && <p>Berat {zodError?.berat}</p>}
              {zodError?.harga && <p>Harga {zodError.harga}</p>}
              {zodError?.id_material && <p>ID Material{zodError.id_material}</p>} */}
              {zodError?.id_user && <p>ID User {zodError.id_user}</p>}
              {zodError?.tgl_transaksi && (
                <p>Tanggal Transaksi {zodError.tgl_transaksi}</p>
              )}
            </>
          )}
        </Form>
      </CardBody>
    )
  },
)
