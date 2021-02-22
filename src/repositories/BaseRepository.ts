import { IWrite } from "./interfaces/IWrite";
import { IRead } from "./interfaces/IRead";
import { DbService } from "../db/DbService";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  private readonly _db: any;

  constructor(
    collection: string
  ) {
    this._db = DbService.getInstance().get(collection);
  }

  create(item: T): boolean {

    return this._db.push(item).write();
  }

  find(): T[] {
    return this._db.value();
  }

  findOne(id: string): T {
    return this._db.find({ id: id }).value();
  }

  update(id: string, item: T): boolean {
    return this._db.find({ id: id}).assign(item).value();
  }
}
