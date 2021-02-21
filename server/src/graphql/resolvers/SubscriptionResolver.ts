import { Ctx, Resolver, Subscription } from "type-graphql";
import { Service } from "typedi"

@Service()
@Resolver()
export default class SubscriptionResolver {
  @Subscription(() => String, {
    topics: "NEW_MOVE"
  })
  async subscription(@Ctx() ctx: any): Promise<any> {
    console.log("Hello, World from subscription");
    return "subscription!";
  }
}
