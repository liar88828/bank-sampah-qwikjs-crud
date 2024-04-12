import { Session } from "@auth/core/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { user } from "~/db/users";
import { Slot, component$ } from '@builder.io/qwik';

export const useGetUser = routeLoader$(
  async ({ status, sharedMap, redirect }) => {
    const session: Session | null = sharedMap.get("session");

    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, `/`);
    }

    const id = Number(session?.user.id);

    const res = await user.findId(id);
    if (!res) {
      status(404);
    }
    return res;
  },
);



export default component$(() => {
  return <Slot />
});