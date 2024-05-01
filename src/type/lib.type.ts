import { type TMaterial } from "./db/table.type"

export type TestData = keyof {
  id: number
  total_berat: number
  total_harga: number
  Material: TMaterial[]
}
