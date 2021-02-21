import { Field, ID, ObjectType } from "type-graphql";
import Round from "./Round";

@ObjectType()
export default class Game {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  playerOneId: string;

  @Field()
  playerTwoId: string;

  @Field(type => [Round])
  rounds: Round[];
}
