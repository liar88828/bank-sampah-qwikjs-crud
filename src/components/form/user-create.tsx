import { component$ } from "@builder.io/qwik";
import { ActionStore, Form } from "@builder.io/qwik-city";

type TUserAction = ActionStore<
  {
    formErrors: string[];
    fieldErrors: {
      nama?: string[] | undefined;
      email?: string[] | undefined;
      alamat?: string[] | undefined;
      no_hp?: string[] | undefined;
    };
    failed: true;
  },
  {
    nama: string;
    email: string;
    alamat: string;
    no_hp: string;
  },
  false
>;

export const FormUserCreate = component$(
  ({ createUserAction }: { createUserAction: TUserAction }) => {
    return (
      <section class="card bg-base-300 ">
        <Form
          class="card-body items-center text-center"
          action={createUserAction}
        >
          <h1 class="card-title">Create User</h1>

          <label class="form-control">
            Nama
            <input
              name="nama"
              class="input input-bordered"
              value={createUserAction.formData?.get("name")}
            />
          </label>

          <label class="form-control">
            Alamat
            <input
              name="alamat"
              class="input input-bordered"
              value={createUserAction.formData?.get("alamat")}
            />
          </label>

          <label class="form-control">
            No Hp
            <input
              type="tel"
              name="no_hp"
              class="input input-bordered"
              value={createUserAction.formData?.get("np_hp")}
            />
          </label>

          <label class="form-control">
            Email
            <input
              name="email"
              class="input input-bordered"
              value={createUserAction.formData?.get("email")}
            />
          </label>
          <div class="card-actions">
            <button type="submit" class="btn btn-success">
              Create
            </button>
          </div>
        </Form>
        {!createUserAction.value?.failed && (
          <div>
            <h2>User created successfully!</h2>
          </div>
        )}

        {createUserAction.value?.failed && (
          <p>Email {createUserAction.value.fieldErrors.email}</p>
        )}
        {createUserAction.value?.failed && (
          <p>Nama {createUserAction.value.fieldErrors.nama}</p>
        )}
        {createUserAction.value?.failed && (
          <p>No Hp {createUserAction.value.fieldErrors.no_hp}</p>
        )}
        {createUserAction.value?.failed && (
          <p>Alamat {createUserAction.value.fieldErrors.alamat}</p>
        )}
      </section>
    );
  },
);