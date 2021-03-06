import { Service } from "typedi";

import { Logger, LoggerInterface } from "../logger/Logger";
import { TicTacToeService } from "./TicTacToeService";

@Service()
export class BotService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private ticTacToeService: TicTacToeService
  ) {}

  private computerPlayer = "O";
  private humanPlayer = "X";

  public botMove(board: string[][]): number[] {
    this.log.info(`Current board: ${JSON.stringify(board)}`);

    let bestScore = -Infinity;
    let bestMove: number[] = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = this.computerPlayer;
          const score = this.minimax(board, true);
          board[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
          }
        }
      }
    }

    return bestMove;
  }

  private minimax(board: string[][], isMaximizing: boolean): number {
    const result = this.ticTacToeService.checkIfGameIsWon(board);

    if (result != null) {
      if (result == "X") return -10;
      if (result == "O") return 10;
      return 0;
    }

    if (isMaximizing) {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = this.humanPlayer;
            const score = this.minimax(board,false);
            board[i][j] = "";
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = this.computerPlayer;
            const score = this.minimax(board,true);
            board[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  }
}
