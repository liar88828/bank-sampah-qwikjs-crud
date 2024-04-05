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
      throw redirect(302, "/table/riwayat-penukaran");
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
    <section class="card static bg-base-300  ">
      <Form class="text-center card-body items-center" action={createAction}>
        <h1 class="card-title ">Create User</h1>

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
          Nama User
          <input
            //@ts-ignore
            list="id-user"
            type="text"
            class="input input-bordered"
            name={"id_user"}
          />
          <datalist
            id="id-user"
            // class="select select-bordered w-full  "
            //@ts-ignore
            // name={"id_user"}
          >
            {selectData.value.user.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.nama || ""}
              </option>
            ))}
          </datalist>
        </label>

        <label class="form-control">
          Opsi Penukaran
          <input
            //@ts-ignore
            list="id-opsi-penukaran"
            type="text"
            class="input input-bordered"
            name={"id_opsi_penukaran"}
          />
          <datalist
          id='id-opsi-penukaran'
            // class="select select-bordered w-full  "
            // name={"id_opsi_penukaran"}
          >
            {selectData.value.opsiPenukaran.map((d) => (
              //@ts-ignore
              <option key={d.id} value={d.id}>
                {String(d.id)} : {d.deskripsi || ""}
              </option>
            ))}
          </datalist>
        </label>

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>
        </div>
      </Form>

      {createAction.value?.failed && (
        <>
          {zodError?.id_opsi_penukaran && (
            <p>Opsi {zodError?.id_opsi_penukaran}</p>
          )}
          {zodError?.id_user && <p>User {zodError.id_user}</p>}
          {zodError?.tgl_tukar && <p>Tanggal {zodError.tgl_tukar}</p>}
        </>
      )}
      <div class="">
        <label for="browser">Choose your browser from the list:</label>
        <input
          //@ts-ignore
          list="browsers"
          name="browser"
          id="browser"
        />

        <datalist id="browsers">
          <option value="Edge"></option>
          <option value="Firefox"></option>
          <option value="Chrome"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
        </datalist>
      </div>
    </section>
  );
});
