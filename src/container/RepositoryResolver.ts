import { Container } from "typedi";

import { BaseRepository } from "../repositories/BaseRepository";
import { GameRepository } from "../repositories/GameRepository";
import { MoveRepository } from "../repositories/MoveRepository";

export function RepositoryResolver(collection: string): ParameterDecorator {
  return (object: any, propertyKey: string | symbol, index: number): any => {
    let repository: BaseRepository<any>;

    switch (collection) {
      case "games":
        repository = new GameRepository(collection);
        break;
      case "moves":
        repository = new MoveRepository(collection);
        break;
      default:
        throw new Error("Invalid repository type");
    }

    const propertyName = propertyKey ? propertyKey.toString() : "";

    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => repository
    });
  };
}
