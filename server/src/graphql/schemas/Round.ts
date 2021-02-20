import {Field, ID, ObjectType} from "type-graphql";
import Game from "./Game";
import Move from "./Move";

@ObjectType()
export default class Round {
  @Field(type => ID)
  id: string;

  @Field()
  winner: string;

  @Field(type => Game)
  game: Game;

  @Field(type => [Move])
  moves: Move[];
}
