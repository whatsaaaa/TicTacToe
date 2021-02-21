export interface IGame {
  id: string;
  name: string;
  playerOneId: string;
  playerTwoId: string;
  winner: string;
  type: string;
}

export interface IMove {
  id: string;
  gameId: string;
  move: number[];
  playerId: string;
}

export enum GameType {
  SinglePlayer = "singleplayer",
  MultiPlayer = "multiplayer"
}
