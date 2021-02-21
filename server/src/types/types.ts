export interface IGame {
  id: string;
  name: string;
  playerOneId: string;
  playerTwoId: string;
  winner: string;
}

export interface IMove {
  id: string;
  gameId: string;
  move: number[];
  playerId: string;
}
