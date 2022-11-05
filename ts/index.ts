import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist/client'));

app.listen(port, (): void => {
  console.log(`Listening on port ${ port }`);
})

app.get('/', (req: Request, res: Response): void  => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

/// remove
import monk from 'monk';
import dotenv from 'dotenv';

dotenv.config();

const db = monk(process.env.MONGO_URL || '');

const urls = db.get('urls'); // add type and so on

console.log('MDBU', process.env.MONGO_URL);

//console.log('urls', urls);