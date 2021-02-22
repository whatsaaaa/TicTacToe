import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateNewGameArgs {
  @Field()
  username: string;

  @Field()
  gameType: string;
}

@ArgsType()
export class MakeMoveArgs {
  @Field()
  gameId: string;

  @Field(type => [Number])
  playerMove: number[];
}
