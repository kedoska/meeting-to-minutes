import { Audio } from "@core/domain";

export class AudioTranscriptionService {
  async transcribe(audio: Audio): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
