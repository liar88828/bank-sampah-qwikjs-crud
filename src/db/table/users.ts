import type { Prisma, User } from "@prisma/client"
import { type PaginationType } from "~/type/controller/PaginationType"
import type { UserPrisma, User_Status } from "~/type/db/table.type"
import { prisma } from "~/config/prisma"

abstract class UsersMutation {
  createOne = async (data: UserPrisma) => {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        alamat: data.alamat,
        no_hp: data.no_hp,
        nama: data.nama,
        nama_belakang: data.nama_belakang,
        kelamin: data.kelamin,
        tanggal_lahir: data.tanggal_lahir,
        tempat_lahir: data.tempat_lahir,
        User_Option: {
          create: {
            bahasa: data.bahasa,
            theme: data.theme,
          },
        },
      },
    })

    return user
  }

  updateOne = async (id: string, data: UserPrisma) => {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
        alamat: data.alamat,
        no_hp: data.no_hp,
        nama: data.nama,
        nama_belakang: data.nama_belakang,
        kelamin: data.kelamin,
        tanggal_lahir: data.tanggal_lahir,
        tempat_lahir: data.tempat_lahir,
        User_Option: {
          upsert: {
            create: { bahasa: data.bahasa, theme: data.theme },
            update: {
              bahasa: data.bahasa,
              theme: data.theme,
            },
            where: {
              User: {
                id: id,
              },
            },
          },
        },
      },
    })

    return user
  }

  deleteOne = async (id: string) => {
    const user = await prisma.user.delete({ where: { id } })
    return user
  }
}

export class Users extends UsersMutation {
  findFirst = async () => {
    const users = await prisma.user.findFirst()
    return users
  }

  findAll = async () => {
    const users = await prisma.user.findMany()
    return users
  }

  findAllAdmin = async ({
    page = 0,
    search = "",
  }: PaginationType<number>): Promise<User[]> => {
    const limit = 100

    return prisma.user.findMany({
      where: { kelamin: search },
      take: 100,
      skip: page * limit,
    })
  }

  findSearchPage = async (nama: string, page: number, limit: number) => {
    const where = {} as Prisma.UserWhereInput

    if (nama) {
      where.nama = { contains: nama }
    }
    const users = await prisma.user.findMany({
      where,
      take: limit,
      skip: page,
    })
    return users
  }

  findId = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  }

  async findUser(id: string): Promise<User_Status> {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id },
        include: { User_Option: true },
      })

      const { User_Option, ...res } = user
      if (!User_Option) {
        return {
          ...res,
          bahasa: "dev_kosong",
          theme: "dev_kosong",
          active: "dev_kosong",
          role: "dev_kosong",
        }
      }
      return { ...User_Option, ...res }
    })
  }
}
