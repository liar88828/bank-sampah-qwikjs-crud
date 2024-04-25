import { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { cartPenukaran } from "~/db/join/cart/penukaran";

export const useLoadCartPenukaran = routeLoader$(
  async ({ sharedMap, query }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const id = Number(session?.user?.id);

    let page = Number(query.get("page") ?? 0);
    page = page <= 0 ? 0 : page;

    const search: string | null = query.get("search") ?? "";

    return cartPenukaran.findCartTable(id, page, search);
  },
);

export const useDeleteCart = routeAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    const res = await cartPenukaran.deleteCart(
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
    return cartPenukaran.addCart(Number(session.user.id), data.id_cart);
  },
  zod$({ id_cart: z.number() }),
);

export const useFindCart = routeLoader$(async ({ sharedMap }) => {
  const session: Session | null = sharedMap.get("session") as Session;
  return cartPenukaran.findCartList(Number(session.user.id));
});

export const useCheckOutPenukaran = routeAction$(
  async (data, { sharedMap }) => {
    const session: Session | null = sharedMap.get("session") as Session;
    return cartPenukaran.checkOutPenukaran(Number(session.user.id), {
      id_trolly: data.id_trolly,
      berat: data.berat,
      deskripsi: data.deskripsi,
    });
  },
  zod$({
    id_trolly: z.number(),
    berat: z.number(),
    deskripsi: z.string(),
  }),
);
