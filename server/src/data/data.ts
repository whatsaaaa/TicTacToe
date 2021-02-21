import { IGame, IMove } from "../types";

export const games: IGame[] = [
  {
    id: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    name: "Game 1",
    playerOneId: "a3259e7c-5462-407a-9dfc-554a7549a799",
    playerTwoId: "316d5155-107c-41b0-a97b-9ab46c0780b0",
    winner: ""
  }
]

export const moves: IMove[] = [
  {
    playerId: "a3259e7c-5462-407a-9dfc-554a7549a799",
    move: [1, 1],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    id: "2fb6c4f5-8352-404f-b6f1-4446194ee12e"
  },
  {
    playerId: "316d5155-107c-41b0-a97b-9ab46c0780b0",
    move: [1, 2],
    gameId: "f4925011-18c9-4e7d-ac68-ef6ca715fde0",
    id: "772ebe82-f24f-4008-92a7-2ab3d78b3848"
  }
]
