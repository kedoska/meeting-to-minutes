import { Video } from "../entities/Video";

export interface MeetingProcessingService {
    processMeeting(video: Video): Promise<void>;
  }