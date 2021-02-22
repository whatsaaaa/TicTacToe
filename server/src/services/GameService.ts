import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

import { Logger, LoggerInterface } from "../logger/Logger";
import { RepositoryResolver } from "../container/RepositoryResolver";
import { GameRepository } from "../repositories/GameRepository";
import { GameType, IGame } from "../types";

@Service()
export class GameService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    @RepositoryResolver("games") private _gameRepository: GameRepository
  ) {}

  public findOne(id: string): IGame | undefined {
    this.log.info(`Find game with an id: [${id}]`);
    return this._gameRepository.findOne(id);
  }

  public createNewGame(username: string, gameType: string): IGame {
    this.log.info("Create new game");

    const type = this.validateGameType(gameType);

    const newGame: IGame = {
      id: uuidv4(),
      playerX: username,
      type: type,
      playerO: "",
      winner: ""
    }

    if (type == GameType.SinglePlayer) {
      newGame.playerO = "ComputerAi";
    }

    this._gameRepository.create(newGame);

    return newGame;
  }

  public joinGame(gameId: string, username: string): IGame {
    this.log.info(`User [${username}] joining game [${gameId}]`);

    const game = this._gameRepository.findOne(gameId);

    if (!game) {
      this.log.error(`Couldn't find the game with id ${gameId}`);
      throw new Error("GameNotFound");
    }

    if (game.playerO != "") {
      this.log.warn(`Game ${gameId} already full`);
      throw new Error("GameIsFull");
    }

    game.playerO = username;

    this._gameRepository.update(gameId, game);

    this.log.info(`User [${username}] successfully joined game [${gameId}]`);
    return game;
  }

  public getGameType(gameId: string): string {
    this.log.info(`Get game type for game: ${gameId}`);

    const game = this._gameRepository.findOne(gameId);

    if (!game) {
      this.log.warn("Failed to find game");
      throw new Error("GameNotFound");
    }

    return game.type;
  }

  public markGameAsCompleted(gameId: string, winner: string): void {
    this.log.info(`Player ${winner} won the game ${gameId}`);

    const game = this._gameRepository.findOne(gameId);

    if (!game) {
      throw new Error("GameNotFound");
    }

    game.winner = winner;

    this._gameRepository.update(gameId, game);
  }

  public isGameCompleted(gameId: string): boolean {
    const game = this._gameRepository.findOne(gameId);

    if (!game) {
      throw new Error("GameNotFound");
    }

    return game.winner != "";
  }

  public isGameStarted(gameId: string): boolean {
    const game = this._gameRepository.findOne(gameId);

    if (!game) {
      throw new Error("GameNotFound");
    }

    return game.playerX != "" && game.playerO != "";
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
