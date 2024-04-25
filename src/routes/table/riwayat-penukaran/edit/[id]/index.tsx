import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { join } from "~/db/join/join";
import { riwayatPenukaran } from "~/db/riwayatPenukaran";
import { zodRiwayatPenukaran } from "~/lib/Zod";
import { getDate } from "~/lib/date";

export const useSelectData = routeLoader$(async () => {
  return join.user_opsiPenukaran();
});

export const useGet = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["id"], 10);
  const material = await riwayatPenukaran.findId(id);
  if (!material) {
    status(404);
  }
  return material;
});

export const useUpdate = routeAction$(async (data, { redirect, params }) => {
  const id = Number(params["id"]);

  const material = await riwayatPenukaran.updateOne(id, {
    tgl_transaksi: new Date(data.tgl_tukar),
    id_user: Number(data.id_user),
    id_material: Number(data.id_opsi_penukaran),
  });
  if (material) throw redirect(302, `/table/riwayat-penukaran/detail/${id}`);

  return material;
}, zodRiwayatPenukaran);

export default component$(() => {
  const updateAction = useUpdate();
  const materialData = useGet();
  const selectData = useSelectData();
  const zodError = updateAction?.value?.fieldErrors || null;

  return (
    <section class="card static bg-base-300 ">
      <Form class="card-body items-center text-center" action={updateAction}>
        <h1 class="card-title">
          Update : {getDate(materialData.value?.tgl_transaksi || new Date())}
        </h1>

        <label class="form-control">
          Tanggal Tukar
          <input
            name="tgl_tukar"
            class="input input-bordered"
            type="date"
            value={
              new Date(materialData?.value?.tgl_transaksi || 0).toISOString() ||
              updateAction.formData?.get("tgl_tukar")
            }
          />
        </label>

        <label class="form-control">
          <select class="select select-bordered w-full  " name={"id_user"}>
            {selectData.value.user.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.nama || ""}
              </option>
            ))}
          </select>
        </label>

        <label class="form-control">
          <select
            class="select select-bordered w-full  "
            name={"id_opsi_penukaran"}
          >
            {selectData.value.opsiPenukaran.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.deskripsi || ""}
              </option>
            ))}
          </select>
        </label>

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>

          <Link
            href={`/table/riwayat-penukaran/detail/${materialData.value?.id}`}
            class="btn btn-primary "
          >
            Back
          </Link>
        </div>
      </Form>

      {updateAction.value?.failed && (
        <>
          {zodError?.id_opsi_penukaran && (
            <p>Opsi {zodError?.id_opsi_penukaran}</p>
          )}
          {zodError?.id_user && <p>User {zodError.id_user}</p>}
          {zodError?.tgl_tukar && <p>Tanggal {zodError.tgl_tukar}</p>}
        </>
      )}
    </section>
  );
});
