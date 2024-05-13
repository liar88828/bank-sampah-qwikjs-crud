import { prisma } from "~/config/prisma"
import { PenyerahanWork } from "./penyerahan"
import { TransaksiUser } from "../join/TransaksiUser"
import type { TPenyerahanSampah } from "~/type/db/join.type"

export class TransaksiWork extends TransaksiUser(PenyerahanWork) {
  // multi
  penyerahanSampah = async (data: TPenyerahanSampah) => {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: data.id_user },
      })
      console.log("user found")

      if (!user) {
        console.log("user not found")
        return {
          success: false,
          error: "User Not Found",
        }
      }

      const transaksi = await tx.transaksi.create({
        data: data.transaksi,
      })

      await tx.kategori
        .findMany({
          where: {
            id: { notIn: data.material.map((d) => d.kategori) },
          },
        })
        .then(async (data) => {
          if (data.length !== 0) {
            console.log("create new kategori")
            return tx.kategori.createMany({
              data: data.map((d) => {
                return { id: d.id }
              }),
            })
          }
        })

      console.log("success create transaksi")
      const material = await tx.material.createMany({
        data: data.material,
      })
      console.log("success create material")

      return {
        user,
        transaksi,
        material,
      }
    })
  }
}
