import { Arg, Args, FieldResolver, Query, Resolver, Root, Mutation } from "type-graphql";
import { Service } from "typedi";

import { IGame } from "../../types";
import { GameService } from "../../services/GameService";
import { MoveService } from "../../services/MoveService";
import { CreateNewGameArgs } from "../args";
import Game from "../schemas/Game";

@Service()
@Resolver(Game)
export default class {
  constructor(
    private gameService: GameService,
    private moveService: MoveService
  ) {}

  @Query(returns => Game, { nullable: true })
  getGameById(@Arg("id") id: string): IGame | undefined {
    return this.gameService.findOne(id);
  }

  @Mutation(returns => Game)
  createNewGame(@Args() { name, gameType, playerId }: CreateNewGameArgs ): IGame {
    return this.gameService.createNewGame(name, playerId, gameType);
  }

  @Mutation(returns => Game)
  joinGame(@Arg("gameId") gameId: string, @Arg("userId") userId: string) : IGame {
    return this.gameService.joinGame(gameId, userId);
  }

  @FieldResolver()
  moves(@Root() game: IGame) {
    return this.moveService.getMovesForGame(game.id);
  }
}
