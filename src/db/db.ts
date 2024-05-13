import { CartDB } from "./cart/cart"
import { Profile } from "./cart/profile"
import { Dashboard } from "./join/dashboard"
import { Menu } from "./menu/menu"
import { MaterialDB } from "./table/material.db"
import { TransaksiClass } from "./table/transaksi"
import { Users } from "./table/users"
import { Work } from "./work/work"

class DB {
  work = new Work()
  profile = new Profile()
  transaksi = new TransaksiClass()
  users = new Users()

  cartPenyerahan = new CartDB("Penyerahan")
  cartPenukaran = new CartDB("Penukaran")

  material = new MaterialDB()
  dashboard = new Dashboard()
  menu = new Menu()
}

export const db = new DB()
