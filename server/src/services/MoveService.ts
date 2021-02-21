import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

import { Logger, LoggerInterface } from "../logger/Logger";
import { TicTacToeService } from "./TicTacToeService";
import { moves } from "../data/data";
import { IMove } from "../types";

@Service()
export class MoveService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private ticTacToeService: TicTacToeService
  ) {}

  private board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  private currentPlayer: string = "X";

  public getMovesForGame(gameId: string): IMove[] {
    this.log.info(`Get moves for game: ${gameId}`);
    return moves.filter(move => {
      return move.gameId === gameId;
    });
  }

  public makeMove(playerId: string, playerMove: number[], gameId: string): IMove {
    if (!this.ticTacToeService.isMoveValid(playerMove)) {
      this.log.warn("Invalid move");
      throw new Error("InvalidMove");
    }

    const lastMove = this.getLastMove(gameId);

    if (lastMove != null) {
      this.board = lastMove.board;
      this.setCurrentPlayer(lastMove.player);
    }

    if (!this.ticTacToeService.checkIfFieldIsPlayable(playerMove, this.board)) {
      this.log.warn("Invalid move. Field is already played.");
      throw new Error("InvalidMove");
    }

    this.board[playerMove[0]][playerMove[1]] = this.currentPlayer;

    const newMove: IMove = {
      id: uuidv4(),
      gameId: gameId,
      player: this.currentPlayer,
      move: playerMove,
      board: this.board
    }

    moves.push(newMove);

    if (this.ticTacToeService.checkIfGameIsWon(this.board)) {
      this.log.info("Game won");
    } else {
      this.log.info("Keep playing");
    }

    return newMove;
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
