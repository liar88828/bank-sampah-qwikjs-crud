import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { transaksi } from "~/db/transaksi";
import { user } from "~/db/users";
import { works } from "~/db/work";

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});

export const useGetSession = routeLoader$(async () => {
  return user.findFirst();
});

export const useGetTransaksi = routeLoader$(async ({ resolveValue }) => {
  const user = await resolveValue(useGetSession);
  const transaksi = await works.transaksi(user?.id as number);
  const totalTransaksiSampah = transaksi.map((d) => d.Sampah_Transaksi);
  const totalMaterial = totalTransaksiSampah.flatMap((d) => d?.Material);
  // console.log(totalTransaksiSampah)
  return {
    transaksi,
    totalTransaksiSampah,
    totalMaterial,
  };
});

// export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
//   const { totalTransaksiSampah } = await resolveValue(useGetTransaksi);
//   return totalTransaksiSampah;
// });

export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
  const { totalMaterial, totalTransaksiSampah } =
    await resolveValue(useGetTransaksi);
  return { totalMaterial, totalTransaksiSampah };
});

export const useLoadPenyerahan = routeLoader$(async () => {
  return works.findAll(1);
});

export const useGetPenukaran = routeLoader$(async ({ resolveValue }) => {
  const user = await resolveValue(useGetSession);
  return works.riwayatPenukaran(user?.id as number);
});

export const useDeletePenyerahan = routeAction$(
  async (data) => {
    return await transaksi.deleteOne(Number(data.id));
  },
  zod$({ id: z.string() }),
);
