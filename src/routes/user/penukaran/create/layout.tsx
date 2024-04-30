import { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";

import { trolly } from "~/db/join/cart/trolly";

export const useLoadCartPenukaran = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const id = Number(session?.user?.id);

    let page = Number(query.get("page") ?? 0);
    page = page <= 0 ? 0 : page;

    const search: string | null = query.get("search") ?? "";

    return trolly.findCartTable(id, page, search);
  },
);

export const useDeleteCart = routeAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const res = await trolly.deleteCart(
      Number(session.user.id),
      Number(data.id_cartList),
    );
    return res;
  },
  zod$({ id_cartList: z.number() }),
);

export const useAddCart = routeAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    return trolly.addCart(Number(session.user.id), data.id_cart);
  },
  zod$({ id_cart: z.number() }),
);

export const useFindCart = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session") as Session;
  return trolly.findCartList(Number(session.user.id));
});

export const useCheckOutPenukaran = routeAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    return trolly.checkOutPenukaran(Number(session.user.id), {
      id_trolly: data.id_trolly,
      berat: data.berat,
      harga: data.harga,
      deskripsi: data.deskripsi,
    });
  },
  zod$({
    id_trolly: z.number(),
    berat: z.number(),
    harga: z.number(),
    deskripsi: z.string(),
  }),
);
