import {Field, InputType} from "type-graphql";

@InputType({ description: "New game data" })
export class CreateNewGameArgs {
  @Field()
  name: string;

  @Field()
  playerId: string;
}
