import { Session } from "@auth/core/types";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { transaksi } from "~/db/transaksi";
import { works } from "~/db/work/work";

export const useGetTransaksi = routeLoader$(
  async ({ resolveValue, sharedMap }) => {
    const session = sharedMap.get("session") as Session;
    const transaksi = await works
      .transaksi()
      .findUserId_Material_Status_Opsi(Number(session?.user?.id));
    // const transaksi = await works.transaksi.(Number(session?.user?.id));
    const totalTransaksiSampah = transaksi.map((d) => d.opsi_Penukaran);
    const totalMaterial = transaksi.flatMap((d) => d?.Material);
    return {
      transaksi,
      totalTransaksiSampah,
      totalMaterial,
    };
  },
);

export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
  const { totalMaterial, totalTransaksiSampah } =
    await resolveValue(useGetTransaksi);
  return { totalMaterial, totalTransaksiSampah };
});

export const useLoadPenyerahan = routeLoader$(async () => {
  return works.users().findId(1);
});

export const useGetPenukaran = routeLoader$(
  async ({ resolveValue, sharedMap }) => {
    const session = sharedMap.get("session") as Session;
    return works.riwayatPertukaran().riwayatPenukaran(Number(session.user.id));
  },
);

export const useDeletePenyerahan = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);

// export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
//   const { totalTransaksiSampah } = await resolveValue(useGetTransaksi);
//   return totalTransaksiSampah;
// });
