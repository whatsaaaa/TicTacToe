import { Args, FieldResolver, Mutation, Resolver, Root, PubSub } from "type-graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { Service } from "typedi";

import { IMove } from "../../types";
import { MoveService } from "../../services/MoveService";
import { GameService } from "../../services/GameService";
import { MakeMoveArgs } from "../args";
import Move from "../schemas/Move";

@Service()
@Resolver(Move)
export default class {
  constructor(
    private moveService: MoveService,
    private gameService: GameService
  ) {}

  @Mutation(returns => Move)
  async makeMove(@Args() { playerId, playerMove, roundId }: MakeMoveArgs, @PubSub() pubSub: PubSubEngine): Promise<IMove> {
    const newMove = this.moveService.makeMove(playerId, playerMove, roundId);
    await pubSub.publish("NEW_MOVE", newMove);
    return newMove;
  }

  @FieldResolver()
  game(@Root() move: IMove) {
    return this.gameService.findOne(move.gameId);
  }
}
