import { Video } from '@core/domain';
import {
  AudioExtractionService,
  AudioTranscriptionService,
  MeetingProcessingService,
  MinutesRepositoryImpl,
  TextAnalysisService,
} from '@core/infra';
import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { join } from 'path';

type VideosRouterOptions = {
  basePath: string;
};

const createVideosRouter = ({ basePath }: VideosRouterOptions): Router => {
  const router = express.Router();

  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const extension = file.originalname.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}.${extension}`);
    },
  });
  
  const upload = multer({ storage });

  router.post(
    `${basePath}/videos`,
    upload.single('video'),
    async (req: Request, res: Response) => {
      const file = req.file;
      const filePath = join(file.path);

      const video: Video = {
        name: file.originalname,
        format: file.mimetype,
        path: filePath,
        id: file.filename,
      };

      console.log(`processing video ${video.name}`);

      const minutesRepository = new MinutesRepositoryImpl();

      const videoService = new MeetingProcessingService(
        minutesRepository,
        new AudioExtractionService(),
        new AudioTranscriptionService(),
        new TextAnalysisService()
      );

      const minute = await videoService.processMeeting(video);

      res.send(minute);
    }
  );

  return router;
};

export default createVideosRouter;
