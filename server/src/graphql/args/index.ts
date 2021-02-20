import { ArgsType, Field, InputType } from "type-graphql";

@InputType({ description: "New game data" })
export class CreateNewGameArgs {
  @Field()
  name: string;

  @Field()
  playerId: string;
}

@ArgsType()
export class MakeMoveArgs {
  @Field()
  playerId: string;

  @Field()
  roundId: string;

  @Field(type => [Number])
  playerMove: number[];
}
