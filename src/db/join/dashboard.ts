import type { Material, Prisma, PrismaClient } from "@prisma/client"
import { prisma } from "~/config/prisma"
import type { MaterialGroup, MaterialTotal } from "~/type/db/join.type"
import { type UserActiveDashboard } from "~/type/db/join.type"
import { type UserId } from "~/type/global/global.type"

export class Dashboard {
  async totalTransaksi(id: UserId): Promise<
    {
      _sum: {
        harga: number | null
        berat: number | null
      }
    }[]
  > {
    const res = await prisma.opsi.groupBy({
      by: ["berat"],
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          lte: new Date(),
        },

        Transaksi: {
          userBuyId: id,
        },
      },
      _sum: {
        harga: true,
        berat: true,
      },
    })

    const data = res.map((row) => {
      return {
        _sum: {
          harga: row._sum.harga,
          berat: row._sum.berat,
        },
      }
    })

    return data
  }
  async userActive(): Promise<UserActiveDashboard> {
    return prisma.user.findMany({
      where: { id_UserOption: "Online" },
      include: {
        User_Option: true,
      },
      take: 100,
    })
  }

  async totalMaterial() {
    const material = await prisma.material.groupBy({
      by: ["kategori", "nama", "id_user"],
      _sum: {
        berat: true,
      },
      _count: {
        kategori: true,
      },
    })

    const user = await prisma.user.findMany({
      where: {
        id: {
          in: material.map((row) => row.id_user as string),
        },
      },
      select: {
        id: true,
        nama: true,
        nama_belakang: true,
        alamat: true,
      },
    })

    return { user, material }
  }

  // Line Status
  async totalOrder(): Promise<TotalOrder[]> {
    const currentDate: Date = new Date()
    const currentDate2 = new Date().getMonth()
    console.log(currentDate2)

    const startDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const endDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )
    console.log(startDate)
    console.log(endDate)
    const materials: { createdAt: Date }[] = await prisma.material.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        createdAt: true,
      },
    })

    const dayCounts: { [key: string]: number } = materials.reduce(
      (acc, material) => {
        const dayName: string = material.createdAt.toLocaleDateString("id-ID", {
          weekday: "long",
        })
        //@ts-ignore
        acc[dayName] = (acc[dayName] || 0) + 1
        return acc
      },
      {},
    )

    const data: TotalOrder[] = Object.keys(dayCounts).map((day) => ({
      day,
      count: dayCounts[day],
    }))

    return data
  }

  async bestSelling(): Promise<BestSelling[]> {
    const materials = await prisma.material.groupBy({
      by: ["kategori", "nama"],
      _sum: {
        berat: true,
      },
    })
    // console.log(await materials, "polos")
    const datass = materials.map((material) => ({
      nama: material.nama,
      kategori: material.kategori,
      berat: material._sum.berat,
    }))
    // console.log(datass, "use map")

    return datass
  }

  async resolveAll(id: UserId): Promise<DashboardProps> {
    const totalTransaksi = await this.totalTransaksi(id)

    // console.log(totalTransaksi)
    const totalMaterial = (await this.totalMaterial()) as MaterialTotal
    const bestSelling = await this.bestSelling()
    const totalOrder = await this.totalOrder()

    // console.log(totalOrder)
    return {
      status: {
        totalOrder,
      },
      table: {
        bestSelling,
        userActive: await this.userActive(),
      },
      totalTransaksi,
      totalMaterial,
    }
  }
}

export type DashboardProps = {
  status: {
    totalOrder: TotalOrder[]
  }
  table: {
    userActive: UserActiveDashboard
    bestSelling: BestSelling[]
  }
  totalTransaksi: any
  totalMaterial: MaterialTotal
}

export interface TotalOrder {
  day: string
  count: number
}

export type BestSelling = {
  nama: string
  kategori: string
  berat: number | null
}
