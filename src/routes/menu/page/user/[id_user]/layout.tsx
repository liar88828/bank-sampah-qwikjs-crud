import { routeLoader$ } from "@builder.io/qwik-city";
import { material } from "~/db/material";
import { users } from "~/db/users";
import { UserProfile } from "~/type/user";

export const useSelectMaterialUser = routeLoader$(async ({ params }) => {
  const id = params.id_user;
  return material.findMaterialUser(Number(id));
});

export const useSearchMaterialUser = routeLoader$(
  async ({ sharedMap, params }) => {
    const search = sharedMap.get("search") || "";
    const jenis = sharedMap.get("jenis") || "";
    const page = sharedMap.get("page") || 0;

    const id = params.id_user;

    return material.findSearchPageUser(Number(id), jenis, search, Number(page));
  },
);

export const useLoadUserId = routeLoader$(async ({ params, resolveValue }) => {
  const id = params.id_user;

  return (await users.findId(Number(id))) as UserProfile;
});

export const useLoadMaterialUser = routeLoader$(async ({ resolveValue }) => {
  return {
    material: await resolveValue(useSearchMaterialUser),
    select: await resolveValue(useSelectMaterialUser),
  };
});
