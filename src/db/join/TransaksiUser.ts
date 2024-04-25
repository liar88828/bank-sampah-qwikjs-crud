import { prisma } from "~/config/prisma";
import { PenukaranTransaksi } from "~/type/transaksi.type";
import { PenyerahanTransaksi } from "~/type/transaksi.type";
import { TPenyerahanSampah } from "~/type/penyerahan-sampah.type";
import { MaterialTransaction } from "~/type/transaksi.type";
import { PropsProfile } from "~/type/user";




export class ProfilePage {
  findPenyerahanTransaksi = async (
    id: number,
    page = 0,
    search = "",
  ): Promise<PenyerahanTransaksi[]> => {
    let limit = 100;

    const res = await prisma.opsi_Penyerahan.findMany({
      where: {
        Transaksi: {
          id_user: id,
        },
      },
      select: {
        berat: true,
        createdAt: true,
        deskripsi: true,
        harga: true,
        id: true,
        id_transaksi: true,
        updatedAt: true,
        Transaksi: true,
      },
      take: 100,
      skip: page * limit,
    });
    return res;
  };

  findPenukaranTransaksi = async (
    id: number,
    page = 0,
    search = "",
  ): Promise<PenukaranTransaksi[]> => {
    let limit = 100;

    return prisma.opsi_Penukaran.findMany({
      where: {
        Transaksi: {
          id_user: id,
        },
      },
      select: {
        berat: true,
        createdAt: true,
        deskripsi: true,
        harga: true,
        id: true,
        id_transaksi: true,
        updatedAt: true,
        Transaksi: true,
      },
      take: 100,
      skip: page * limit,
    });
  };

  findMaterialTransaksi = async (
    id: number,
    page = 0,
    search = "",
  ): Promise<MaterialTransaction[]> => {
    let limit = 100;

    return prisma.material.findMany({
      where: {
        id_user: id,
      },
      select: {
        id: true,
        nama: true,
        berat: true,
        jenis: true,
        id_user: true,
        createdAt: true,
        updatedAt: true,

        Transaksi: true,
      },

      take: 100,
      skip: page * limit,
    });
  };
}

export class TransaksiUser extends ProfilePage {
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
            deskripsi: "",
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
          status_Transaksi: {
            create: {
              type: data.status,
            },
          },
        },
      });
      console.log("success create transaksi");

      // const status_Transaksi = await tx.status_Transaksi.create({
      //   data: {
      //     type: data.status,
      //     id_transaksi: transaksi.id,
      //   },
      // });
      // console.log("success create status transaksi");

      // const opsi_Penukaran = await tx.opsi_Penyerahan.create({
      //   data: { id_transaksi: 0, berat: 0, harga: 0, deskripsi: "" },
      // });
      // console.log("success create sampah transaksi");

      const material = await tx.material.createMany({
        data: data.sampah.map((d) => {
          return {
            berat: Number(d.berat),
            jenis: d.jenis,
            nama: d.nama,
            id_user: user.id,
            // id_sampahTransaksi: opsi_Penukaran.id,
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
        material,
        // status_Transaksi,
        // sampah_Transaksi,
      };
    });
  };

  totalPoint = async (id: number) => {
    return prisma.$transaction(async (tx) => {
      const totalTransaksi = await tx.transaksi.count({
        where: { id_user: id },
      });

      const totalMaterial = await tx.material.count({
        where: {
          id_user: id,
        },
      });

      const totalPenukaran = await tx.opsi_Penukaran.count({
        where: {
          Transaksi: {
            id_user: id,
          },
        },
      });

      const totalPenyerahan = await tx.opsi_Penyerahan.count({
        where: {
          Transaksi: {
            id_user: id,
          },
        },
      });

      return {
        totalTransaksi,
        totalPenukaran,
        totalMaterial,
        totalPenyerahan,
      } as PropsProfile["point"];
    });
  };



  
}
