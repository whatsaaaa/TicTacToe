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
    index: 1,
    player: "X",
    move: [1, 1],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    board: [
      ['', '', ''],
      ['', 'X', ''],
      ['', '', '']
    ]
  },
  {
    index: 2,
    player: "O",
    move: [1, 2],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    board: [
      ['', '', ''],
      ['', 'X', 'O'],
      ['', '', '']
    ]
  }
]
