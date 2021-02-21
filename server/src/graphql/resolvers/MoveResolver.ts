import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root, PubSub } from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { Service } from "typedi";

import { IMove } from "../../types";
import { MoveService } from "../../services/MoveService";
import { RoundService } from "../../services/RoundService";
import { MakeMoveArgs } from "../args";
import Move from "../schemas/Move";

@Service()
@Resolver(Move)
export default class {
  constructor(
    private moveService: MoveService,
    private roundService: RoundService
  ) {}

  @Query(returns => [Move])
  getMovesForRound(@Arg("roundId") roundId: string): IMove[] {
    return this.moveService.getMovesForRound(roundId);
  }

  @Mutation(returns => Move)
  async makeMove(@Args() { playerId, playerMove, roundId }: MakeMoveArgs, @PubSub() pubSub: PubSubEngine): Promise<IMove> {
    const newMove = this.moveService.makeMove(playerId, playerMove, roundId);
    await pubSub.publish("NEW_MOVE", newMove);
    return newMove;
  }

  @FieldResolver()
  round(@Root() move: IMove) {
    return this.roundService.findRound(move.roundId);
  }
}
