import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { join } from 'path';

type VideosRouterOptions = {
  basePath: string;
};

const createVideosRouter = ({ basePath }: VideosRouterOptions): Router => {
  const router = express.Router();

  const upload = multer({ dest: 'uploads/' });

  router.get(`${basePath}/videos`, upload.single('video'), (req: Request, res: Response) => {
    const file = req.file;
    const filePath = join(__dirname, file.path);

    res.send('File uploaded successfully');
  });

  return router;
};

export default createVideosRouter;