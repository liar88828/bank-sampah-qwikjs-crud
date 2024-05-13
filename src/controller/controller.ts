import { CheckOutController } from "./CheckOut"
import { MaterialController } from "./material"
import { TransaksiController } from "./transaksi"
import { UserController } from "./user"
import { TableController } from "./table"
import { PenyerahanController } from "./penyerahanSampah"
// import { AuthController } from "./auth"

class Controller {
  cart = new CheckOutController()
  table = new TableController()
  user = new UserController()
  material = new MaterialController()

  transaksi = new TransaksiController()
  opsi = new PenyerahanController()
  // auth = new AuthController()
}

export const control = new Controller()
