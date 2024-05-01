import { prisma } from "~/config/prisma"
import type { Material, Opsi, Trolly } from "@prisma/client"
import type { TCheckOutReturn } from "~/type/controller/TCheckOut"
import type { PaginationType } from "~/type/controller/PaginationType"
import type { PropsCart, PropsFindOpsi, CasesProps } from "~/type/db/cart.type"

abstract class CartMutation {
  constructor(public typeOpsi: string) {}
  //------add
  /*
   * 1. find cart
   * 2.  if not found will create new cart
   * 3. if found will add new list
   */

  async addCart(id_user: string, id_material: number, berat: number) {
    // find cart
    const cart = await prisma.trolly.findUnique({
      where: {
        id_user,
      },
    })

    return prisma.$transaction(async (tx) => {
      // if not found
      if (!cart) {
        // will create new cart and add list material to cart
        return tx.trolly.create({
          data: {
            id_user,
            Cases: {
              create: {
                status: "TROLLY",
                id_material,
                berat: berat,
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
                berat: berat,
              },
            },
          },
        })
      }
    })
  }

  //------delete-----------------
  async deleteCart(id_user: string, id_cartList: number) {
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

  // ------------check out
  /**
   * 1. find cart get cart, material, and list cart
   * 2. if not found will error
   * 3. if found will save
   *  will create transaksi
   *  will create status transaksi
   *  will create opsi
   */
  async checkOut(data: TCheckOutReturn) {
    return prisma.$transaction(async (tx) => {
      // find cart

      // if found will create transaksi
      const transaksi = await tx.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          userBuyId: data.id_userBuy,
          // userSellId: data.id_userSell,
          id_status: "SIMPAN",
        },
      })
      console.log(transaksi)

      // will create opsi penukaran
      const opsi = await tx.opsi.create({
        data: {
          typeOpsiId: this.typeOpsi,
          berat: data.berat,
          harga: data.harga,
          deskripsi: data.deskripsi,
          id_transaksi: transaksi.id,
        },
      })
      console.log(opsi)

      // will create cases update
      /**
       * ini akan di buat jamak karena case merupakan perkumpulan material
       * atau case many to one trolly one to material
       */
      const cases = await tx.cases.updateMany({
        where: {
          id_trolly: data.id_trolly, //
        },
        data: {
          status: "OPSI_PENUKARAN",
          id_trolly: null,
          id_opsi: opsi.id,
        },
      })

      return {
        cases,
        opsi,
        transaksi,
      }
    })
  }
}

// CartPenyerahan
export class CartDB extends CartMutation {
  constructor(public typeOpsi: string) {
    super(typeOpsi)
  }

  findTransaksi = async ({
    id,
    page = 0,
  }: PaginationType<string>): Promise<Opsi[]> => {
    const limit = 100

    return prisma.opsi.findMany({
      where: {
        Transaksi: {
          userBuyId: id,
        },
        typeOpsiId: this.typeOpsi,
      },
      take: 100,
      skip: page * limit,
    })
  }

  // ------------Trolly
  async findCartTrolly(id_user: string): Promise<PropsCart> {
    const data = await prisma.trolly.findUnique({
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

    const totalCart = data?._count.Cases ?? 0
    const totalBerat =
      data?.Cases.reduce((a, { berat }) => {
        if (!berat) {
          return a
        }
        return a + berat
      }, 0) ?? 0

    const totalHarga =
      data?.Cases.reduce((a, { Material }) => {
        if (!Material?.harga) {
          return a
        }
        return a + Material?.harga
      }, 0) ?? 0

    return { data, totalCart, totalBerat, totalHarga }
  }

  // ------------table
  async findCartTable({
    id,
    page = 0,
    search = "",
  }: PaginationType<string>): Promise<Material[]> {
    const limit = 100

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

      take: 100,
      skip: page * limit,
    })

    return res
  }

  async findCartOpsi(id: number): Promise<PropsFindOpsi> {
    return prisma.opsi.findUnique({
      where: { id, typeOpsiId: this.typeOpsi },
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
export type loadProps = Trolly & { Cases: CasesProps[] }
