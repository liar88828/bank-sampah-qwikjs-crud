import { prisma } from "~/config/prisma"

// export function Status<T extends Constructor<{}>>(SuperClass: T) {
//   return class extends SuperClass {
//     status_transaksi = async () => {
//       return prisma.$transaction(async (tx) => {
//         const status = await tx.status_Transaksi.findUnique({
//           where: { id: "SIMPAN" },
//         })
//         if (status) {
//           return status.id
//         } else {
//           return tx.status_Transaksi.create({
//             data: { id: "SIMPAN" },
//           })
//         }
//       })
//     }
//   }
// }
export const status_transaksi = async () => {
  return prisma.$transaction(async (tx) => {
    const status = await tx.status_Transaksi.findUnique({
      where: { id: "SIMPAN" },
    })
    if (status) {
      return status.id
    } else {
      const statusCreate = await tx.status_Transaksi.create({
        data: { id: "SIMPAN" },
      })
      return statusCreate.id
    }
  })
}
