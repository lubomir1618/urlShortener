import express, { Request, Response} from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist/client'));

// app.get('/', (req: Request, res: Response): void => {
//   res.send(`Hello World! ${ __dirname } ${ port }`);
// })

app.listen(port, (): void => {
  console.log(`Listening on port ${ port }`);
})

app.get('/', (req: Request, res: Response): void  => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});