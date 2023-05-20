import express from 'express';
import multer from 'multer';
import path from 'path';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload-video', upload.single('video'), (req, res) => {
  const file = req.file;
  const filePath = path.join(__dirname, file.path);
  // Do something with the file, like save it to the server disk
  res.send('File uploaded successfully');
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
