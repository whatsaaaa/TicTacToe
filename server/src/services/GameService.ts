import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

import { Logger, LoggerInterface } from "../logger/Logger";
import { games } from "../data/data";
import { GameType, IGame } from "../types";

@Service()
export class GameService {
  constructor(
    @Logger(__filename) private log: LoggerInterface
  ) {}
  public findOne(id: string): IGame | undefined {
    this.log.info(`Find game with an id: [${id}]`);
    return games.find(game => game.id === id);
  }

  public createNewGame(name: string, userId: string, gameType: string): IGame {
    this.log.info("Create new game");

    const type = this.validateGameType(gameType);

    const newGame: IGame = {
      id: uuidv4(),
      name: name,
      type: type,
      winner: ""
    }

    games.push(newGame);
    return newGame;
  }

  public joinGame(gameId: string, userId: string): IGame {
    this.log.info(`User [${userId}] joining game [${gameId}]`);
    const game = games.find(game => {
      return game.id == gameId
    });

    if (!game) {
      this.log.error(`Couldn't find the game with id ${gameId}`);
      throw new Error("GameNotFound");
    }

    this.log.info(`User [${userId}] successfully joined game [${gameId}]`);
    return game;
  }

  public getGameType(gameId: string): string {
    this.log.info(`Get game type for game: ${gameId}`);
    const game = games.find(game => {
      return game.id == gameId;
    });

    if (!game) {
      this.log.warn("Failed to find game");
      throw new Error("GameNotFound");
    }

    return game.type;
  }

  public markGameAsWon(gameId: string, winner: string): void {
    this.log.info(`Player ${winner} won the game ${gameId}`);
    const game = games.find(game => {
      return game.id == gameId;
    });

    if (!game) {
      throw new Error("GameNotFound");
    }

    game.winner = winner;
  }

  public isGameCompleted(gameId: string): boolean {
    const game = games.find(game => {
      return game.id == gameId;
    });

    if (!game) {
      throw new Error("GameNotFound");
    }

    return game.winner != "";
  }

  private validateGameType(gameType: string): string {
    this.log.info("Validating game type");

    if (!(<any>Object.values(GameType)).includes(gameType)) {
      this.log.warn(`Invalid game type: ${gameType}`);
      throw new Error("InvalidGameType");
    }

    return gameType;
  }
}
