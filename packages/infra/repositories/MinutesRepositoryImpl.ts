import { MinutesRepository, Minutes } from "@mtm/domain";

export class MinutesRepositoryImpl implements MinutesRepository {
  async save(minutes: Minutes): Promise<void> {
    // Implementación de la lógica para guardar las minutes
  }
}