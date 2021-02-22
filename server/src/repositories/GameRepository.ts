import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { IGame } from "../types"

@Service()
export class GameRepository extends BaseRepository<IGame> {
}
