import { CheckOutController } from "./CheckOut"
import { MaterialController } from "./material"
import { TransaksiController } from "./transaksi"
import { UserController } from "./user"
import { TableController } from "./table"

class Controller {
  cart = new CheckOutController()
  table = new TableController()
  user = new UserController()
  material = new MaterialController()

  transaksi = new TransaksiController()
}
export const control = new Controller()
