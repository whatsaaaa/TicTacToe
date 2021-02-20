export interface IGame {
  id: string;
  name: string;
  playerOneId: string;
  playerTwoId: string;
}

export interface IRound {
  id: string;
  winner: string;
  gameId: string;
}

export interface IMove {
  id: string;
  playerId: string;
  move: number[];
  roundId: string;
}
