import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  Form,
  z,
} from "@builder.io/qwik-city";
import { createUser } from "~/db/users";

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const user = await createUser(data);
    if (user) {
      throw redirect(302, "/users");
    }
    console.log(user);
    return user;
  },
  zod$({
    email: z.string().email(),
    alamat: z.string().min(1).max(30),
    no_hp: z.string().min(1).max(30),
    nama: z.string().min(1).max(30),
  }),
);

export default component$(() => {
  const createUserAction = useCreateUser();
  // console.log(createUserAction.value);
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Form class="text-cente card-body items-center" action={createUserAction}>
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
});
