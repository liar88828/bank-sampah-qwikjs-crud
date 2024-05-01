// /* eslint-disable prefer-const */
// import { type Session } from "@auth/core/types"
// import { component$, Resource } from "@builder.io/qwik"
// import {
//   Form,
//   Link,
//   routeAction$,
//   routeLoader$,
//   z,
//   zod$,
// } from "@builder.io/qwik-city"
// import { Heads } from "~/components/page/work/Heads"
// import { OptionTableFoot } from "~/components/table/OptionTableFoot"
// import { OptionTableHead } from "~/components/table/OptionTableHead"
// import { controller } from "~/controller/controller"
// import { profile } from "~/db/cart/profile"
// import { work } from "~/db/work/work"
// import { getDate } from "~/lib/date"

// export const useLoadUserMaterial = routeLoader$(
//   async ({ sharedMap, query }) => {
//     const session: Session = sharedMap.get("session") as Session

//     return work.findMaterialKeluar(
//       controller.pagination<number>(
//         Number(session?.user?.id),
//         query.get("page"),
//         query.get("search"),
//       ),
//     )
//   },
// )

// export const useDeleteUserMaterial = routeAction$(
//   async (data) => {
//     const res = await profile.deleteOne(Number(data.id))
//     return res
//   },
//   zod$({ id: z.string() }),
// )

// export default component$(() => {
//   return (
//     <section class="container space-y-3">
//       <Heads title="Keluar-Sampah" />
//       <Tables />
//     </section>
//   )
// })

// export const Tables = component$(() => {
//   const dataLoad = useLoadUserMaterial()
//   const dataDelete = useDeleteUserMaterial()

//   return (
//     <Resource
//       value={dataLoad}
//       onResolved={(data) => {
//         return (
//           <div class="card static bg-base-100 ">
//             <div class="card-body">
//               <div class=" flex items-center gap-2">
//                 <h1>Material's directory</h1>
//                 <Link class="btn btn-info btn-xs" href="/table/material/create">
//                   Create
//                 </Link>
//               </div>

//               <div class="overflow-x-auto">
//                 <table class="table table-zebra table-xs static  rounded bg-base-100">
//                   <OptionTableHead
//                     data={[
//                       "No",
//                       "Kode",
//                       "Nama",
//                       "Jenis",
//                       "Berat",
//                       "Create",
//                       "Action",
//                     ]}
//                   />
//                   <tbody>
//                     {data.map((d, i) => (
//                       <tr key={d.id}>
//                         <th>{i + 1}</th>
//                         <td>{d.id}</td>
//                         <td>{d.nama}</td>
//                         <td>{d.kategori}</td>
//                         <td>{d.berat}</td>
//                         <td>{getDate(d.createdAt)}</td>
//                         <td class="flex flex-nowrap gap-2">
//                           <Link
//                             href={`/table/material/detail/${d.id}`}
//                             class="btn btn-primary btn-xs"
//                           >
//                             Detail
//                           </Link>

//                           <Form action={dataDelete}>
//                             <input type="hidden" name="id" value={d.id} />
//                             <button type="submit" class="btn btn-error btn-xs">
//                               Delete
//                             </button>
//                           </Form>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   <OptionTableFoot
//                     data={data.map((list) => list.nama)}
//                     href={"/table/material/"}
//                   />
//                 </table>
//               </div>
//             </div>
//           </div>
//         )
//       }}
//     />
//   )
// })
