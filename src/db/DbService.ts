import lowdb from "lowdb";
import { default as FileSync } from "lowdb/adapters/FileSync";
import { Service } from "typedi";

@Service()
export class DbService {
  private static instance: lowdb.LowdbSync<any>;

  private constructor() {}

  public static getInstance(): lowdb.LowdbSync<any> {
    if (!DbService.instance) {
      const adapter = new FileSync("db.json");
      DbService.instance = lowdb(adapter);
    }

    return DbService.instance;
  }
}
