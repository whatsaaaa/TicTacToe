import { Args, ArgsType, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import { v4 as uuidv4 } from 'uuid';
import { Service } from "typedi";

import { moves, rounds } from "../../data/data";
import { IMove } from "../../types";
import Move from "../schemas/Move";
import { Logger, LoggerInterface } from "../../logger/Logger";

@ArgsType()
class MakeMoveArgs {
  playerId: string;
  roundId: string;
  playerMove: number[];
}

@Service()
@Resolver(Move)
export default class {

  constructor(@Logger(__filename) private log: LoggerInterface) {
  }

  @Query(returns => [Move])
  getMoves(): IMove[] {
    this.log.info("Executing GraphQl Query [getMoves]");
    return moves;
  }

  @Mutation(returns => Move)
  makeMove(@Args() { playerId, playerMove, roundId }: MakeMoveArgs): IMove {
    const newMove: IMove =  {
      playerId: playerId,
      roundId: roundId,
      id: uuidv4(),
      move: playerMove
    }

    moves.push(newMove);
    return newMove;
  }

  @FieldResolver()
  round(@Root() move: IMove) {
    return rounds.find(round => {
      return round.id === move.roundId;
    });
  }
}
