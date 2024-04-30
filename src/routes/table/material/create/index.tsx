import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { material } from "~/db/material/material";
import { zodMaterial } from "~/lib/Zod";
import { Instruction } from "../../../../components/basic/Instruction";
import { Session } from "@auth/core/types";

export const useCreate = routeAction$(async (data, { redirect, sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  const res = await material.createOne({
    id_user: Number(session.user.id),
    nama: data.nama,
    kategori: data.kategori,
    berat: Number(data.berat),
    deskripsi: data.deskripsi,
    harga: Number(data.harga),
    satuan: data.satuan,
    jumlah: Number(data.harga),
  });
  if (res) {
    throw redirect(302, "/table/material");
  }

  return res;
}, zodMaterial);

export default component$(() => {
  return (
    <section class="container space-y-2">
      <Heads />
      <div class="grid rounded-2xl bg-base-200 sm:grid-cols-2">
        <Instruction title={"material"} />
        <Forms />
      </div>
    </section>
  );
});

export const Forms = component$(() => {
  const createAction = useCreate();
  const zodError = createAction?.value?.fieldErrors || null;
  return (
    <div class="card static  bg-base-100">
      <Form class="card-body items-center text-center" action={createAction}>
        <h1 class="card-title">Create User</h1>

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
            value={createAction.formData?.get("deskripsi") || ""}
          ></textarea>
          {zodError?.deskripsi && (
            <p class="text-red-500">Deskripsi {zodError.deskripsi}</p>
          )}
        </label>

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
    </div>
  );
});

export const Heads = component$(() => {
  return <Breadcrumbs data={getBreadcrumbTrail("Material")} />;
});
