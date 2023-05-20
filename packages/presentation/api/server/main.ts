import express from 'express';
import createVideosRouter from '../routes/videos';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(createVideosRouter({
  basePath: 'api/v1/',
}));


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
