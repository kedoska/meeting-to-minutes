import { Audio } from '@core/domain';
import { createReadStream } from 'fs';
import { Configuration, OpenAIApi } from 'openai';

export class AudioTranscriptionService {
  async transcribe(audio: Audio): Promise<string> {

    const file = createReadStream(audio.path);

    const configuration = new Configuration({
      apiKey: process.env["OPENAI_API_KEY"],
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createTranscription(
      file as any,
      "whisper-1"
    );

    console.log(response.data.text)

    return response.data.text;
  }
} 