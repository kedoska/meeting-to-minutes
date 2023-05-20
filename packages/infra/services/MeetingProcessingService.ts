import { AudioRepository, MinutesRepository, Video } from '@mtm/domain';
import { AudioExtractionService } from './AudioExtractionService';
import { AudioTranscriptionService } from './AudioTranscriptionService';
import { TextAnalysisService } from './TextAnalysisService';

export class MeetingProcessingService implements MeetingProcessingService {
  constructor(
    private audioRepository: AudioRepository,
    private minutesRepository: MinutesRepository,

    private audioExtractionService: AudioExtractionService,
    private audioTranscriptionService: AudioTranscriptionService,
    private textAnalysisService: TextAnalysisService
  ) {}

  async processMeeting(video: Video): Promise<void> {

    const audio = await this.audioExtractionService.extract(video);

    await this.audioRepository.save(audio);

    const transcription = await this.audioTranscriptionService.transcribe(audio);

    const analyzedText = await this.textAnalysisService.analyze(transcription);

    await this.minutesRepository.save({ id: video.id, name: video.name, content: analyzedText });
  }
}
