import { MinutesRepository, Minutes } from "@mtm/domain";

export class MinutesRepositoryImpl implements MinutesRepository {
  async save(minutes: Minutes): Promise<void> {
    // Implementación de la lógica para guardar las minutes
  }

  async get(id: string): Promise<Minutes> {
    return {
      id: id,
      name: 'Minutes name',
      content: 'Minutes content'
    }
  }
}