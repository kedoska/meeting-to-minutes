import { Minutes, MinutesRepository, Video } from '@core/domain';
import { AudioExtractionService } from './AudioExtractionService';
import { AudioTranscriptionService } from './AudioTranscriptionService';
import { TextAnalysisService } from './TextAnalysisService';

export class MeetingProcessingService implements MeetingProcessingService {
  constructor(
    private minutesRepository: MinutesRepository,

    private audioExtractionService: AudioExtractionService,
    private audioTranscriptionService: AudioTranscriptionService,
    private textAnalysisService: TextAnalysisService
  ) {}

  async processMeeting(video: Video): Promise<Minutes> {

    console.log(`[ffmpeg] extracting audio from video ${video.name}`)

    const audio = await this.audioExtractionService.extract(video);

    console.log(`[Whisper] transcribing audio from video ${audio.name}`)

    const transcription = await this.audioTranscriptionService.transcribe(audio);

    console.log(`[DaVinci] analyzing text from video ${audio.name}`)

    const analyzedText = await this.textAnalysisService.analyze(transcription);

    console.log(`saving minutes from video ${audio.name}`)

    const minutes: Minutes = { id: video.id, path: video.path, content: analyzedText }

    await this.minutesRepository.save(minutes);

    return minutes;
  }
}
