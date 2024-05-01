import { component$ } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import { useCreateMaterialTable } from "~/action/material.action"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { Checkbox } from "~/components/basic/body/text/checkbox"

export const FormCreateMaterial = component$(() => {
  const createAction = useCreateMaterialTable()
  const zodError = createAction?.value?.fieldErrors || null
  return (
    <CardLayout title="Create User" href="">
      <Form action={createAction}>
        <label class="form-control w-full">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={createAction.formData?.get("nama")}
          />
        </label>
        {zodError?.nama && <p class="text-red-500">Nama {zodError.nama}</p>}

        <div class="grid w-full grid-cols-8 gap-2">
          <label class="form-control col-span-3">
            Berat
            <input
              type="number"
              name="berat"
              class="input input-bordered"
              value={createAction.formData?.get("berat")}
            />
            {zodError?.berat && (
              <p class="text-red-500">Berat {zodError.berat}</p>
            )}
          </label>

          <label class="form-control col-span-3">
            Harga
            <input
              type="number"
              name="harga"
              class="w- input input-bordered"
              value={createAction.formData?.get("harga")}
            />
            {zodError?.harga && (
              <p class="text-red-500">Harga {zodError.harga}</p>
            )}
          </label>

          <label class="form-control col-span-2">
            Satuan
            <input
              type="text"
              name="satuan"
              class="input input-bordered "
              value={createAction.formData?.get("satuan")}
            />
          </label>
          {zodError?.satuan && (
            <p class="text-red-500">Satuan {zodError.satuan}</p>
          )}
        </div>
        <div class="grid w-full grid-cols-2 gap-2">
          <label class="form-control col-span-1">
            Kategori
            <input
              name="kategori"
              class="input input-bordered"
              value={createAction.formData?.get("kategori")}
            />
            {zodError?.kategori && (
              <p class="text-red-500">Kategori {zodError.kategori}</p>
            )}
          </label>

          <label class="form-control col-span-1">
            Jumlah
            <input
              type="number"
              name="jumlah"
              class="input input-bordered"
              value={createAction.formData?.get("jumlah")}
            />
            {zodError?.jumlah && (
              <p class="text-red-500">Jumlah {zodError.jumlah}</p>
            )}
          </label>
        </div>

        <label class="form-control w-full">
          Deskripsi
          <textarea
            name="deskripsi"
            class="textarea textarea-bordered "
            //@ts-ignore
            value={createAction.formData?.get("deskripsi") || ""}
          ></textarea>
          {zodError?.deskripsi && (
            <p class="text-red-500">Deskripsi {zodError.deskripsi}</p>
          )}
        </label>

        <Checkbox
          label="Pastikan data sudah di isi dengan benar"
          key="checkbox"
        />

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
        {createAction.value?.failed && (
          <>
            {zodError?.berat && <p>Nama {zodError?.nama}</p>}
            {zodError?.berat && <p>Alamat {zodError.berat}</p>}
          </>
        )}
      </Form>
    </CardLayout>
  )
})
