import { prisma } from "~/config/prisma"
import { type PaginationType } from "~/type/controller/PaginationType"
import { type Constructor } from "~/type/global/global.type"
import type {
  UserFindMaterialReturn,
  TPenyerahanSampah,
} from "~/type/db/join.type"
import type { Material, User } from "@prisma/client"

type FindAllMaterialProps = (Material & {
  User: User | null
})[]
export function TransaksiUser<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {
    // export class TransaksiUser {
    // extends OpsiPenukaran
    transaksiFindIdUser = async (id_user: string) => {
      return prisma.transaksi.findMany({
        where: { userBuyId: id_user },
        select: {
          id: true,
          userBuyId: true,
          tgl_transaksi: true,
          id_status: true,
          Opsi: true,
        },
      })
    }

    async findAllTransaksiMaterialUser(
      id_user: string,
    ): Promise<FindAllMaterialProps> {
      return prisma.material.findMany({
        where: {
          id_user,
        },
        include: {
          User: true,
        },
      })
    }

    async findUser_Material({
      id,
      page = 0,
    }: PaginationType<string>): Promise<UserFindMaterialReturn> {
      const limit = 100
      return prisma.transaksi.findMany({
        where: {
          userBuyId: id,
        },
        include: {
          Opsi: {
            include: {
              Cases: {
                include: {
                  Material: true,
                },
              },
            },
          },

          // userSell: {
          //   select: {
          //     Material: true,
          //   },
          // },
        },
        take: 100,
        skip: page * limit,
      })
    }

    // single transaction
    transaction_penyerahanSampah = async (data: TPenyerahanSampah) => {
      const user = await prisma.user.findUnique({
        where: { id: data.id_user },
      })

      if (!user) {
        return false
      }

      return prisma.transaksi.create({
        data: {
          tgl_transaksi: new Date(),
          userBuyId: user.id,
          // status transaksi-one
          id_status: data.transaksi.id_status,

          // sampah transaksi-one
          Opsi: {
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
      })
    }
  }
}
