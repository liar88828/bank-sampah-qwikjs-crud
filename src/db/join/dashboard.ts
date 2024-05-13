import { prisma } from "~/config/prisma"
import type {
  MaterialTransaction,
  CombineTransaction,
  TotalOrder,
  TotalTransaksi,
  UserActiveDashboard,
  TotalMaterialProps,
  UserPick,
  MaterialPick,
  UserTransaction,
  TransactionFind,
  BestTransactionProps,
} from "~/type/db/dashboard.type"
import { type UserId } from "~/type/global/global.type"

export class Dashboard {
  async totalTransaksi(id: UserId): Promise<TotalTransaksi[]> {
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

  async userActive(): Promise<UserActiveDashboard[]> {
    return prisma.user.findMany({
      where: {
        // id_UserOption: "Online"
      },
      select: {
        nama: true,
        nama_belakang: true,
        alamat: true,
        User_Option: {
          select: {
            active: true,
            role: true,
          },
        },
      },
      take: 100,
    })
  }

  async bestTransaction(): Promise<BestTransactionProps> {
    // : Promise<BestSellingProps>

    const transaction: TransactionFind[] = await prisma.transaksi
      .groupBy({
        by: ["userBuyId", "id"],
        _count: {
          userBuyId: true,
        },
        orderBy: {
          userBuyId: "desc",
        },
        take: 100,
      })
      .then((d) =>
        d.map((row) => {
          return {
            userBuyId: row.userBuyId ?? "dev_kosong",
            count_id: row._count.userBuyId,
            id: row.id,
          }
        }),
      )

    const material: MaterialTransaction[] = await prisma.opsi
      .groupBy({
        orderBy: {
          id: "asc",
        },
        where: { id_transaksi: { in: transaction.map((row) => row.id) } },
        _count: {
          _all: true,
        },
        by: ["id", "berat", "harga", "id_transaksi"],
        _sum: {
          berat: true,
          harga: true,
        },
      })
      .then((d) =>
        d.map((row) => ({
          berat: row._sum.berat ?? 0,
          harga: row._sum.harga ?? 0,
          sumBerat: row._sum.berat ?? 0,
          sumHarga: row._sum.harga ?? 0,
          count: row._count._all,
          id: row.id,
          id_transaksi: row.id_transaksi,
        })),
      )

    const user: UserTransaction[] = await prisma.user.findMany({
      where: {
        id: {
          in: transaction.map((row) => row.userBuyId),
        },
      },
      select: {
        nama: true,
        nama_belakang: true,
        alamat: true,
        id: true,
      },
    })

    const combinedData: CombineTransaction[] = transaction.map((row) => {
      const materials = material.find((m) => m.id_transaksi === row.id)
      const users = user.find((u) => u.id === row.userBuyId)

      return {
        ...row,
        users,
        materials,
      }
    })

    // console.log(combinedData)
    return {
      transaction,
      material,
      user,
      combinedData,
    }
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

  async totalMaterial(): Promise<TotalMaterialProps> {
    const materials = await prisma.material.groupBy({
      by: ["kategori", "nama", "id_user"],
      _sum: {
        berat: true,
      },
    })

    // console.log(await materials, "polos")
    const datass: MaterialPick[] = materials.map((material) => ({
      nama: material.nama,
      id_user: material.id_user,
      kategori: material.kategori,
      berat: material._sum.berat ?? 0,
    }))

    const users: UserPick[] = await prisma.user.findMany({
      where: {
        id: {
          in: datass.map((row) => row.id_user as string),
        },
      },
      select: {
        id: true,
        nama: true,
        nama_belakang: true,
        alamat: true,
      },
    })

    // console.log(datass, "use map")

    const combinedData = datass.map((material) => ({
      ...material,
      user: users.find((user) => user.id === material.id_user),
    }))
    return { material: datass, users, combinedData }
  }

  async resolveAll(id: UserId): Promise<DashboardProps> {
    const totalTransaksi = await this.totalTransaksi(id)
    const bestTransaction = await this.bestTransaction() //BestTransactionProps
    const totalMaterial = await this.totalMaterial() //TotalMaterialProps
    const totalOrder = await this.totalOrder() //BarStatus
    const userActive = await this.userActive() //userActive
    // console.log()

    return {
      status: {
        totalOrder,
      },
      table: {
        totalMaterial,
        userActive,
      },
      totalTransaksi,
      bestTransaction,
      // totalMaterial,
    }
  }
}

export type DashboardProps = {
  status: {
    totalOrder: TotalOrder[]
  }
  table: {
    userActive: UserActiveDashboard[]
    totalMaterial: TotalMaterialProps
  }
  bestTransaction: BestTransactionProps
  totalTransaksi: TotalTransaksi[]
}

// const transaksi = await prisma.transaksi.findMany({
//   where: {},
//   select: {
//     id: true,
//     userBuyId: true,
//   },
// })

// const opsi = await prisma.opsi.findMany({
//   where: {
//     id: {
//       in: transaksi.map((row) => row.id),
//     },
//   },
//   select: { id: true },
// })

// const cases = await prisma.cases.findMany({
//   where: {
//     id: {
//       in: opsi.map((row) => row.id),
//     },
//   },
//   select: {
//     id_material: true,
//   },
// })
