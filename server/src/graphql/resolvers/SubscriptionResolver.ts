import { Ctx, Resolver, Subscription, Root } from "type-graphql";
import { Service } from "typedi"

import { IGameEnded } from "../../types";

@Service()
@Resolver()
export default class SubscriptionResolver {
  @Subscription(type => String, {
    topics: "GAME_ENDED"
  })
  async liveResults(@Ctx() ctx: any, @Root() liveResult: IGameEnded): Promise<string> {
    const winner = liveResult.winner;
    const text = winner == "draw" ? "draw" : `${winner} won.`;
    return `Game ${liveResult.gameId} finished. Result is: ${text}. Board: ${JSON.stringify(liveResult.board)}`;
  }
}
