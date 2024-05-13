export type NameOrId<T> = T extends T ? T : Object

export type PaginationType<T, O> = {
  id: T
  page: number
  search: string
  other: O
}
