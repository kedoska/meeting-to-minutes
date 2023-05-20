import { writeFile, readFile} from "fs/promises";
import { Minutes, MinutesRepository } from "@core/domain";

export class MinutesRepositoryImpl implements MinutesRepository {
  async save(minutes: Minutes): Promise<void> {
    const filePath = minutes.path.replace('.mp4', '.txt');
    await writeFile(filePath, minutes.content);
  }
}