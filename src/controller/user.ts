import { db } from "~/db/db"
import { type Session } from "@auth/core/types"
import { type UserPrisma } from "~/type/db/table.type"

export class UserController {
  sanitize(data: {
    nama: string
    email: string
    alamat: string
    no_hp: string
    kelamin: string
    tempat_lahir: string
    tanggal_lahir: string
    bahasa: string
    tema: string
    nama_belakang?: string | undefined
  }): UserPrisma {
    // console.log(data)
    return {
      email: data.email,
      alamat: data.alamat,
      no_hp: data.no_hp,
      nama: data.nama,
      nama_belakang: data.nama_belakang ?? "",
      kelamin: data.kelamin,
      tanggal_lahir: new Date(data.tanggal_lahir ?? Date.now()),
      tempat_lahir: data.tempat_lahir,
      bahasa: data.bahasa,
      theme: data.tema,
    }
  }

  async point(session: Session) {
    const id = session.user.id
    const user = await db.users.findId(session.user.id)
    const res = await Promise.all([
      db.profile.totalPoint(id),
      db.profile.totalTrolly(id),
    ])
    const point = { ...res[0], totalTrolly: res[1] }
    return { user, point }
  }
}
