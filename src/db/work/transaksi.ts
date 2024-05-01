import { prisma } from "~/config/prisma";
import { PenyerahanWork } from "./penyerahan";
import { TransaksiUser } from "../join/TransaksiUser";
import type { TPenyerahanSampah } from "~/type/db/join.type"

export class TransaksiWork extends TransaksiUser(PenyerahanWork) {
  // multi
  penyerahanSampah = async (data: TPenyerahanSampah) => {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: data.id_user },
      });
      console.log("user found");

      if (!user) {
        console.log("user not found");
        return {
          success: false,
          error: "User Not Found",
        };
      }

      const transaksi = await tx.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          userBuyId: user.id,
          id_status: data.status,
        },
      });
      console.log("success create transaksi");

      const material = await tx.material.createMany({
        data: data.sampah.map((d) => {
          return {
            berat: Number(d.berat),
            kategori: d.kategori,
            nama: d.nama,
            id_user: user.id,
            satuan: d.satuan,
            deskripsi: d.deskripsi,
          };
        }),
      });
      console.log("success create material");

      return {
        user,
        transaksi,
        material,
      };
    });
  };
}
