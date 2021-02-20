import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { games, rounds } from "../../data/data";
import { IGame } from "../../types";
import Game from "../schemas/Game";

@Resolver(Game)
export default class {
  @Query(returns => Game, { nullable: true })
  gameById(@Arg("id") id: string): IGame | undefined {
    return games.find(game => game.id === id);
  }

  @FieldResolver()
  rounds(@Root() game: IGame) {
    return rounds.filter(round => {
      return round.gameId === game.id;
    });
  }
}
