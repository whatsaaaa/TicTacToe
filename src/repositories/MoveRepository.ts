import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { IMove } from "../types";

@Service()
export class MoveRepository extends BaseRepository<IMove> {
  public getMovesForGame(gameId: string): IMove[] {
    const moves = this.find();

    return moves.filter(move => {
      return move.gameId == gameId;
    });
  }
}
