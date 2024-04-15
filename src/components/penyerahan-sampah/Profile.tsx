import { component$ } from "@builder.io/qwik";
import { ProfileProps } from "../../type/penyerahan-sampah.type";
import { Link } from "@builder.io/qwik-city";

export const Profile = component$(({ data }: { data: ProfileProps }) => {
  return (
    <div class="rounded-lg bg-base-100 p-5 shadow">
      <div class="flex flex-col items-center">
        <img
          height={20}
          width={30}
          src="https://randomuser.me/api/portraits/men/94.jpg"
          class="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-300"
        ></img>
        <h1 class="text-xl font-bold">{data?.nama}</h1>
      </div>

      <div class="divider divider-success">Contact</div>
      <div class="flex flex-col">
        <ul>
          <li class="mb-2">{data?.alamat}</li>
          <li class="mb-2">{data?.email}</li>
          <li class="mb-2">{data?.no_hp}</li>
          <li>
            <Link href="create" class="btn btn-primary">
              Create
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});
