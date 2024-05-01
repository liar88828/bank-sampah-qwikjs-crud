// import { prisma } from "~/config/prisma"
// import { type PaginationType } from "../../type/controller/PaginationType"
// import { type Material } from "@prisma/client"
// import { type PropsCart } from "~/type/global/PropsCartTrolly"
// import { type PenyerahanTransaksi } from "~/type/table/PenyerahanTransaksi"
// import { type Constructor } from "~/type/global/global.type"
// import { status_transaksi } from "../join/status"

// export function CartPenyerahan<T extends Constructor<{}>>(SuperClass: T) {
//   return class extends SuperClass {
//     // export abstract class CartPenyerahan extends CartTransaksi {
//     // ---------find
//     findPenyerahanTransaksi = async ({
//       id,
//       page = 0,
//     }: PaginationType<string>): Promise<PenyerahanTransaksi[]> => {
//       const limit = 100

//       const res = await prisma.opsi.findMany({
//         where: {
//           Transaksi: {
//             userBuyId: id,
//           },
//         },
//         select: {
//           berat: true,
//           createdAt: true,
//           deskripsi: true,
//           harga: true,
//           id: true,
//           id_transaksi: true,
//           updatedAt: true,
//           Transaksi: true,
//         },
//         take: 100,
//         skip: page * limit,
//       })
//       return res
//     }

//     //------add------------------------
//     async addCartPenyerahan(
//       id_user: string,
//       id_material: number,
//       berat: number,
//     ) {
//       return prisma.$transaction(async (tx) => {
//         /*
//          * 1. find cart
//          * 2.  if not found will create new cart
//          * 3. if found will add new list
//          */

//         // find cart
//         const cart = await tx.trolly.findUnique({
//           where: {
//             id_user,
//           },
//         })

//         // console.log(cart);
//         // if not found
//         if (!cart) {
//           // will create new cart and add list material to cart
//           return tx.trolly.create({
//             data: {
//               id_user,
//               Cases: {
//                 create: {
//                   status: "TROLLY",
//                   id_material,
//                   berat: berat,
//                 },
//               },
//             },
//           })
//         } else {
//           // if found will add new list material to cart
//           return tx.trolly.update({
//             where: {
//               id_user,
//             },
//             data: {
//               id_user,
//               Cases: {
//                 create: {
//                   status: "TROLLY",
//                   id_material,
//                   berat: berat,
//                 },
//               },
//             },
//           })
//         }
//       })
//     }

//     //------delete
//     async deleteChatPenyerahan(id_user: string, id_cartList: number) {
//       /**
//        * 1. find cart id by id_user
//        * 2. if not found will return error
//        * 3. if found will delete cart by delete id
//        */

//       return prisma.$transaction(async (tx) => {
//         // find cart
//         const cart = await tx.trolly.findUnique({
//           where: {
//             id_user,
//             // status: "TROLLY",
//           },
//         })

//         // if not found
//         if (!cart) {
//           throw new Error("Cart not found")
//         } else {
//           // if found will delete cart by delete id
//           const res = await tx.cases.delete({
//             where: { id: id_cartList },
//           })
//           return res
//         }
//       })
//     }

//     // ------------Trolly-------------
//     async findCartListPenyerahan(id_user: string): Promise<PropsCart> {
//       const data = await prisma.trolly.findUnique({
//         where: { id_user },
//         include: {
//           _count: true,
//           Cases: {
//             include: {
//               Material: true,
//             },
//           },
//         },
//       })

//       const totalCart = data?._count.Cases ?? 0

//       const totalBerat =
//         data?.Cases.reduce((a, { Material }) => {
//           if (!Material?.berat) {
//             return a
//           }
//           return a + Material?.berat
//         }, 0) ?? 0

//       const totalHarga =
//         data?.Cases.reduce((a, { Material }) => {
//           if (!Material?.harga) {
//             return a
//           }
//           return a + Material?.harga
//         }, 0) ?? 0

//       return {
//         data,
//         totalCart,
//         totalBerat,
//         totalHarga,
//       }
//     }

