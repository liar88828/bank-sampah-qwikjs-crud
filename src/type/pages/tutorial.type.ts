export type LoadTutorialOption = {
  no: number
  kembali: boolean
  lanjut: boolean
  list?: string[]
  link: {
    linkLanjut: string
    linkCurrent: string
    linkKembali: string
  }
  text: string
  array: listTutorialPage
}
export type listTutorialPage = {
  title: string
  text: string
  list?: string[]
  link: {
    before: string
    current: string
    after: string
  }
}[]
