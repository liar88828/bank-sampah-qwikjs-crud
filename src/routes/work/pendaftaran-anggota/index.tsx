/*
pendaftaran
nama
alamat
nomor hp

 */

import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";
import { FormUserCreate } from "~/components/form/user-create";
import { user } from "~/db/users";
import { zodUser } from "~/lib/Zod";

export const useCreateUser = routeAction$(async (data, { redirect }) => {
  const res = await user.createOne(data);
  if (res) {
    throw redirect(302, "/table/users");
  }
  return res;
}, zodUser);
export default component$(() => {
  const createUserAction = useCreateUser();
  // console.log(createUserAction.value);
  return <FormUserCreate createUserAction={createUserAction} />;
});
