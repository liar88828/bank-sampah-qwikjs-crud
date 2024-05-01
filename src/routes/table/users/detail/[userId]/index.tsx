import { component$ } from "@builder.io/qwik";
import { Form, Link, routeLoader$ } from "@builder.io/qwik-city"
import { useDeleteUsers } from "~/action/user.action"
import { db } from "~/db/db"

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const id = params["userId"]
  const res = db.users.findId(id)
  if (!res) {
    status(404)
  }
  return res
})

export default component$(() => {
  const { value: user } = useGetUser()
  const deleteUser = useDeleteUsers()
  return (
    <section>
      {user ? (
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
              <Link href={`/table/users/edit/${user.id}`} class="btn btn-info">
                Edit
              </Link>

              <Form action={deleteUser}>
                <input type="hidden" value={user.id} name={"id"} />

                <button class="btn btn-error" type="submit">
                  Delete
                </button>
              </Form>
              <Link href={`/table/users/`} class="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </section>
  )
})
