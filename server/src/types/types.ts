export interface IGame {
  id: string;
  name: string;
  winner: string;
  type: string;
}

export interface IMove {
  id: string;
  gameId: string;
  move: number[];
  board: string[][];
  player: string;
}

export enum GameType {
  SinglePlayer = "singleplayer",
  MultiPlayer = "multiplayer"
}
