import { Video, Audio } from '@core/domain';
import * as FfmpegCommand from 'fluent-ffmpeg';

export class AudioExtractionService {
  async extract(video: Video): Promise<Audio> {
    const audio: Audio = {
      id: video.id,
      name: video.name,
      path: video.path.replace('.mp4', '.mp3'),
    };

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      FfmpegCommand(video.path)
        .output(audio.path)
        .on('end', function () {
          resolve(audio);
        })
        .on('error', function (err: any) {
          reject(err);
        })
        .run();
    });
  }
}
