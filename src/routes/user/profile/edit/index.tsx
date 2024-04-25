import { Resource, component$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  Form,
  z,
  Link,
  routeLoader$,
} from "@builder.io/qwik-city";
import { Session } from "@auth/core/types";
import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
import { users } from "~/db/users";
import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";

export const useGetUserId = routeLoader$(async ({ sharedMap, status }) => {
  const session = sharedMap.get("session") as Session;

  const res = await users.findId(Number(session.user.id));
  if (!res) {
    status(404);
  }
  return res;
});

export const useUpdateUser = routeAction$(
  async (data, { redirect, sharedMap }) => {
    const session: Session | null = sharedMap.get("session");
    const id = Number(session?.user.id);
    const res = await users.updateOne(id, data);
    if (res) {
      throw redirect(302, `/user/profile/`);
    }
    return res;
  },
  zod$({
    email: z.string().email(),
    alamat: z.string().min(1).max(30),
    no_hp: z.string().min(1).max(30),
    nama: z.string().min(1).max(30),
  }),
);

export default component$(() => {
  return (
    <section class="space-y-3 container">
      <Heads />
      <Forms />
    </section>
  );
});

export const Heads = component$(() => {
  return (
    <>
      {/* <Link class="btn btn-warning btn-xs" href="/user/profile">
        Back
      </Link> */}
      <Breadcrumbs data={getBreadcrumbTrail("Edit")} />
    </>
  );
});

export const Forms = component$(() => {
  const dataLoad = useGetUserId();
  const updateUserAction = useUpdateUser();

  return (
    <Resource
      value={dataLoad}
      onPending={() => <span class="loading loading-spinner"></span>}
      onRejected={() => <span>Error</span>}
      onResolved={(data) => (
        <div class="card static bg-base-100">
          <Form
            class="card-body items-center text-center"
            action={updateUserAction}
          >
            <h1 class="card-title">Update User : {data?.nama}</h1>

            <label class="form-control">
              Nama
              <input
                name="nama"
                class="input input-bordered"
                value={data?.nama || updateUserAction.formData?.get("nama")}
              />
            </label>

            <label class="form-control">
              Alamat
              <input
                name="alamat"
                class="input input-bordered"
                value={data?.alamat || updateUserAction.formData?.get("alamat")}
              />
            </label>

            <label class="form-control">
              No Hp
              <input
                type="tel"
                name="no_hp"
                class="input input-bordered"
                value={data?.no_hp || updateUserAction.formData?.get("np_hp")}
              />
            </label>

            <label class="form-control">
              Email
              <input
                name="email"
                class="input input-bordered"
                value={data?.email || updateUserAction.formData?.get("email")}
              />
            </label>
            <div class="card-actions">
              <button type="submit" class="btn btn-success">
                Update
              </button>

              <Link
                href={`/table/users/detail/${data?.id}`}
                class="btn btn-primary "
              >
                Back
              </Link>
            </div>
          </Form>
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
        </div>
      )}
    />
  );
});

export type PropsFormUserUpdate = {
  id: number;
  nama: string | null;
  alamat: string;
  no_hp: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

// [
//   {
//     name: "Home",
//     link: "/",
//   },
//   {
//     name: "Profile",
//     link: "/user/profile/",
//   },
//   {
//     name: "Edit",
//     link: "/user/profile/edit",
//   },
// ]
