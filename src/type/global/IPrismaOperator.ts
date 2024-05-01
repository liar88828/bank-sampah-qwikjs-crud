export interface IPrismaOperator<T> {
  findAll: () => Promise<any>;
  findId: (id: number) => Promise<any>;
  createOne: (data: T) => Promise<any>;
  updateOne: (id: number, data: T) => Promise<any>;
  deleteOne: (id: number) => Promise<any>;
}
