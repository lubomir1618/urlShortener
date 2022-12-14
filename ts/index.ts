import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import monk from 'monk';
import dotenv from 'dotenv';
import randomstring from 'randomstring';
import validUrl from 'valid-url';

const app = express();
const port = process.env.PORT || 3000;
const notFound = path.resolve(__dirname, 'client', '404.html');

app.use(cors());
app.use(express.json());
app.use(express.static('dist/client'));

// DB connect (urlShortener)
dotenv.config();
const db = monk(process.env.MONGO_URL || '');
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

// Routing
app.get('/', (req: Request, res: Response): void  => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.get('/pages/:id', (req: Request, res: Response): void  => {
  const { id: page }  = req.params;
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', `${page}.html`));
});

// adding new url
app.post('/url', async (req: Request, res: Response) => {
  let { url, slug } = req.body;
  if (!slug) {  
    slug = randomstring.generate(6).toLowerCase();
  } 
  const query = {
    url,
    slug,
    visits: 0,
    date: new Date().getTime()
  };

  if (validUrl.isUri(url)) {
    const newURL = await urls.insert(query);
    res.json({ newURL });
  } else {
    res.json({});
  }
});

// find out if slug exists
app.post('/slug', async (req: Request, res: Response ) => {
  const { slug } = req.body;
  try {
    const result = await urls.findOne({ slug });
    if (result) {
      return res.json({result: true});
    }

    return res.json({result: false});
  } catch (error) {

    return res.json({result: false});
  }
});

// getting all urls
app.post('/statistics', async (req: Request, res: Response) => {
  urls
  .find({}, {sort: {visits: -1}, limit: 100})
  .then((data) => res.json(data))
  .catch((err) => res.status(404)); 
});

// redirect to url
app.get('/:id', async (req: Request, res: Response) => {
  const { id: slug }  = req.params;
  try {
    const result = await urls.findOneAndUpdate({ slug }, { $inc: { visits: + 1 } });
    if (result) {
      return res.redirect(result.url);
    }

    return res.status(404).sendFile(notFound);
  } catch (error) {

    return res.status(404).sendFile(notFound);
  }
});

// Server init 
app.listen(port, (): void => {
  console.log(`Listening on port ${ port }`);
});
