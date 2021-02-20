import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";

import { IRound } from "../../types";
import { RoundService } from "../../services/RoundService";
import { GameService } from "../../services/GameService";
import { MoveService } from "../../services/MoveService";
import Round from "../schemas/Round";


@Service()
@Resolver(Round)
export default class {
  constructor(
    private roundService: RoundService,
    private gameService: GameService,
    private moveService: MoveService
  ) {}

  @Query(returns => [Round])
  getRounds(): IRound[] {
    return this.roundService.get();
  }

  @Query(returns => [Round], { nullable: true })
  getRoundsForGame(@Arg("gameId") gameId: string): IRound[] | undefined {
    return this.roundService.getRoundsForGame(gameId);
  }

  @Mutation(returns => Round)
  markRoundAsCompleted(@Arg("roundId") roundId: string, @Arg("playerId") playerId: string): IRound {
    return this.roundService.markRoundAsCompleted(roundId, playerId);
  }

  @FieldResolver()
  game(@Root() round: IRound) {
    return this.gameService.findOne(round.gameId);
  }

  @FieldResolver()
  moves(@Root() round: IRound) {
    return this.moveService.getMovesForRound(round.id);
  }
}
