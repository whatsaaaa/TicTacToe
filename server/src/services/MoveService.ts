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

  public getMovesForRound(roundId: string): IMove[] {
    this.log.info(`Get moves for round: ${roundId}`);
    return moves.filter(move => {
      return move.roundId === roundId;
    });
  }

  public makeMove(playerId: string, playerMove: number[], roundId: string): IMove {
    this.log.info(`Player: ${playerId} making move: ${playerMove}`);
    const newMove: IMove = {
      id: uuidv4(),
      playerId: playerId,
      roundId: roundId,
      move: playerMove
    }

    moves.push(newMove);
    return newMove;
  }
}
