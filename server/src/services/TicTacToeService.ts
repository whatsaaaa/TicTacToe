import { Service } from "typedi";

import { Logger, LoggerInterface } from "../logger/Logger";

@Service()
export class TicTacToeService {
  constructor(
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public isMoveValid(move: number[]): boolean {
    this.log.info("Validating move");
    if (move[0] < 0 || move[0] > 2) return false;
    if (move[1] < 0 || move[1] > 2) return false;
    return true;
  }

  public checkIfFieldIsPlayable(move: number[], board: string[][]): boolean {
    this.log.info(`Checking if move is valid`);
    const row = board[move[0]];
    const cell = row[move[1]];
    return cell == "";
  }

  public checkIfGameIsWon(board: string[][]): boolean {
    this.log.info("Checking if game met any of the win conditions");
    if (this.handleHorizontalWins(board)) return true;
    if (this.handleVerticalWins(board)) return true;
    if (this.handleDiagonalWins(board)) return true;
    return false;
  }

  private handleHorizontalWins(board: string[][]): boolean {
    this.log.info("Checking for horizontal wins...");
    for (let i = 0; i < 3; i++) {
      if (this.checkEquality(board[i][0], board[i][1], board[i][2])) {
        return true;
      }
    }
    return false;
  }

  private handleVerticalWins(board: string[][]): boolean {
    this.log.info("Checking for vertical wins...");
    for (let i = 0; i < 3; i++) {
      if (this.checkEquality(board[0][i], board[1][i], board[2][i])) {
        return true;
      }
    }
    return false;
  }

  private handleDiagonalWins(board: string[][]): boolean {
    this.log.info("Checking for diagonal wins...");
    if (this.checkEquality(board[0][0], board[1][1], board[2][2])) {
      return true;
    }

    if (this.checkEquality(board[2][0], board[1][1], board[0][2])) {
      return true;
    }
    return false;
  }

  private checkEquality(a: string, b: string, c: string) {
    return a == b && b == c && a != "";
  }
}
