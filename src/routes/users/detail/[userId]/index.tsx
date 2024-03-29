import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/db/prisma";
import { deleteUser, findUserId } from "~/db/users";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const id = parseInt(params["userId"], 10);
  const user = findUserId(id);
  // const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    status(404);
  }
  return user;
});

export const useDeleteUser = routeAction$(
  async (data, { redirect }) => {
    const user = await deleteUser(Number(data.id));
    // const user = await prisma.user.delete({ where: { id: Number(data.id) } });
    // console.log(user);

    if (user) {
      throw redirect(302, "/users");
    }
    return user;
  },
  zod$({ id: z.string() }),
);

export default component$(() => {
  const { value: user } = useGetUser();
  const deleteUser = useDeleteUser();
  return (
    <section>
      {user ? (
        <>
          <div class="card w-96 bg-base-300 shadow-xl">
            <div class="card-body">
              <h1 class="card-title">User detail : {user.nama}</h1>

              <p>Alamat : {user.alamat}</p>
              <p>No Hp : {user.no_hp}</p>
              <p>{user.email} </p>
              <p>
                <span>create at </span>
                <span>
                  {user.createdAt.toLocaleDateString("id-ID", {
                    dateStyle: "full",
                  })}
                </span>
              </p>
              <div class="card-actions ">
                <Link href={`/users/edit/${user.id}`} class="btn btn-info">
                  Edit
                </Link>

                <Form action={deleteUser}>
                  <input type="hidden" value={user.id} name={"id"} />
                  {/* <Link href={`/users/`} class="btn btn-error">
                  Delete
                </Link> */}
                  <button class="btn btn-error" type="submit">
                    Delete
                  </button>
                </Form>
                <Link href={`/users/`} class="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </section>
  );
});
