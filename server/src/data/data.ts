import {GameType, IGame, IMove} from "../types";

export const games: IGame[] = [
  {
    id: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    name: "Game 1",
    winner: "",
    type: GameType.MultiPlayer
  }
]

export const moves: IMove[] = [
  {
    player: "X",
    move: [1, 1],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    id: "2fb6c4f5-8352-404f-b6f1-4446194ee12e",
    board: [
      ['', '', ''],
      ['', 'X', ''],
      ['', '', '']
    ]
  },
  {
    player: "O",
    move: [1, 2],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    id: "772ebe82-f24f-4008-92a7-2ab3d78b3848",
    board: [
      ['', '', ''],
      ['', 'X', 'O'],
      ['', '', '']
    ]
  }
]
