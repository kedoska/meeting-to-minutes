import { AudioRepository, Audio } from "@mtm/domain";

export class AudioRepositoryImpl implements AudioRepository {
  async save(audio: Audio): Promise<void> {
    // Implementación de la lógica para guardar el audio
  }
}