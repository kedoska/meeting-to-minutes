import { Audio } from '../entities/Audio';

export interface AudioRepository {
  save(audio: Audio): Promise<void>;
}
