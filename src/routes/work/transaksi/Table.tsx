import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const Table = component$(() => {
  return (
    <div class="overflow-x-auto">
      <table class="table table-zebra static">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
            <td>
              <Link href="process/1" class="btn btn-info btn-xs">
                Detail
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
})
