import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { games, rounds, moves } from "../../data/data";
import { IRound } from "../../types";
import Round from "../schemas/Round";

@Resolver(Round)
export default class {
  @Query(returns => [Round])
  getRounds(): IRound[] {
    return rounds;
  }

  @Query(returns => [Round], { nullable: true })
  getRoundsForGame(@Arg("gameId") gameId: string): IRound[] | undefined {
    return rounds.filter(round => {
      return round.gameId === gameId
    });
  }

  @Mutation(returns => Round)
  markAsCompleted(@Arg("roundId") roundId: string, @Arg("playerId") playerId: string): IRound {
    const round = rounds.find(round => {
      return round.id === roundId;
    });

    if (!round) {
      throw new Error(`Couldn't find the round with id ${roundId}.`);
    }

    if (round.winner !== "") {
      throw new Error(`Round with id ${roundId} is already completed.`);
    }

    round.winner = playerId;
    return round;
  }

  @FieldResolver()
  game(@Root() round: IRound) {
    return games.find(game => {
      return game.id === round.gameId;
    });
  }

  @FieldResolver()
  moves(@Root() round: IRound) {
    return moves.filter(move => {
      return move.roundId === round.id;
    });
  }
}
