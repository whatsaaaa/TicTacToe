export interface IGame {
  id: string;
  playerX: string;
  playerO: string;
  winner: string;
  type: string;
}

export interface IMove {
  index: number;
  gameId: string;
  move: number[];
  board: string[][];
  player: string;
}

export interface IGameEnded {
  gameId: string;
  winner: string;
  board: string;
}

export enum GameType {
  SinglePlayer = "singleplayer",
  MultiPlayer = "multiplayer"
}
