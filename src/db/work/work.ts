import { prisma } from "../../config/prisma";
import { users } from "../users";
import { material } from "../material/material";
import { transaksi } from "../transaksi";
import { riwayatPenukaranUser } from "../join/RiwayatPenukaranUser";

class MaterialWork {
  test = async (id: number) => {
    const test = await prisma.material.groupBy({
      by: ["kategori"],
      _sum: {
        berat: true,
      },
      _count: {
        _all: true,
      },
      where: { id_user: id },
    });

    const test2 = await prisma.material.aggregate({
      // by: ["jenis"],
      _sum: {
        berat: true,
      },
      _count: {
        _all: true,
        // jenis: true,
      },
      where: { id_user: id },
    });

    // console.log(test, "groupBy");
    // console.log(test2, "aggregate");
  };
}
class Work extends MaterialWork {
  material() {
    return material;
  }

  users() {
    return users;
  }

  transaksi() {
    return transaksi;
  }

  riwayatPertukaran() {
    return riwayatPenukaranUser;
  }
  // findAll = async (id: number) => {
  //   return prisma.user.findFirst();
  // };
}

export const works = new Work();
