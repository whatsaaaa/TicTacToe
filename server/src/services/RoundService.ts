import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

import { Logger, LoggerInterface } from "../logger/Logger";
import { rounds } from "../data/data";
import { IRound } from "../types";

@Service()
export class RoundService {
  constructor(
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public get(): IRound[] {
    this.log.info("Get all rounds");
    return rounds;
  }

  public findRound(roundId: string): IRound | undefined {
    this.log.info(`Finding round: ${roundId}`);
    return rounds.find(round => {
      return round.id === roundId;
    });
  }

  public getRoundsForGame(gameId: string): IRound[] | undefined {
    this.log.info(`Find rounds for game: ${gameId}`);
    return rounds.filter(round => {
      return round.gameId === gameId;
    });
  }

  public startNewRound(gameId: string): IRound {
    this.log.info("Starting new round");

    const round: IRound = {
      id: uuidv4(),
      winner: "",
      gameId: gameId
    }

    rounds.push(round);

    return round;
  }

  public markRoundAsCompleted(roundId: string, playerId: string): IRound {
    this.log.info(`Marking round: ${roundId} as completed. Player ${playerId} won.`);

    const round = rounds.find(round => {
      return round.id === roundId;
    });

    if (!round) {
      this.log.error(`Couldn't find the round with id ${roundId}`);
      throw new Error("RoundNotFound");
    }

    if (round.winner !== "") {
      this.log.warn(`Round with id ${roundId} is already completed`);
      throw new Error("RoundAlreadyCompleted");
    }

    round.winner = playerId;
    return round;
  }
}
