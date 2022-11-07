import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import monk from 'monk';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist/client'));

// DB connect (urlShortener)
dotenv.config();
const db = monk(process.env.MONGO_URL || '');
const urls = db.get('urls');

// Routing
app.get('/', (req: Request, res: Response): void  => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.get('/test', (req: Request, res: Response): void  => {
  res.set('Content-Type', 'text/html');  
  res.write('test');
  urls.insert({ url: 'https://yahoo.com', short: 'ksdhf' })
});

// Server init 
app.listen(port, (): void => {
  console.log(`Listening on port ${ port }`);
})