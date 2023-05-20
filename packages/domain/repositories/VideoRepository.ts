import { Video } from '../entities/Video';

export interface VideoRepository {
  save(video: Video): Promise<void>;
}
