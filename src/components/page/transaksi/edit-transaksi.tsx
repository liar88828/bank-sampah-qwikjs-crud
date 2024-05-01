import { component$ } from "@builder.io/qwik"
import { Form, Link } from "@builder.io/qwik-city"
import { useUpdateTransaksi } from "~/action/transaksi.action"
import { CardBody } from "~/components/basic/body/card/card-body"
import { CardHead } from "~/components/basic/body/card/card-head"
import { type UserSelect } from "~/db/join/join"
import { type PropsTransaksi } from "~/type/db/table.type"

export const EditTransaksi = component$(
  ({ select, data }: { data: PropsTransaksi; select: UserSelect }) => {
    const updateAction = useUpdateTransaksi()
    console.log(updateAction.value)
    const zodError = updateAction?.value?.fieldErrors || null
    return (
      <CardBody>
        <CardHead
          href="/table/transaksi/create"
          title="Transaksi's directory"
        />
        <Form class="card-body items-center text-center" action={updateAction}>
          <label class="form-control">
            Tanggal Transaksi
            <input
              name="tgl_transaksi"
              class="input input-bordered"
              type="date"
            />
          </label>

          {/* <label class="form-control">
              Berat
              <input
                name="berat"
                class="input input-bordered"
                type={'number'}
                min="1"
                value={
                  transaksi?.berat ||
                  updateAction.formData?.get("berat")}
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
                value={
                  transaksi?.harga ||
                  updateAction.formData?.get("harga") ||
                  0}
              />
            </label> */}

          <label class="form-control">
            <select class="select select-bordered w-full " name={"id_user"}>
              {select.user.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nama || ""}
                </option>
              ))}
            </select>
          </label>

          {/* <label class="form-control">
              <select class="select select-bordered w-full  "
                      name={'id_material'}
              >
                {selectData.value.materials.map(m => (
                  <option key={m.id} value={m.id}>{m.nama || ''}</option>
                ))}
              </select>
            </label> */}

          <div class="card-actions">
            <button type="submit" class="btn btn-success">
              Update
            </button>

            <Link
              href={`/table/transaksi/detail/${data?.id}`}
              class="btn btn-primary "
            >
              Back
            </Link>
          </div>
          {!updateAction.value?.failed && (
            <div>
              <h2>User Update successfully!</h2>
            </div>
          )}

          {updateAction.value?.failed && (
            <>
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
