import {Field, ID, ObjectType} from "type-graphql";
import Round from "./Round";

@ObjectType()
export default class Move {
  @Field(type => ID)
  id: string;

  @Field()
  playerId: string;

  @Field(type => [Number])
  move: number[];

  @Field(type => Round)
  round: Round;
}
