import type { QRL, Signal } from "@builder.io/qwik"

//---------- usage
// function Mixin2<T extends Constructor<S>>(SuperClass: T) {
//   return class extends SuperClass {
//       foo() {
//           console.log('foo from Mixin2');
//           super.foo();
//       }
//   };
// }
export type PropsSignal<T> = Readonly<Signal<T>>

export type SampahStore = {
  list: {
    id: number
    berat: number
    jenis: string
    nama: string
  }[]
  add: QRL<(this: SampahStore) => void>
  remove: QRL<(this: SampahStore, index: number) => void>
}

export type MaterialDetail =
  | Readonly<Signal<null>>
  | Readonly<
      Signal<{
        id: number
        nama: string
        berat: number
        jenis: string
        Sampah_Transaksi: {
          Transaksi: {
            id: number
            id_user: number | null
            User: {
              nama: string | null
            } | null
            tgl_transaksi: Date
          }
        } | null
      }>
    >
