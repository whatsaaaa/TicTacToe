import { Service } from "typedi";

import { Logger, LoggerInterface } from "../logger/Logger";
import { TicTacToeService } from "./TicTacToeService";
import { GameService } from "./GameService";
import { BotService } from "./BotService";
import { RepositoryResolver } from "../container/RepositoryResolver";
import { MoveRepository } from "../repositories/MoveRepository";
import { GameType, IMove } from "../types";

@Service()
export class MoveService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    @RepositoryResolver("moves") private _moveRepository: MoveRepository,
    private ticTacToeService: TicTacToeService,
    private gameService: GameService,
    private botService: BotService
  ) {}

  private board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  private currentPlayer = "X";
  private index = 0;

  public getMovesForGame(gameId: string): IMove[] {
    this.log.info(`Get moves for game: ${gameId}`);
    return this._moveRepository.getMovesForGame(gameId);
  }

  public makeMove(gameId: string, playerMove: number[]): IMove {
    this.validateGameMove(gameId, playerMove);

    const lastMove = this.getLastMove(gameId);

    // If it's not the first move of the game
    if (lastMove) {
      this.board = JSON.parse(JSON.stringify(lastMove.board));
      this.index = lastMove.index;
      this.setCurrentPlayer(lastMove.player);
    } else {
      this.setCurrentPlayer("O");
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }

    this.log.info(`Player playing as: ${this.currentPlayer}`);

    if (!this.ticTacToeService.checkIfFieldIsPlayable(playerMove, this.board)) {
      this.log.warn("Invalid move. Field is already played.");
      throw new Error("InvalidMove");
    }

    this.board[playerMove[0]][playerMove[1]] = this.currentPlayer;

    const newMove = this.saveMove(gameId, playerMove);
    const completed = this.markGameAsCompletedIfWinConditionIsMet(gameId);
    const gameType = this.gameService.getGameType(gameId);

    if (gameType == GameType.SinglePlayer) {
      if (!completed) {
        return this.handleComputerMove(gameId);
      }
    }
    return newMove;
  }

  private validateGameMove(gameId: string, playerMove: number[]): void {
    if (this.gameService.isGameCompleted(gameId)) {
      this.log.warn("Game already completed");
      throw new Error("GameAlreadyCompleted");
    }

    if (!this.gameService.isGameStarted(gameId)) {
      this.log.warn("You can not make moves before both player join the game.");
      throw new Error("GameNotStarted");
    }

    if (!this.ticTacToeService.isMoveValid(playerMove)) {
      this.log.warn("Invalid move");
      throw new Error("InvalidMove");
    }
  }

  private markGameAsCompletedIfWinConditionIsMet(gameId: string): boolean {
    const result = this.ticTacToeService.checkIfGameIsWon(this.board);

    if (result != null) {
      this.gameService.markGameAsCompleted(gameId, result);
      return true;
    }

    return false;
  }

  private handleComputerMove(gameId: string): IMove {
    this.setCurrentPlayer(this.currentPlayer);

    const computerMove = this.botService.botMove(this.board);

    this.board = JSON.parse(JSON.stringify(this.board));
    this.board[computerMove[0]][computerMove[1]] = this.currentPlayer;

    const savedComputerMove = this.saveMove(gameId, computerMove);

    this.markGameAsCompletedIfWinConditionIsMet(gameId);

    return savedComputerMove;
  }

  private saveMove(gameId: string, computerMove: number[]): IMove {
    const move: IMove = {
      index: ++this.index,
      gameId: gameId,
      player: this.currentPlayer,
      move: computerMove,
      board: this.board
    }

    this._moveRepository.create(move);
    return move;
  }

  private getLastMove(gameId: string): IMove {
    const moves = this._moveRepository.find();
    const allMoves = moves.filter(move => {
      return move.gameId === gameId;
    });

    return allMoves[allMoves.length - 1];
  }

  private setCurrentPlayer(lastMovePlayer: string): void {
    if (lastMovePlayer == "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }
}
