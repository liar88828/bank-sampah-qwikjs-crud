import { component$ } from "@builder.io/qwik"
import { Form, Link } from "@builder.io/qwik-city"
import { useUpdate } from "~/action/material.action"
import type { Material } from "@prisma/client"

export const FormEditMaterial = component$(({ data }: { data: Material }) => {
  const updateAction = useUpdate()

  return (
    <div class="card bg-base-100 ">
      <Form class="card-body items-center text-center" action={updateAction}>
        <h1 class="card-title">Update : {data?.nama}</h1>
        <label class="form-control">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={data?.nama ?? updateAction.formData?.get("nama")}
          />
        </label>
        <label class="form-control">
          Jenis
          <input
            name="jenis"
            class="input input-bordered"
            value={data?.nama ?? updateAction.formData?.get("jenis")}
          />
        </label>
        <label class="form-control">
          Berat
          <input
            name="berat"
            type={"number"}
            class="input input-bordered"
            value={data?.berat ?? updateAction.formData?.get("berat")}
          />
        </label>
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>

          <Link
            href={`/table/material/detail/${data?.id}`}
            class="btn btn-primary "
          >
            Back
          </Link>
        </div>
        {updateAction.value?.failed && (
          <p>Nama {updateAction.value.fieldErrors.nama}</p>
        )}
        {updateAction.value?.failed && (
          <p>Alamat {updateAction.value.fieldErrors.berat}</p>
        )}
      </Form>
    </div>
  )
})
