import { Session } from "@auth/core/types";
import { routeLoader$ } from "@builder.io/qwik-city";
import { users } from "~/db/users";
import { works } from "~/db/work/work";
import { PropsProfile } from "~/type/user";

export const useLoaderData = routeLoader$(
  async ({ resolveValue, sharedMap, redirect }) => {
    const user = await resolveValue(useProfileUser);
    const point = await resolveValue(usePointUser);
    return { user, point };
  },
);

export const useProfileUser = routeLoader$(
  async ({ status, sharedMap, redirect }) => {
    const session = sharedMap.get("session") as Session;
    const id = Number(session.user.id);
    const res = await users.findId(id);
    if (!res) {
      // status(404);
      redirect(301, "/");
    }

    return res as PropsProfile["user"];
  },
);

export const usePointUser = routeLoader$(async ({ status, sharedMap }) => {
  const session = sharedMap.get("session") as Session;
  const id = Number(session.user.id);

  const res = await works.transaksi().totalPoint(id);
  if (!res) {
    status(404);
  }
  return res as PropsProfile["point"];
});
