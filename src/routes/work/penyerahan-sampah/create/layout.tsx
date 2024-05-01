// import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
// import { zodPenyerahanSampah } from "~/lib/zod/Zod";
// import { users } from "~/db/table/users";
// import { penyerahanController } from "~/controller/penyerahanSampah";
// import { type Session } from "@auth/core/types";
// import { type SessionExample } from "~/type/global/global.type";

// export const useLoadData = routeLoader$(
//   async ({ query, cookie, sharedMap }) => {
//     const session = sharedMap.get("session") as Session;

//     if (!session) {
//       cookie.set("id_user", session as SessionExample);
//     }

//     return {
//       user: await users.findAll(),
//       queryData: {
//         // id_user: query.get("id_user"),
//         // id_material: query.get("id_material"),
//         status: query.get("status"),
//         nama_sampah: query.get("sampah.0.nama"),
//         jenis_sampah: query.get("sampah.0.jenis"),
//         berat_sampah: query.get("sampah.0.berat"),
//       },
//     };
//   },
// );

// export const useCreatePenyerahan = routeAction$(
//   async (data, { redirect, fail, cookie }) => {
//     const session = cookie.get("id_user")?.json() as SessionExample;
//     console.log(session);
//     if (!session) {
//       return fail(401, {
//         message: "Please login first",
//       });
//     }
//     // let totalBerat = data.sampah.reduce((a, b) => Nu(a.berat) + b.berat, 0);
//     data.sampah;
//     const res = await penyerahanController.penyerahanSampah(
//       session.id,
//       data.sampah,
//     );

//     // const res = await work.penyerahanSampah({
//     //   ...data,
//     //   id_user: session.id, // "1"
//     //   status: "Menunggu Konfirmasi",
//     //   sampah: data.sampah.map((s) => ({
//     //     berat: Number(s.berat),
//     //     jenis: s.jenis,
//     //     nama: s.nama,
//     //     deskripsi: s.deskripsi,
//     //     harga: Number(s.harga),
//     //     id_user: session.id,

//     //   })),
//     // });
//     // console.log(res);

//     // if (!res.success) {
//     //   return fail(500, {
//     //     message: "User could not be added",
//     //   });
//     // }

//     if (res) {
//       throw redirect(302, "/work/penyerahan-sampah");
//     }
//     return { form: data };
//   },
//   zodPenyerahanSampah,
// );

// export const defaultValue = {
//   id: 0,
//   berat: 0,
//   jenis: "",
//   nama: "",
//   status: "",
// };
