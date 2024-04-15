import { Session } from "@auth/core/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { user } from "~/db/users";
import { works } from "~/db/work";
import { PropsProfile } from "~/type/user";

export const useLoaderData = routeLoader$(
  async ({ resolveValue, sharedMap, redirect }) => {
    const session: Session | null = sharedMap.get("session") as Session;

    if (!session || new Date(session.expires) < new Date()) {
      throw redirect(302, `/`);
    } else {
      sharedMap.set("user", session.user);
    }

    const user = await resolveValue(useProfileUser);
    const point = await resolveValue(usePointUser);
    return { user, point };
  },
);

export const useProfileUser = routeLoader$(async ({ status, sharedMap }) => {
  const id_user = sharedMap.get("user");
  const res = await user.findId(Number(id_user.id));
  if (!res) {
    status(404);
  }
  return res as PropsProfile["user"];
});

export const usePointUser = routeLoader$(async ({ status, sharedMap }) => {
  const id_user = sharedMap.get("user");
  const res = await works.totalPoint(Number(id_user.id));
  if (!res) {
    status(404);
  }
  return res as PropsProfile["point"];
});
