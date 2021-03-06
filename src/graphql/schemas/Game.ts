import { Field, ID, ObjectType } from "type-graphql";
import Move from "./Move";

@ObjectType()
export default class Game {
  @Field(type => ID)
  id: string;

  @Field()
  playerX: string;

  @Field()
  playerO: string;

  @Field()
  type: string;

  @Field()
  winner: string;

  @Field(type => [Move])
  moves: Move[];
}