//     // ------------table----------------------
//     async findCartTablePenyerahan({
//       id,
//       page = 0,
//       search = "",
//     }: PaginationType<string>): Promise<Material[]> {
//       const limit = 100

//       const cart = await prisma.trolly.findUnique({
//         where: {
//           id_user: id,
//         },
//         select: {
//           id: true,
//         },
//       })
//       const res = await prisma.material.findMany({
//         where: {
//           nama: {
//             contains: search,
//           },
//           Cart_List: {
//             none: {
//               OR: [
//                 { status: "TROLLY" },
//                 { status: "OPSI_PENUKARAN" },
//                 { id_trolly: cart?.id },
//               ],
//             },
//           },
//         },
//         // select: {
//         //   id: true,
//         //   nama: true,
//         //   berat: true,
//         //   kategori: true,
//         //   id_user: true,
//         //   createdAt: true,
//         //   updatedAt: true,
//         //   deskripsi: true,
//         //   harga: true,
//         //   jumlah: true,
//         //   satuan: true,
//         // },

//         take: 100,
//         skip: page * limit,
//       })

//       return res
//     }

//     // ------------check out
//     /**
//      * 1. find cart get cart, material, and list cart
//      * 2. if not found will error
//      * 3. if found will save
//      *  will create transaksi
//      *  will create status transaksi
//      *  will create opsi penukaran
//      */
//     async checkOutPenyerahan(data: {
//       id_userBuy: string
//       // id_userSell: string
//       id_trolly: number
//       berat: number
//       harga: number
//       deskripsi: string
//     }) {
//       console.info(data, "---------data")

//       const status = await status_transaksi()
//       // this.deleteChatPenyerahan
//       return prisma.$transaction(async (tx) => {
//         // if found will create transaksi

//         const transaksi = await tx.transaksi.create({
//           data: {
//             tgl_transaksi: new Date(),
//             userBuyId: data.id_userBuy,
//             // userSellId: data.id_userSell,
//             id_status: status,
//           },
//         })
//         console.log(transaksi)

//         // will create opsi penukaran
//         const opsi_Penukaran = await tx.opsi.create({
//           data: {
//             berat: data.berat,
//             harga: data.harga,
//             deskripsi: data.deskripsi,
//             id_transaksi: transaksi.id,
//           },
//         })
//         console.log(opsi_Penukaran)

//         // will create cases update
//         /**
//          * ini akan di buat jamak karena case merupakan perkumpulan material
//          * atau case many to one trolly one to material
//          */
//         const cases = await tx.cases.updateMany({
//           where: {
//             id_trolly: data.id_trolly, //
//           },
//           data: {
//             status: "OPSI_PENUKARAN",
//             id_trolly: null,
//             opsi: opsi_Penukaran.id,
//           },
//         })

//         return {
//           cases,
//           opsi_Penukaran,
//           transaksi,
//         }
//       })
//     }

//     async findPenyerahan(id: number) {
//       console.log(id)
//       return prisma.opsi_Penyerahan.findUnique({
//         where: { id },
//         select: {
//           Cases: {
//             include: {
//               Material: true,
//             },
//           },
//           Transaksi: true,
//         },
//       })
//     }
//   }
// }
// // async findMaterialTransactionPenyerahan(id: number) {
// //   return prisma.material.findUnique({
// //     where: { id },
// //     select: {
// //       berat: true,
// //       kategori: true,
// //       nama: true,
// //       id: true,
// //       id_user: true,
// //       createdAt: true,
// //       User: true,
// //       Cart_List: true,
// //       // Transaksi: {
// //       //   select: {
// //       //     opsi_Penukaran: true,
// //       //     status_Transaksi: true,
// //       //     id: true,
// //       //     tgl_transaksi: true,
// //       //     id_user: true,
// //       //     User: {
// //       //       select: {
// //       //         nama: true,
// //       //       },
// //       //     },
// //       //   },
// //       // },
// //     },
// //   });
// // }
