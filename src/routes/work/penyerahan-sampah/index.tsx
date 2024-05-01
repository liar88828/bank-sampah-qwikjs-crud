// import { component$, Resource } from "@builder.io/qwik"
// import { routeLoader$ } from "@builder.io/qwik-city"
// import { Profile } from "~/components/penyerahan-sampah/Profile"
// import { Riwayat } from "~/components/penyerahan-sampah/table/Riwayat"

// import { users } from "~/db/table/users"
// import { type User } from "@prisma/client"
// import { type Session } from "@auth/core/types"
// export const useLoadPenyerahan = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session
//   return users.findId(session.user.id)
// })

// export default component$(() => {
//   const dataLoad = useLoadPenyerahan()
//   // useGetTransaksiSampah
//   return (
//     <section class=" container ">
//       <Resource
//         value={dataLoad}
//         onResolved={(data) => (
//           <div class="grid-rows-1 sm:grid  sm:space-y-5 ">
//             <div class="row-span-1">
//               <div class="grid gap-5 sm:grid-cols-3">
//                 <div class="sm:col-span-1   ">
//                   <Profile data={data as User} />
//                 </div>

//                 <div class="sm:col-span-2   ">
//                   {/* <RiwayatTransaksi data={data as ProfileProps} /> */}
//                 </div>
//               </div>
//             </div>

//             <div class="row-span-1 mt-5 sm:mt-0">
//               <Riwayat />
//             </div>
//           </div>
//         )}
//       />
//     </section>
//   )
// })
