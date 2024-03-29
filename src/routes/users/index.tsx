import {component$, Resource,} from "@builder.io/qwik";
import {Form, Link, routeAction$, routeLoader$, z, zod$,} from "@builder.io/qwik-city";
import {deleteUser, findAllUser} from "~/db/users";

export const useGetUsers = routeLoader$(async () => {
  // const users = await prisma.user.findMany();
  const users = await findAllUser();
  // const user = await deleteUser(Number(data.id));
  return users;
});

export const useDeleteUserOnly = routeAction$(
  async (data) => {
    // console.log(data);
    
    // const userData = await prisma.user.delete({
    //   where: { id: Number(data.id) },
    // });
    
    const user = await deleteUser(Number(data.id));
    return user;
  },
  zod$({id: z.string()}),
);

export default component$(() => {
  const usersData = useGetUsers();
  const userDelete = useDeleteUserOnly();
  
  return (
    <section class="container bg-base-300 p-5">
      <div class="mb-2 flex items-center gap-2">
        <h1>User's directory</h1>
        <Link class="btn btn-info btn-xs" href="/users/create">
          Create
        </Link>
      </div>
      
      <Resource
        value={usersData}
        onPending={() => <span class="loading loading-spinner"></span>}
        onRejected={() => <span>Error</span>}
        onResolved={(users) => (
          <div class="overflow-x-auto">
            <table class="static table table-zebra table-xs  rounded ">
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
                      href={`/users/detail/${user.id}`}
                      class="btn btn-primary btn-xs"
                    >
                      Detail
                    </Link>
                    
                    <Form action={userDelete}>
                      <input type="hidden" name="id" value={user.id}/>
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

{
  /* <ul>
{users.value.map((user, i) => (
  <li key={user.id}>
    <div class="card bg-base-100 w-96 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          {i + 1}. {user.nama}
        </h2>
        <p>
          {user.alamat} {user.no_hp}
        </p>
        <p> {user.email} </p>
        <div class="card-actions justify-end">
          <p>
            <span>create at </span>
            <span>
              {user.createdAt.toLocaleDateString("id-ID", {
                dateStyle: "full",
              })}
            </span>
          </p>

          <Link href={`/users/${user.id}`} class="btn btn-primary">
            Detail
          </Link>
        </div>
      </div>
    </div>
  </li>
))}
</ul> */
}
