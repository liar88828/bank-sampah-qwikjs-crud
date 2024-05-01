import { type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ redirect }) => {
  throw redirect(302, "/table/transaksi");
};

// import { Session } from "@auth/core/types";
// import { component$, Resource, useSignal } from "@builder.io/qwik";
// import {
//   Link,
//   routeAction$,
//   routeLoader$,
//   useLocation,
//   z,
//   zod$,
// } from "@builder.io/qwik-city";
// import { LuSearch } from "@qwikest/icons/lucide";
// import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
// import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
// import { profile } from "~/db/cart/profile";
// import { getDate } from "~/lib/date";

// export const useLoadUserTransaksi = routeLoader$(
//   async ({ sharedMap, query }) => {
//     const session: Session | null = sharedMap.get("session") as Session;
//     const id = Number(session?.user?.id);

//     let page = Number(query.get("page") ?? 0);
//     page = page <= 0 ? 0 : page;

//     const search: string | null = query.get("search") ?? "";

//     const res = await profile.findAllUser(id, page, search);
//     return { data: res, user: session.user }; // as LoaderTransaksi[];
//   },
// );

// export const useDeleteTransaksi = routeAction$(
//   async (data) => {
//     return await profile.deleteOne(Number(data.id));
//   },
//   zod$({ id: z.string() }),
// );

// export default component$(() => {
//   return (
//     <section class="container space-y-2">
//       <Heads />
//       <Tables />
//     </section>
//   );
// });

// export const Tables = component$(() => {
//   const loadData = useLoadUserTransaksi();
//   const search = useSignal("");
//   const local = useLocation();
//   const page = local.url.searchParams.get("page");
//   // const transaksiDelete = useDeleteTransaksi();

//   return (
//     <Resource
//       value={loadData}
//       onPending={() => <span class="loading loading-spinner"></span>}
//       onRejected={() => <span>Error</span>}
//       onResolved={({ data, user }) => {
//         // console.log(data[0].Material);
//         let buttonOff = data.length === 0;
//         let buttonLess = data.length > 0;
//         // console.log(data);
//         return (
//           <div class="card static bg-base-100 ">
//             <div class="card-body">
//               <div class="mb-2 flex items-center gap-2">
//                 <h1>Transaksi's directory</h1>

//                 <Link
//                   class="btn btn-info btn-xs"
//                   href="/table/transaksi/create"
//                 >
//                   Create
//                 </Link>
//               </div>
//               <div class="overflow-x-auto ">
//                 <table class="table table-zebra table-xs static  rounded  bg-base-100">
//                   <thead>
//                     <tr>
//                       <th>No</th>
//                       <th>Kode</th>
//                       <th>Tanggal</th>
//                       <th>Type</th>
//                       <th>Nama</th>
//                       <th>Berat</th>
//                       <th>Harga</th>
//                       <th>Total Sampah</th>
//                       <th>Deskripsi</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((t, i) => {
//                       const opsi = t.opsi_Penukaran
//                         ? { ...t.opsi_Penukaran, types: "penukaran" }
//                         : { ...t.opsi_Penyerahan, types: "penyerahan" };

//                       return (
//                         <tr key={t.id}>
//                           <th>{i + 1}</th>
//                           <td>{t.id}</td>
//                           <td>{getDate(t.tgl_transaksi)}</td>
//                           <td>{opsi.types}</td>
//                           <td>{t.userBuy?.nama}</td>
//                           <td>{opsi?.berat ?? "kosong"}</td>
//                           <td>{opsi?.harga ?? "kosong"}</td>
//                           <td>{opsi?._count?.Cases ?? "kosong"}</td>
//                           <td>{opsi?.deskripsi ?? "kosong"}</td>

//                           <td class="flex flex-nowrap gap-2">
//                             <Link href={`/user/${opsi.types}/detail/${opsi.id}`} class="btn btn-info btn-xs">
//                               Info
//                             </Link>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                   <tfoot>
//                     <tr>
//                       <th colSpan={2}>
//                         <div class="join">
//                           <Link
//                             // aria-disabled={buttonOff}
//                             href={`/user/transaksi/?page=${Number(page) - 1}`}
//                             class={`btn join-item btn-sm ${buttonLess && "btn-disabled"}`}
//                           >
//                             «
//                           </Link>
//                           <button class="btn join-item btn-sm">
//                             Page {page}
//                           </button>
//                           <Link
//                             aria-disabled={buttonOff}
//                             href={`/user/transaksi/?page=${Number(page) + 1}`}
//                             class={`btn join-item btn-sm ${buttonOff && "btn-disabled"}`}
//                           >
//                             »
//                           </Link>
//                         </div>
//                       </th>
//                       <th colSpan={2} class="">
//                         <input
//                           type="text"
//                           class="input input-sm input-bordered"
//                           placeholder="Cari Nama : Alex...."
//                           bind:value={search}
//                         />
//                         <Link
//                           type="button"
//                           class="btn btn-square btn-primary btn-sm"
//                           href={`/user/transaksi/?page=${Number(page)}&search=${search.value} `}
//                         >
//                           <LuSearch />
//                         </Link>
//                       </th>
//                     </tr>
//                   </tfoot>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );
//       }}
//     />
//   );
// });

// export const Heads = component$(() => {
//   return <Breadcrumbs data={getBreadcrumbTrail("Transaksi")} />;
// });

// // export type Case = {
// //   type: string;
// //   _count?:
// //     | {
// //         Cases: number;
// //         Transaksi: number;
// //       }
// //     | undefined;
// //   id?: number | undefined;
// //   harga?: number | null | undefined;
// //   berat?: number | undefined;
// //   deskripsi?: string | undefined;
// //   id_transaksi?: number | undefined;
// //   createdAt?: Date | undefined;
// //   updatedAt?: Date | undefined;
// // };
