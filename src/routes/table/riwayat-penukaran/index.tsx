// import { component$, Resource } from "@builder.io/qwik";
// import {
//   Form,
//   Link,
//   routeAction$,
//   routeLoader$,
//   z,
//   zod$,
// } from "@builder.io/qwik-city";
// import { riwayatPenukaran } from "~/db/table/riwayatPenukaran";
// import { getDate } from "~/lib/date";

// export const useGetAll = routeLoader$(async () => {
//   const res = await riwayatPenukaran.findAll();
//   console.log(res);
//   return res;
// });

// export const useDeleteOnly = routeAction$(
//   async (data) => {
//     return riwayatPenukaran.deleteOne(Number(data.id));
//   },
//   zod$({ id: z.string() }),
// );

// export default component$(() => {
//   const Datas = useGetAll();
//   const deleteData = useDeleteOnly();

//   return (
//     <section class="container rounded bg-base-100 p-5">
//       <div class="mb-2 flex items-center gap-2">
//         <h1>Riwayat Penukaran's directory</h1>
//         <Link
//           class="btn btn-info btn-xs"
//           href="/table/riwayat-penukaran/create"
//         >
//           Create
//         </Link>
//       </div>

//       <Resource
//         value={Datas}
//         onPending={() => <span class="loading loading-spinner"></span>}
//         onRejected={() => <span>Error</span>}
//         onResolved={(data) => (
//           <div class="overflow-x-auto">
//             <table class="table table-zebra table-xs static  rounded  border">
//               <thead>
//                 <tr>
//                   <th>No</th>
//                   <th>Tanggal Tukar</th>
//                   <th>User</th>
//                   <th>Opsi Penukaran</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((d, i) => (
//                   <tr key={d.id}>
//                     <th>{i + 1}</th>
//                     <td>{getDate(d.tgl_transaksi)}</td>
//                     <td>
//                       {d.userBuy?.id} {d.userBuy?.nama}
//                     </td>
//                     <td>
//                       {d.opsi_Penukaran?.id} {d.opsi_Penukaran?.deskripsi}
//                     </td>
//                     <td class="flex flex-nowrap gap-2">
//                       <Link
//                         href={`/table/riwayat-penukaran/detail/${d.id}`}
//                         class="btn btn-primary btn-xs"
//                       >
//                         Detail
//                       </Link>

//                       <Form action={deleteData}>
//                         <input type="hidden" name="id" value={d.id} />
//                         <button type="submit" class="btn btn-error btn-xs">
//                           Delete
//                         </button>
//                       </Form>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       />
//     </section>
//   )
// });
