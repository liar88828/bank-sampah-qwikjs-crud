import { prisma } from "~/config/prisma"
import type { PaginationType } from "~/type/controller/PaginationType"
import type { PropsTrollyCard } from "~/type/db/cart.type"
import type { TCheckoutSend } from "~/type/controller/TCheckOut"

export class TrollyCart {
  findTrolly = async ({
    id,
    page = 0,
    search = "TROLLY",
  }: PaginationType<string, Object>): Promise<PropsTrollyCard[]> => {
    const limit = 100

    return prisma.cases.findMany({
      where: {
        AND: {
          status: search,
          Trolly: {
            id_user: id,
          },
        },
      },
      include: {
        Trolly: true,
        Material: true,
      },
      take: 100,
      skip: page * limit,
    })
  }

  //------add
  async addCartTrolly(id_user: string, id_material: number) {
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
      })

      // console.log(cart);
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
                berat: 0,
              },
            },
          },
        })
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
                berat: 0,
              },
            },
          },
        })
      }
    })
  }

  //------delete
  async deleteChatTrolly(id_user: string, id_cartList: number) {
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
      })

      // if not found
      if (!cart) {
        throw new Error("Cart not found")
      } else {
        // if found will delete cart by delete id
        const res = await tx.cases.delete({
          where: { id: id_cartList },
        })
        return res
      }
    })
  }

  // ------------Trolly
  async findCartListTrolly(id_user: string) {
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
    })

    const totalCart = res?._count.Cases ?? 0
    const totalBerat =
      res?.Cases.reduce((a, { Material }) => {
        if (!Material?.berat) {
          return a
        }
        return a + Material?.berat
      }, 0) ?? 0

    const totalHarga =
      res?.Cases.reduce((a, { Material }) => {
        if (!Material?.harga) {
          return a
        }
        return a + Material?.harga
      }, 0) ?? 0

    return { res, totalCart, totalBerat, totalHarga }
  }

  // ------------table
  async findCartTableTrolly(id: string, page = 0, search = "") {
    const limit = 100

    const cart = await prisma.trolly.findUnique({
      where: {
        id_user: id,
      },
      select: {
        id: true,
      },
    })
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
              { id_trolly: cart?.id },
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
        deskripsi: true,
        harga: true,
        jumlah: true,
        satuan: true,
      },

      take: 100,
      skip: page * limit,
    })

    return res
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
  async checkOutTrolly({
    id_userBuy,
    // id_userSell,
    id_trolly,
    berat,
    harga,
    deskripsi,
  }: TCheckoutSend) {
    return prisma.$transaction(async (tx) => {
      // if found will create transaksi
      const transaksi = await tx.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          userBuyId: id_userBuy,
          // userSellId: id_userSell,
          id_status: "SIMPAN",
        },
      })
      console.log(transaksi)

      // will create opsi penukaran
      const opsi_Penukaran = await tx.opsi.create({
        data: {
          typeOpsiId: "Penukaran",
          berat: berat,
          harga: harga,
          deskripsi: deskripsi,
          id_transaksi: transaksi.id,
        },
      })
      console.log(opsi_Penukaran)

      // will create cases update
      /**
       * ini akan di buat jamak karena case merupakan perkumpulan material
       * atau case many to one trolly one to material
       */
      const cases = await tx.cases.updateMany({
        where: {
          id_trolly, //
        },
        data: {
          status: "OPSI_PENUKARAN",
          id_trolly: null,
          id_opsi: opsi_Penukaran.id,
        },
      })

      return {
        cases,
        opsi_Penukaran,
        transaksi,
      }
    })
  }

  async findTrollys(id: number) {
    console.log(id)
    return prisma.opsi.findUnique({
      where: { id, typeOpsiId: "Penyerahan" },
      select: {
        Cases: {
          include: {
            Material: true,
          },
        },
        Transaksi: true,
      },
    })
  }
}
