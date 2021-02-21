import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

import { Logger, LoggerInterface } from "../logger/Logger";
import { moves } from "../data/data";
import { IMove } from "../types";

@Service()
export class MoveService {
  constructor(
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public getMovesForGame(gameId: string): IMove[] {
    this.log.info(`Get moves for game: ${gameId}`);
    return moves.filter(move => {
      return move.gameId === gameId;
    });
  }

  public makeMove(playerId: string, playerMove: number[], gameId: string): IMove {
    this.log.info(`Player: ${playerId} making move: ${playerMove}`);
    const newMove: IMove = {
      id: uuidv4(),
      playerId: playerId,
      gameId: gameId,
      move: playerMove
    }

    moves.push(newMove);
    return newMove;
  }
}
