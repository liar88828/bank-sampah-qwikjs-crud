// import { routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city"
// import { riwayatPenukaran } from "~/db/table/riwayatPenukaran"
// import { work } from "~/db/work/work"
// import { type Session } from "@auth/core/types"
// import { db } from "~/db/db"

// export const useGetTransaksi = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session
//   const transaksi = await work.findUser_Material({
//     id: session?.user?.id,
//     page: 0,
//     search: "",
//   })
//   // const transaksi = await works.transaksi.(Number(session?.user?.id));
//   const totalTransaksiSampah = transaksi.map((d) => d.Opsi)
//   const totalMaterial = totalTransaksiSampah.map((a) =>
//     a?.Cases.map((b) => b.Material),
//   )
//   return {
//     transaksi,
//     totalTransaksiSampah,
//     totalMaterial,
//   }
// })

// export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
//   return resolveValue(useGetTransaksi)
// })

// export const useGetPenukaran = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session
//   return riwayatPenukaran.riwayatPenukaran(Number(session.user.id))
// })

// export const useDeletePenyerahan = routeAction$(
//   async (data) => {
//     return db.transaksi.deleteOne(Number(data.id))
//   },
//   zod$({ id: z.string() }),
// )

// // export const useGetTransaksiSampah = routeLoader$(async ({ resolveValue }) => {
// //   const { totalTransaksiSampah } = await resolveValue(useGetTransaksi);
// //   return totalTransaksiSampah;
// // });
