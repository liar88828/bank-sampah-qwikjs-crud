import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { zodRiwayatPenukaran } from "~/lib/Zod";
import { join } from "~/db/join";
import { riwayatPenukaran } from "~/db/riwayatPenukaran";

export const useSelectData = routeLoader$(async () => {
  return join.user_opsiPenukaran();
});

export const useCreateOpsiPenukaran = routeAction$(
  async (data, { redirect }) => {
    const json = await riwayatPenukaran.createOne({
      tgl_tukar: new Date(data.tgl_tukar),
      id_user: Number(data.id_user),
      id_opsi_penukaran: Number(data.id_opsi_penukaran),
    });
    if (json) {
      throw redirect(302, "/riwayat-penukaran");
    }

    return json;
  },
  zodRiwayatPenukaran,
);

export default component$(() => {
  const createAction = useCreateOpsiPenukaran();
  const selectData = useSelectData();
  const zodError = createAction?.value?.fieldErrors || null;

  return (
    <section class="card static bg-neutral text-neutral-content ">
      <Form class="text-cente card-body items-center" action={createAction}>
        <h1 class="card-title">Create User</h1>

        <label class="form-control">
          Tanggal Tukar
          <input
            name="tgl_tukar"
            class="input input-bordered"
            type="date"
            value={createAction.formData?.get("tgl_tukar")}
          />
        </label>

        <label class="form-control">
          <select class="select select-bordered w-full  " name={"id_user"}>
            {selectData.value.user.map((d) => (
              <option key={d.id} value={d.id}>
                {d.id} : {d.nama || ""}
              </option>
            ))}
          </select>
        </label>

        <label class="form-control">
          <select class="select select-bordered w-full  " 
          name={"id_opsi_penukaran"}>
            {selectData.value.opsiPenukaran.map((d) => (
              <option key={d.id} value={d.id}>
                {d.id} : {d.deskripsi || ""}
              </option>
            ))}
          </select>
        </label>

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
      </Form>

      {createAction.value?.failed && (
        <>
          {zodError?.id_opsi_penukaran && <p>Opsi {zodError?.id_opsi_penukaran}</p>}
          {zodError?.id_user && <p>User  {zodError.id_user}</p>}
          {zodError?.tgl_tukar && <p>Tanggal {zodError.tgl_tukar}</p>}
        </>
      )}
    </section>
  );
});
