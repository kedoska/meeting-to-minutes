import { VideoRepository, Video } from "@core/domain";

export class VideoRepositoryImpl implements VideoRepository {
  async save(video: Video): Promise<void> {
    // Implementación de la lógica para guardar el video
  }
}