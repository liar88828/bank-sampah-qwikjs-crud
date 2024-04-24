import { prisma } from "~/config/prisma";
import { TPenyerahanSampah } from "~/type/penyerahan-sampah.type";
import { OpsiPenukaran } from "../opsiPenukaran";

export class TransaksiUser {
  // extends OpsiPenukaran
  transaksiFindIdUser = async (id_user: number) => {
    return prisma.transaksi.findMany({
      where: { id_user },
      select: {
        id: true,
        id_user: true,
        tgl_transaksi: true,

        status_Transaksi: true,
        opsi_Penukaran: true,
      },
    });
  };

  findUserId_Material_Status_Opsi = async (
    id: number,
    page = 0,
    search = "",
  ) => {
    let limit = 100;
    return prisma.transaksi.findMany({
      where: {
        id_user: id,
      },
      select: {
        id_user: true,
        id: true,
        tgl_transaksi: true,
        status_Transaksi: true,
        opsi_Penukaran: true,
        Material: true,
      },
      take: 100,
      skip: page * limit,
    });
  };

  findAllTransaksiMaterialUser = async (id: number) => {
    return prisma.material.findMany({
      where: {
        id_user: id,
      },

      select: {
        berat: true,
        id: true,
        id_user: true,
        jenis: true,
        nama: true,
        User: {
          select: {
            nama: true,
          },
        },
      },
    });
  };

  // single transaction
  transaction_penyerahanSampah = async (data: TPenyerahanSampah) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(data.id_user) },
    });

    if (!user) {
      throw "User Not Found";
    }

    return prisma.transaksi.create({
      data: {
        tgl_transaksi: new Date(),
        id_user: user.id,
        // status transaksi-one
        status_Transaksi: {
          create: {
            type: data.status,
          },
        },
        // sampah transaksi-one
        opsi_Penukaran: {
          create: {
            harga: 0,
            berat: 0,
            deskripsi:""
            // material -many
            // Material: {
            //   createMany: {
            //     data: data.sampah.map((d) => {
            //       return {
            //         berat: Number(d.berat),
            //         jenis: d.jenis,
            //         nama: d.nama,
            //         id_sampahTransaksi: user.id,
            //       };
            //     }),
            //   },
            // },
          },
        },
      },
    });
  };

  // multi
  penyerahanSampah = async (data: TPenyerahanSampah) => {
    return prisma.$transaction(async (tx) => {
      // console.log(data);

      const user = await tx.user.findUnique({
        where: { id: Number(data.id_user) },
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
          id_user: user.id,
        },
      });
      console.log("success create transaksi");

      const status_Transaksi = await tx.status_Transaksi.create({
        data: {
          type: data.status,
          id_transaksi: transaksi.id,
        },
      });
      console.log("success create status transaksi");

      const sampah_Transaksi = await tx.opsi_Penukaran.create({
        data: { id_transaksi: 0, berat: 0, harga: 0, deskripsi: "" },
      });
      console.log("success create sampah transaksi");

      const material = await tx.material.createMany({
        data: data.sampah.map((d) => {
          return {
            berat: Number(d.berat),
            jenis: d.jenis,
            nama: d.nama,
            id_sampahTransaksi: sampah_Transaksi.id,
          };
        }),
      });
      console.log("success create material");

      // const transaksi = await tx.transaksi.create({
      //   data: {
      //     tgl_transaksi: new Date(),
      //     id_user: user.id,

      //     // sampah transaksi-one
      //     Sampah_Transaksi: {
      //       create: {
      //         total_berat: 0,
      //         total_harga: 0,
      //         // material -many
      //         Material: {
      //           createMany: {
      //             data: data.sampah.map((d) => {
      //               return {
      //                 berat: Number(d.berat),
      //                 jenis: d.jenis,
      //                 nama: d.nama,
      //                 id_sampahTransaksi: user.id,
      //               };
      //             }),
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      // const sampahTransaksi = await tx.sampah_Transaksi.create({
      //   data: {
      //     total_berat: 0,
      //     total_harga: 0,
      //     Material: {
      //       createMany: {
      //         data: data.sampah.map((d) => {
      //           return {
      //             berat: Number(d.berat),
      //             jenis: d.jenis,
      //             nama: d.nama,
      //           }
      //         })
      //       }
      //     }
      //   }
      // })

      return {
        user,
        transaksi,
        status_Transaksi,
        sampah_Transaksi,
        material,
      };
    });
  };

  totalPoint = async (id: number) => {
    return prisma.$transaction(async (tx) => {
      const totalTransaksi = await tx.transaksi.count({
        where: { id_user: id },
      });

      const totalBeli = await tx.transaksi.count({
        where: { id_user: id },
      });

      const totalMaterial = await tx.material.count({
        where: {
          id_user: id,
        },
      });

      return {
        totalTransaksi,
        totalBeli,
        totalMaterial,
      };
    });
  };
}
