import { prisma } from "~/config/prisma";
import status from "~/routes/menu/status";
import { MaterialTransaction } from "~/type/transaksi.type";

class CartPenukaran {
  //------add
  async addCart(id_user: number, id_material: number) {
    // console.log(id_material, id_user);
    return prisma.$transaction(async (tx) => {
      /*
       * 1. find cart
       * 2.  if not found will create new cart
       * 3. if found will add new list
       */

      // find cart
      const cart = await tx.trolly.findUnique({
        where: {
          id_user,
        },
      });

      console.log(cart);
      // if not found
      if (!cart) {
        // will create new cart and add list material to cart
        return tx.trolly.create({
          data: {
            id_user,
            Cases: {
              create: {
                id_material,
                status: "TROLLY",
              },
            },
          },
        });
      } else {
        // if found will add new list material to cart
        return tx.trolly.update({
          where: {
            id_user,
          },
          data: {
            id_user,
            Cases: {
              create: {
                status: "TROLLY",
                id_material,
              },
            },
          },
        });
      }
    });
  }

  //------delete
  async deleteCart(id_user: number, id_cartList: number) {
    /**
     * 1. find cart id by id_user
     * 2. if not found will return error
     * 3. if found will delete cart by delete id
     */

    return prisma.$transaction(async (tx) => {
      // find cart
      const cart = await tx.trolly.findUnique({
        where: {
          id_user,
          // status: "TROLLY",
        },
      });

      // if not found
      if (!cart) {
        throw new Error("Cart not found");
      } else {
        // if found will delete cart by delete id
        const res = await tx.cases.delete({
          where: { id: id_cartList },
        });
        return res;
      }
    });
  }

  // ------------Trolly
  async findCartList(id_user: number) {
    const res = await prisma.trolly.findUnique({
      where: { id_user },
      include: {
        _count: true,
        Cases: {
          include: {
            Material: true,
          },
        },
      },
    });

    const totalCart = res?._count.Cases ?? 0;
    const totalBerat =
      res?.Cases.reduce((a, { Material }) => {
        if (!Material?.berat) {
          return a;
        }
        return a + Material?.berat;
      }, 0) ?? 0;
    return { res, totalCart, totalBerat };
  }

  // ------------table
  async findCartTable(
    id: number,
    page = 0,
    search = "",
  ): Promise<MaterialTransaction[]> {
    let limit = 100;

    const cart = await prisma.trolly.findUnique({
      where: {
        id_user: id,
        // cases: {
        //   none: {
        //     status: "TROLLY",
        //   },
        // },
      },
      select: {
        id: true,
      },
    });
    const res = await prisma.material.findMany({
      where: {
        nama: {
          contains: search,
        },
        Cart_List: {
          none: {
            OR: [
              { status: "TROLLY" },
              { status: "OPSI_PENUKARAN" },
              { id_trolly: cart?.id, },
            ],
          },
        },
      },
      select: {
        id: true,
        nama: true,
        berat: true,
        kategori: true,
        id_user: true,
        createdAt: true,
        updatedAt: true,
        Transaksi: true,
        deskripsi: true,
        harga: true,
        jumlah: true,
        satuan: true,
      },

      take: 100,
      skip: page * limit,
    });

    return res;
  }

  // ------------check out
  /**
   * 1. find cart get cart, material, and list cart
   * 2. if not found will error
   * 3. if found will save
   *  will create transaksi
   *  will create status transaksi
   *  will create opsi penukaran
   */
  async checkOutPenukaran(
    id_user: number,
    data: {
      id_trolly: number;
      berat: number;
      deskripsi: string;
    },
  ) {
    console.log({ id_user, data });

    return prisma.$transaction(async (tx) => {
      // find cart
      // const trolly = await tx.trolly.findUnique({
      //   where: {
      //     id: data.id_trolly,
      //     // id_user: id_user,
      //   },
      // });

      // // if not found
      // if (!trolly) {
      //   return new Error("Cart not found");
      // }
      // if found will create transaksi
      const transaksi = await prisma.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          id_user: id_user,
          status_Transaksi: {
            create: {
              type: "SIMPAN",
            },
          },
        },
      });
      console.log(transaksi);

      // will create opsi penukaran
      const opsi_Penukaran = await prisma.opsi_Penukaran.create({
        data: {
          berat: data.berat,
          deskripsi: data.deskripsi,
          harga: 0,
          id_transaksi: transaksi.id,
        },
      });
      console.log(opsi_Penukaran);

      // will create cases update
      const cases = await prisma.cases.updateMany({
        where: {
          id_trolly: data.id_trolly,
        },
        data: {
          status: "OPSI_PENUKARAN",
          id_trolly: null,
          opsi_PenukaranId: opsi_Penukaran.id,
        },
      });
      // const trolly = await tx.trolly.delete({
      //   where: {
      //     id: data.id_trolly,
      //   },
      // });
      // console.log(cases);

      return {
        cases,
        opsi_Penukaran,
        transaksi,
        // trolly,
      };
      // }
      // {
      //   isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      //   maxWait: 5000, // default: 2000
      //   timeout: 10000, // default: 5000
      // },
    });
  }
}

export const cartPenukaran = new CartPenukaran();

// // will create trolly penukaran
// const trollyPenukaran = await prisma.trolly.update({
//   where: {
//     id: data.id_trolly,
//     id_user: id_user,
//   },
//   data: {
//     Opsi_Penyerahan: {
//       create: {
//         id: opsi_Penukaran.id,
//       },
//     },
//     // id_opsiPenukaran: opsi_Penukaran.id,
//   },
// });

// if found will wave in table opsi_penukaran
// await tx.opsi_Penukaran.create({
//   data: {
//     berat: data.berat,
//     // materials._sum.berat
//     // berat: 0,
//     deskripsi: data.deskripsi,
//     harga: 0,
//     Transaksi: {
//       create: {
//         tgl_transaksi: new Date(),
//         status_Transaksi: {
//           create: {
//             type: "Penukaran",
//           },
//         },
//       },
//     },
//   },
// });
// await tx.cartList.deleteMany({ where: { id_cart: cart.id } });
