// // import { component$ } from "@builder.io/qwik"
// // import { useLoadPenyerahan } from "../../../routes/tutorial/sampah-menyerahkan/layout"
// // import { TableIndexPenyerahan } from "./table-index-penyerahan"

// import { component$ } from "@builder.io/qwik"
// import { Link } from "@builder.io/qwik-city"
// import { CardHead } from "~/components/basic/body/card/card-head"
// import { CardBody } from "~/components/basic/body/card/card-body"
// import { OptionTableFoot } from "~/components/table/OptionTableFoot"
// import { OptionTableHead } from "~/components/table/OptionTableHead"
// import { getDate } from "~/lib/utils/date"

// export const TablePenyerahanIndex = component$(
//   ({ data }: { data: PenyerahanTransaksi[] }) => {
//     return (
//       <CardBody>
//         <CardHead href="create" title="Penyerahan's directory" />
//         <div class="overflow-x-auto ">
//           <table class="table table-zebra table-xs static  rounded  bg-base-100">
//             <OptionTableHead
//               data={[
//                 "No",
//                 "Kode",
//                 "Tanggal",
//                 "Berat",
//                 "Harga",
//                 "Deskripsi",
//                 "Action",
//               ]}
//             />

//             <tbody>
//               {data.map((d, i) => (
//                 <tr key={d.id}>
//                   <th>{i + 1}</th>
//                   <th>{d.id}</th>
//                   <td>{getDate(d.createdAt)}</td>
//                   <td>{d.berat ?? "kosong"}</td>
//                   <td>{d.harga ?? "kosong"}</td>
//                   <td>{d.deskripsi || "kosong"}</td>
//                   <td class="flex flex-nowrap gap-2">
//                     <Link
//                       href={`detail/${d.id}`}
//                       class="btn btn-primary btn-xs"
//                     >
//                       Detail
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <OptionTableFoot
//               data={data.map((list) => list.Transaksi.id_status as string)}
//               href={"/table/penukaran/"}
//             />
//           </table>
//         </div>
//       </CardBody>
//     )
//   },
// )
