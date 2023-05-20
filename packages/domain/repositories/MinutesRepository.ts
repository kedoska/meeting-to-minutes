import { Minutes } from "../entities/Minutes";

export interface MinutesRepository {
    save(minutes: Minutes): Promise<void>;
  }