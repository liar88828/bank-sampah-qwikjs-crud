import type {
  TCheckOutReturn,
  TCheckoutAction,
  TCheckoutSend,
} from "../type/controller/TCheckOut"
import { type Session } from "@auth/core/types"
import { db } from "~/db/db"

export class CheckOutController {
  send(data: TCheckoutSend): TCheckOutReturn {
    return {
      id_trolly: data.id_trolly,
      id_userBuy: data.id_userBuy,
      // id_userSell: data.id_userSell,
      berat: data.berat,
      harga: data.harga,
      deskripsi: data.deskripsi,
    }
  }

  sanitize(data: TCheckoutAction) {
    console.info("controller : CheckoutAction :", data)
    return {
      id_trolly: data.id_trolly,
      // id_userSell: data.id_sell, // example
      berat: data.totalBerat,
      harga: data.totalHarga,
      deskripsi: data.deskripsi,
    }
  }

  async notifyTrolly(session: Session) {
    const id = session.user.id
    const trollyUnProcess = await db.profile.totalTrolly(id)
    const transactionUnProcess =
      await db.profile.totalUnprocessedTransaction(id)

    return {
      trolly: trollyUnProcess,
      transaction: transactionUnProcess,
    }
  }
}
