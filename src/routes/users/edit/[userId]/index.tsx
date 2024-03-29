import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  Form,
  useNavigate,
  z,
  routeLoader$,
  Link,
} from "@builder.io/qwik-city";
import { prisma } from "~/db/prisma";
import { findUserId, updateUser } from "~/db/users";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["userId"], 10);
  const user = await findUserId(id);
  // const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    status(404);
  }
  return user;
});

export const useUpdateUser = routeAction$(
  async (data, { redirect, params }) => {
    const id = Number(params["userId"]);
    const user = await updateUser(id, data);
    if (user) {
      throw redirect(302, `/users/detail/${id}`);
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
  // zod$((z) =>
  //   z.object({
  //     email: z.string().email(),
  //     alamat: z.string(),
  //     no_hp: z.string(),
  //     nama: z.string(),
  //   }),
  // ),
);

export default component$(() => {
  const updateUserAction = useUpdateUser();
  const userData = useGetUser();
  // const nav = useNavigate();
  console.log(updateUserAction.value);
  return (
    <section class="card bg-neutral text-neutral-content ">
      <Form
        class="text-cente card-body items-center"
        action={updateUserAction}
        // onSubmitCompleted$={()=>{
        //   updateUserAction.value?.success&& nav('/users')
        // }}
      >
        <h1 class="card-title">Update User : {userData.value?.nama}</h1>

        <label class="form-control">
          Nama
          <input
            name="nama"
            class="input input-bordered"
            value={
              userData.value?.nama || updateUserAction.formData?.get("name")
            }
          />
        </label>

        <label class="form-control">
          Alamat
          <input
            name="alamat"
            class="input input-bordered"
            value={
              userData.value?.alamat || updateUserAction.formData?.get("alamat")
            }
          />
        </label>

        <label class="form-control">
          No Hp
          <input
            type="tel"
            name="no_hp"
            class="input input-bordered"
            value={
              userData.value?.no_hp || updateUserAction.formData?.get("np_hp")
            }
          />
        </label>

        <label class="form-control">
          Email
          <input
            name="email"
            class="input input-bordered"
            value={
              userData.value?.email || updateUserAction.formData?.get("email")
            }
          />
        </label>
        <div class="card-actions">
          <button type="submit" class="btn btn-success">
            Update
          </button>

          <Link
            href={`/users/detail/${userData.value?.id}`}
            class="btn btn-primary "
          >
            Back
          </Link>
        </div>
      </Form>
      {!updateUserAction.value?.failed && (
        <div>
          <h2>User Update successfully!</h2>
        </div>
      )}

      {updateUserAction.value?.failed && (
        <p>Email {updateUserAction.value.fieldErrors.email}</p>
      )}
      {updateUserAction.value?.failed && (
        <p>Nama {updateUserAction.value.fieldErrors.nama}</p>
      )}
      {updateUserAction.value?.failed && (
        <p>No Hp {updateUserAction.value.fieldErrors.no_hp}</p>
      )}
      {updateUserAction.value?.failed && (
        <p>Alamat {updateUserAction.value.fieldErrors.alamat}</p>
      )}
    </section>
  );
});
