import { Video } from '@mtm/domain';
import { MeetingProcessingService, AudioRepositoryImpl, MinutesRepositoryImpl, AudioExtractionService, AudioTranscriptionService, TextAnalysisService } from '@mtm/infra';
import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { join } from 'path';

type VideosRouterOptions = {
  basePath: string;
};

const createVideosRouter = ({ basePath }: VideosRouterOptions): Router => {
  const router = express.Router();

  const upload = multer({ dest:  'uploads/' });

  router.post(`${basePath}/videos`, upload.single('video'), async (req: Request, res: Response) => {
    const file = req.file;
    const filePath = join(__dirname, file.path);
    
    const video: Video = {
      name: file.originalname,
      format: file.mimetype,
      path: filePath,
      id: file.filename
    }

    console.log(video);

    const minutesRepository = new MinutesRepositoryImpl();

    const videoService = new MeetingProcessingService(
      new AudioRepositoryImpl(),
      minutesRepository,
      new AudioExtractionService(),
      new AudioTranscriptionService(),
      new TextAnalysisService()
    );

    await videoService.processMeeting(video);
    const minute = await minutesRepository.get(video.id);

    res.send({minute});
  });

  return router;
};

export default createVideosRouter;