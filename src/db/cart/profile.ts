import { prisma } from "~/config/prisma"
import { type PropsProfile } from "~/type/db/cart.type"
import { CartTransaksi } from "./transaksi"
// import { TransaksiUser } from "../join/TransaksiUser"
import { MaterialCart } from "./material"
import { TransaksiUser } from "../join/TransaksiUser"

export class Profile extends CartTransaksi(TransaksiUser(MaterialCart)) {
  totalPoint = async (id: string) => {
    return prisma.$transaction(async (tx) => {
      const totalTransaksi = await tx.transaksi.count({
        where: { userBuyId: id },
      })

      const totalMaterial = await tx.material.count({
        where: {
          id_user: id,
        },
      })

      const totalPenukaran = await tx.opsi.count({
        where: {
          typeOpsiId: "Penukaran",
          Transaksi: {
            userBuyId: id,
          },
        },
      })

      const totalPenyerahan = await tx.opsi.count({
        where: {
          typeOpsiId: "Penyerahan",
          Transaksi: {
            userBuyId: id,
          },
        },
      })
      return {
        totalTransaksi,
        totalPenukaran,
        totalMaterial,
        totalPenyerahan,
      } as Omit<PropsProfile["point"], "totalTrolly">
    })
  }

  totalTrolly = async (id: string) => {
    return prisma.cases.count({
      where: {
        AND: {
          status: "TROLLY",
          Trolly: {
            id_user: id,
          },
        },
      },
    })
  }
  totalUnprocessedTransaction = async (id: string) => {
    return prisma.transaksi.count({
      where: {
        AND: {
          Status_Transaksi: { id: "SIMPAN" },
          userBuyId: id,
        },
      },
    })
  }
}
