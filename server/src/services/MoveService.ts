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
    if (!this.isMoveValid(playerMove)) {
      this.log.warn("Invalid move");
      throw new Error("InvalidMove");
    }

    const lastMove = this.getLastMove(gameId);

    if (lastMove != null) {
      this.board = lastMove.board;
      this.setCurrentPlayer(lastMove.player);
    }

    if (!this.checkIfFieldIsPlayable(playerMove, this.board)) {
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

    if (this.checkIfGameIsWon()) {
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

  private isMoveValid(move: number[]): boolean {
    if (move[0] < 0 || move[0] > 2) return false;
    if (move[1] < 0 || move[1] > 2) return false;
    return true;
  }

  private checkIfFieldIsPlayable(move: number[], board: string[][]): boolean {
    this.log.info(`Checking if move is valid`);
    const row = board[move[0]];
    const cell = row[move[1]];
    return cell == "";
  }

  private setCurrentPlayer(lastMovePlayer: string): void {
    if (lastMovePlayer == "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }

  private checkIfGameIsWon(): boolean {
    for (let i = 0; i < 3; i++) {
      if (this.checkEquality(this.board[i][0], this.board[i][1], this.board[i][2])) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (this.checkEquality(this.board[0][i], this.board[1][i], this.board[2][i])) {
        return true;
      }
    }

    if (this.checkEquality(this.board[0][0], this.board[1][1], this.board[2][2])) {
      return true;
    }

    if (this.checkEquality(this.board[2][0], this.board[1][1], this.board[0][2])) {
      return true;
    }

    return false;
  }

  private checkEquality(a: string, b: string, c: string) {
    return a == b && b == c && a != "";
  }
}
