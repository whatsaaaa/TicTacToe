export interface IRead<T> {
  find(): T[];
  findOne(id: string): T;
}
