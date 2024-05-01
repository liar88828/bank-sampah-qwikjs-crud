// import ImgBlankProfile from "~/media/images/blank-profile.webp?jsx";
// import { Resource, component$ } from "@builder.io/qwik";
// import { Link, routeLoader$ } from "@builder.io/qwik-city";
// import { users } from "~/db/table/users";
// import { getDate } from "~/lib/date";
// import { profile } from "~/db/cart/profile";
// import {
//   LuArrowLeftRight,
//   LuBadgeDollarSign,
//   LuBox,
// } from "@qwikest/icons/lucide";
// import { Breadcrumbs } from "~/components/basic/Breadcrumbs";
// import { getBreadcrumbTrail } from "~/assets/getBreadcrumbTrail";
// import { type Session } from "@auth/core/types";
// import { type PropsProfile } from "~/type/user";

// export const useDataUser = routeLoader$(async ({ resolveValue }) => {
//   const user = await resolveValue(useProfileUser);
//   const point = await resolveValue(usePointUser);
//   return { user, point };
// });

// export const useProfileUser = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session;
//   const id = Number(session.user.id);
//   const res = await users.findId(id);

//   return res as PropsProfile["user"] & { createdAt: Date };
// });

// export const usePointUser = routeLoader$(async ({ sharedMap }) => {
//   const session = sharedMap.get("session") as Session;
//   const id = Number(session.user.id);

//   const data = await Promise.all([
//     profile.totalPoint(id),
//     profile.totalTrolly(id),
//   ]);

//   return { ...data[0], totalTrolly: data[1] } as PropsProfile["point"];
// });

// export default component$(() => {
//   const loadData = useDataUser();
//   return (
//     <section class="container ">
//       <Breadcrumbs data={getBreadcrumbTrail("Profile")} />

//       <Resource
//         value={loadData}
//         onPending={() => <span class="loading loading-spinner"></span>}
//         onRejected={() => <span>Error</span>}
//         onResolved={({ point, user: data }) => {
//           return (
//             <div class="card card-compact bg-base-100">
//               <div class="card-body grid grid-cols-1 rounded-2xl sm:grid-cols-3">
//                 <div class="col-span-1 ">
//                   <div class="card-body">
//                     <div class="avatar mb-5 flex justify-center">
//                       <div class="w-40 rounded-full ring ring-info ring-offset-2 ring-offset-base-100">
//                         <ImgBlankProfile
//                         // eslint-disable-next-line qwik/jsx-img
//                         />
//                       </div>
//                     </div>
//                     <div class="space-y-3 ">
//                       <h1 class="text-2xl font-bold">
//                         {data.nama} {data.nama_belakang}
//                       </h1>
//                       <div class=" justify- flex flex-wrap gap-3">
//                         <div class="">
//                           <h3 class="text-left">Sebagai : </h3>
//                           <h2 class="text-left text-xl font-semibold">
//                             Petugas
//                           </h2>
//                         </div>
//                         <div class="">
//                           <h3 class="text-left">Join : </h3>
//                           <h2 class="text-left text-xl font-semibold">
//                             {getDate(data.createdAt)}
//                           </h2>
//                         </div>

//                         <div class="card-actions justify-center">
//                           <Link
//                             href="/table/users/update"
//                             class="btn btn-primary sm:btn-sm md:btn-md"
//                           >
//                             Update
//                           </Link>
//                           <Link
//                             href="print"
//                             class="btn btn-primary sm:btn-sm md:btn-md"
//                           >
//                             Print
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="col-span-2 divide-y-2 divide-info ">
//                   <div class="card-body">
//                     <h1 class="card-title">Official Information</h1>

//                     <div class="flex justify-between">
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Email</h1>
//                         <p>{data.email}</p>
//                       </div>
//                       {/*  */}
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Phone</h1>
//                         <p>{data.no_hp}</p>
//                       </div>
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Address</h1>
//                         <p>{data.alamat}</p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* -- */}
//                   <div class="card-body">
//                     <h1 class="card-title">Personal Information</h1>

//                     <div class="flex justify-between">
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Gender</h1>
//                         <p>{data.kelamin}</p>
//                       </div>
//                       {/*  */}
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Tanggal Lahir</h1>
//                         <p>{data.tempat_lahir}</p>
//                       </div>
//                       {/*  */}
//                       <div class="">
//                         <h1 class="text-lg font-semibold">Tempat Lahir</h1>
//                         <p>{getDate(data.tanggal_lahir)}</p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* -------- */}
//                   <div class="card-body">
//                     <h1 class="card-title">Total Information</h1>

//                     <div class="flex justify-between">
//                       <div class="">
//                         <dd class="mt-1  flex w-full flex-wrap gap-2  sm:col-span-2 sm:mt-0">
//                           <Link
//                             href="/user/transaksi?page=0"
//                             class="btn btn-info btn-sm"
//                           >
//                             Transaksi
//                             <LuArrowLeftRight />
//                             {point.totalTransaksi}
//                           </Link>

//                           <Link
//                             href="/table/penyerahan?page=0"
//                             class="btn btn-info btn-sm"
//                           >
//                             Penyerahan
//                             <LuBadgeDollarSign />
//                             {point.totalPenyerahan}
//                           </Link>

//                           <Link
//                             href="/table/penukaran?page=0"
//                             class="btn btn-info btn-sm"
//                           >
//                             Penukaran
//                             <LuBadgeDollarSign />
//                             {point.totalPenukaran}
//                           </Link>

//                           <Link
//                             href="/table/material?page=0"
//                             class="btn btn-info btn-sm"
//                           >
//                             Material
//                             <LuBox />
//                             {point.totalMaterial || 0}
//                           </Link>

//                           <Link
//                             href="/user/trolly?page=0"
//                             class="btn btn-info btn-sm"
//                           >
//                             Trolly
//                             <LuBox />
//                             {point.totalTrolly || 0}
//                           </Link>
//                         </dd>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         }}
//       />
//     </section>
//   );
// });
