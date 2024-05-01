export type TCheckOutReturn = {
  id_userBuy: string
  // id_userSell: string
  id_trolly: number
  berat: number
  harga: number
  deskripsi: string
}
export type TCheckoutSend = {
  id_userBuy: string
  // id_userSell: string
  id_trolly: number
  berat: number
  harga: number
  deskripsi: string
}

export type TCheckoutAction = {
  id_trolly: number
  // id_sell: string
  totalBerat: number
  totalHarga: number
  deskripsi: string
}
