import { Field, ID, ObjectType } from "type-graphql";

import Game from "./Game";

@ObjectType()
export default class Move {
  @Field()
  index: number;

  @Field()
  player: string;

  @Field(type => [Number])
  move: number[];

  @Field(type => [[String]])
  board: string[][];

  @Field(type => Game)
  game: Game;
}
