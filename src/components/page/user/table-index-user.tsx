import { component$ } from "@builder.io/qwik"
import { Form, Link } from "@builder.io/qwik-city"
import { OptionTableFoot } from "~/components/table/OptionTableFoot"
import { useDeleteUserOnly } from "~/action/user.action"
import { CardLayout } from "~/components/basic/body/card/card-layout"
import { type User } from "@prisma/client"

export const TableIndexUser = component$(({ data }: { data: User[] }) => {
  const userDelete = useDeleteUserOnly()

  return (
    <CardLayout href="create" title="Users's directory">
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
            {data.map((d, i) => (
              <tr key={d.id}>
                <th>{i + 1}</th>
                <td>{d.nama}</td>
                <td>{d.alamat}</td>
                <td>{d.no_hp}</td>
                <td>{d.email}</td>
                <td>
                  {d.createdAt.toLocaleDateString("id-ID", {
                    dateStyle: "full",
                  })}
                </td>
                <td class="flex flex-nowrap gap-2">
                  <Link
                    href={`/table/users/detail/${d.id}`}
                    class="btn btn-primary btn-xs"
                  >
                    Detail
                  </Link>

                  <Form action={userDelete}>
                    <input type="hidden" name="id" value={d.id} />
                    <button type="submit" class="btn btn-error btn-xs">
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
          <OptionTableFoot
            data={data.map((list) => list.alamat)}
            href={"/table/user/"}
          />
        </table>
      </div>
    </CardLayout>
  )
})
