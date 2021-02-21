import { Service } from "typedi";

import { Logger, LoggerInterface } from "../logger/Logger";
import { TicTacToeService } from "./TicTacToeService";
import { GameService } from "./GameService";
import { BotService } from "./BotService";
import { moves } from "../data/data";
import { IMove, GameType } from "../types";

@Service()
export class MoveService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private ticTacToeService: TicTacToeService,
    private gameService: GameService,
    private botService: BotService
  ) {}

  private board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  private currentPlayer: string = "X";
  private index: number = 0;

  public getMovesForGame(gameId: string): IMove[] {
    this.log.info(`Get moves for game: ${gameId}`);
    return moves.filter(move => {
      return move.gameId === gameId;
    });
  }

  public makeMove(playerId: string, playerMove: number[], gameId: string): IMove {
    if (this.gameService.isGameCompleted(gameId)) {
      this.log.warn("Game already completed");
      throw new Error("GameAlreadyCompleted");
    }

    if (!this.ticTacToeService.isMoveValid(playerMove)) {
      this.log.warn("Invalid move");
      throw new Error("InvalidMove");
    }

    const lastMove = this.getLastMove(gameId);

    if (lastMove != null) {
      this.board = JSON.parse(JSON.stringify(lastMove.board));
      this.index = lastMove.index;
      this.setCurrentPlayer(lastMove.player);
    }

    this.log.info(`Player playing as: ${this.currentPlayer}`);

    if (!this.ticTacToeService.checkIfFieldIsPlayable(playerMove, this.board)) {
      this.log.warn("Invalid move. Field is already played.");
      throw new Error("InvalidMove");
    }

    this.board[playerMove[0]][playerMove[1]] = this.currentPlayer;

    let newMove: IMove = {
      index: ++this.index,
      gameId: gameId,
      player: this.currentPlayer,
      move: playerMove,
      board: this.board
    }

    moves.push(newMove);

    const result = this.ticTacToeService.checkIfGameIsWon(this.board);

    this.log.info("Result: ", result);

    if (result != null) {
      this.gameService.markGameAsCompleted(gameId, result);
      return newMove;
    }
    else {
      const gameType = this.gameService.getGameType(gameId);

      if (gameType == GameType.SinglePlayer) {
        this.setCurrentPlayer(this.currentPlayer);
        const computerMove = this.handleComputerMove();
        const result = this.ticTacToeService.checkIfGameIsWon(this.board);
        const newMove = this.saveComputerMove(gameId, computerMove);

        if (result != null) {
          this.gameService.markGameAsCompleted(gameId, result);
        }

        return newMove;
      } else {
        return newMove;
      }
    }
  }

  public handleComputerMove(): number[] {
    this.log.info(`Computer on a move as: ${this.currentPlayer}`);
    const computerMove = this.botService.botMove(this.board);
    this.board[computerMove[0]][computerMove[1]] = this.currentPlayer;
    return computerMove;
  }

  public saveComputerMove(gameId: string, computerMove: number[]): IMove {
    const move: IMove = {
      index: ++this.index,
      gameId: gameId,
      player: this.currentPlayer,
      move: computerMove,
      board: this.board
    }

    moves.push(move);
    return move;
  }

  private getLastMove(gameId: string): IMove {
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
