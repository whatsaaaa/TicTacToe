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
      playerOneId: userId,
      type: type,
      playerTwoId: "",
      winner: ""
    }

    games.push(newGame);
    return newGame;
  }

  public joinGame(gameId: string, userId: string): IGame {
    this.log.info(`User [${userId}] joining game [${gameId}]`);
    const game = games.find(game => {
      return game.id === gameId
    });

    if (!game) {
      this.log.error(`Couldn't find the game with id ${gameId}`);
      throw new Error("GameNotFound");
    }

    if (game.playerTwoId !== "") {
      this.log.error(`Couldn't join a full game`);
      throw new Error("GameIsFull");
    }

    game.playerTwoId = userId;

    this.log.info(`User [${userId}] successfully joined game [${gameId}]`);
    return game;
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
