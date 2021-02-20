import {Arg, Args, ArgsType, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
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
  makeMove(@Args() { playerId, playerMove, roundId }: MakeMoveArgs): IMove {
    return this.moveService.makeMove(playerId, playerMove, roundId);
  }

  @FieldResolver()
  round(@Root() move: IMove) {
    return this.roundService.findRound(move.roundId);
  }
}
