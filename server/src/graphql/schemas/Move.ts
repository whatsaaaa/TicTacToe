import { Field, ID, ObjectType } from "type-graphql";

import Game from "./Game";

@ObjectType()
export default class Move {
  @Field(type => ID)
  id: string;

  @Field()
  playerId: string;

  @Field(type => [Number])
  move: number[];

  @Field(type => Game)
  game: Game;
}
