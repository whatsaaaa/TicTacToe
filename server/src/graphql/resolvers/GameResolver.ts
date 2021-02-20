import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Args } from "type-graphql";
import { Service } from "typedi";

import { rounds } from "../../data/data";
import { IGame } from "../../types";
import { GameService } from "../../services/GameService";
import { CreateNewGameArgs } from "../args";
import Game from "../schemas/Game";

@Service()
@Resolver(Game)
export default class {
  constructor(private gameService: GameService) {}

  @Query(returns => [Game])
  getGames(): IGame[] {
    return this.gameService.get();
  }

  @Query(returns => Game, { nullable: true })
  gameById(@Arg("id") id: string): IGame | undefined {
    return this.gameService.findOne(id);
  }

  @Mutation(returns => Game)
  createNewGame(@Arg("data") newGame: CreateNewGameArgs): IGame {
    return this.gameService.createNewGame(newGame.name, newGame.playerId);
  }

  @Mutation(returns => Game)
  joinGame(@Arg("gameId") gameId: string, @Arg("userId") userId: string) : IGame {
    return this.gameService.joinGame(gameId, userId);
  }

  @FieldResolver()
  rounds(@Root() game: IGame) {
    return rounds.filter(round => {
      return round.gameId === game.id;
    });
  }
}
