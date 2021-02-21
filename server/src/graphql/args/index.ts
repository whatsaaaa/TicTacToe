import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateNewGameArgs {
  @Field()
  name: string;

  @Field()
  playerId: string;

  @Field()
  gameType: string;
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
