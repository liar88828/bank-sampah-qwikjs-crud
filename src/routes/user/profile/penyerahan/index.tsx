import { $, component$, useStore } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useCreatePenyerahan, useLoadData } from "./layout";
import { SampahStore } from "~/type/penyerahan-sampah.type";

export default component$(() => {
  const action = useCreatePenyerahan();
  const {
    value: { queryData: query },
  } = useLoadData();

  const listSampah = useStore<SampahStore>({
    list: [{ id: 0, berat: 0, jenis: "", nama: "" }],

    remove: $(function (this: SampahStore, index: number) {
      const newData = this.list.filter((item) => item.id !== index);
      this.list = newData;
    }),

    add: $(function (this: SampahStore) {
      const newSampah = [
        ...this.list,
        { id: this.list.length + 1, berat: 0, jenis: "", nama: "" },
      ];
      this.list = newSampah;
    }),
  });

  const handlerAdd = $(() => {
    listSampah.add();
  });

  const handlerRemove = $((i: number) => {
    listSampah.remove(i);
  });

  return (
    <section class="card static bg-base-300 ">
      <Form class="card-body items-center text-center" action={action}>
        <h1 class="card-title">Penyerahan Sampah</h1>
        <div class="flex items-center gap-5">
          <button
            type="button"
            onClick$={handlerAdd}
            class="btn btn-info btn-sm"
          >
            Add List Sampah
          </button>
        </div>

        {listSampah.list.map((d, i) => (
          <div
            key={d.id}
            //  class="bg-base-200 p-4"
          >
            <div class="no-wrap flex p-2">
              <label class="form-control">
                Nama Sampah
                <input
                  name={`sampah.${i}.nama`}
                  class="input input-bordered"
                  value={
                    query.nama_sampah ||
                    action.formData?.get(`sampah.${i}.nama`)
                  }
                />
              </label>

              <label class="form-control">
                Jenis Sampah
                <input
                  name={`sampah.${i}.jenis`}
                  class="input input-bordered"
                  value={
                    query.jenis_sampah ||
                    action.formData?.get(`sampah.${i}.jenis`)
                  }
                />
              </label>

              <label class="form-control">
                Berat Sampah
                <input
                  type="number"
                  name={`sampah.${i}.berat`}
                  class="input input-bordered"
                  value={
                    query.berat_sampah ||
                    action.formData?.get(`sampah.${i}.berat`)
                  }
                />
              </label>

              <label class="form-control">
                _
                <button
                  type="button"
                  onClick$={() => handlerRemove(d.id)}
                  class="btn btn-info"
                >
                  Delete
                </button>
              </label>
            </div>
          </div>
        ))}

        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Create
          </button>

          <Link class="btn btn-warning" href="/user/profile">
            Back
          </Link>
        </div>
      </Form>
    </section>
  );
});
