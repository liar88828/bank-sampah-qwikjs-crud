import { component$, Resource } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { users } from "~/db/users";

export const useGetUsers = routeLoader$(async () => {
  return users.findAll();
});

export const useDeleteUserOnly = routeAction$(
  async (data) => {
    return users.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const usersData = useGetUsers();
  const userDelete = useDeleteUserOnly();

  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>User's directory</h1>
        <Link class="btn btn-info btn-xs" href="/table/users/create">
          Create
        </Link>
      </div>

      <Resource
        value={usersData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(users) => (
          <div class="overflow-x-auto">
            <table class="table table-zebra table-xs static  rounded ">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>No Hp</th>
                  <th>Email</th>
                  <th>Create</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id}>
                    <th>{i + 1}</th>
                    <td>{user.nama}</td>
                    <td>{user.alamat}</td>
                    <td>{user.no_hp}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.createdAt.toLocaleDateString("id-ID", {
                        dateStyle: "full",
                      })}
                    </td>
                    <td class="flex flex-nowrap gap-2">
                      <Link
                        href={`/table/users/detail/${user.id}`}
                        class="btn btn-primary btn-xs"
                      >
                        Detail
                      </Link>

                      <Form action={userDelete}>
                        <input type="hidden" name="id" value={user.id} />
                        <button type="submit" class="btn btn-error btn-xs">
                          Delete
                        </button>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      />
    </section>
  );
});
