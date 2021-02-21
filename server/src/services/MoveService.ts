import { Service } from "typedi";

import { Logger, LoggerInterface } from "../logger/Logger";
import { TicTacToeService } from "./TicTacToeService";
import { GameService } from "./GameService";
import { moves } from "../data/data";
import { IMove, GameType } from "../types";

@Service()
export class MoveService {
  constructor(
    @Logger(__filename) private log: LoggerInterface,
    private ticTacToeService: TicTacToeService,
    private gameService: GameService
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
      this.board = lastMove.board;
      this.index = lastMove.index;
      this.setCurrentPlayer(lastMove.player);
    }

    if (!this.ticTacToeService.checkIfFieldIsPlayable(playerMove, this.board)) {
      this.log.warn("Invalid move. Field is already played.");
      throw new Error("InvalidMove");
    }

    this.board[playerMove[0]][playerMove[1]] = this.currentPlayer;

    const newMove: IMove = {
      index: ++this.index,
      gameId: gameId,
      player: this.currentPlayer,
      move: playerMove,
      board: this.board
    }

    moves.push(newMove);

    if (this.ticTacToeService.checkIfGameIsWon(this.board)) {
      this.gameService.markGameAsWon(gameId, this.currentPlayer);
    } else {
      const gameType = this.gameService.getGameType(gameId);
      if (gameType == GameType.SinglePlayer) {
        this.log.info(`Bot on move`);
      }
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
