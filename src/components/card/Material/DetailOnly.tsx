import { Session } from "@auth/core/types";
import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { getDate } from "~/lib/date";
import { useAuthSession } from "~/routes/plugin@auth";
import { DataMaterial } from "~/type/material.type";

export const DetailOnly = component$(({ data }: { data: DataMaterial }) => {
  const location = useLocation();
  const url = location.url;
  const pathName = url.pathname;

  const { value } = useAuthSession();
  if (!value) {
  }
  const user = value?.user as Session["user"];

  console.log(user.id, data.id_user);

  return (
    <div class="card static w-full bg-base-100">
      <div class="card-body space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative mr-2 h-12 w-12 overflow-hidden rounded-full">
              <img
                class="rounded-full object-cover"
                height="64"
                src="https://picsum.photos/200/200"
                width="64"
                alt='avatar "Jane Doe"'
              />
            </div>

            <div class="space-y-1.5">
              <h1 class="text-2xl font-bold">{data?.nama}</h1>
              <p class="text-gray-500 dark:text-gray-400"># id : {data?.id}</p>
            </div>
          </div>
          <div class="flex items-center ">
            {Number(user.id) === data.id_user && <Slot />}
          </div>
        </div>
        <div class="space-y-2 text-sm leading-loose md:text-base">
          <p>
            Product designer passionate about creating beautiful and
            user-friendly interfaces. Currently working at Acme Corporation.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div class="space-y-2">
            <h2 class="text-lg font-semibold">Kategori</h2>
            <p>{data?.kategori}</p>
          </div>

          <div class="space-y-2">
            <div class="flex items-start gap-2">
              <h2 class="text-lg font-semibold">Berat </h2>
            </div>

            <p>{data?.berat} Kg</p>
          </div>
          <div class="space-y-2 ">
            <h2 class="text-lg font-semibold">Owner</h2>
            <Link
              href={`/menu/page/user/${data.id_user}?callback=${pathName}`}
              class="link"
            >
              <p>{data?.User?.nama}</p>
            </Link>
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-semibold">Create at</h2>
            <p>{getDate(data.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
