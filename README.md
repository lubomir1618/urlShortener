# URL Shortener
Internet address shortening tool.
Allows to specify own link or it is generated automatically.

Client part is written in  Typescript. Server part is Node.js and uses Express framework.


## Develop

 - **build app**: `npm run build`
 - **start in dev watch mode**: `npm run dev`
 - **start**: `npm run start`

## Deploy
 - `dist` directory contains all files needed for server hosting. Server requires nodejs hosting environment.
 - to change mongodb url you need specify it in `.env` as `MONGO_URL` or it should be set as config variable.

## Launching
App is temporary located at Heroku.

### Live

 1. app url `https://kratko.herokuapp.com/`
 3. DB url `mongodb+srv://<login>:<password>@cluster0.8sxhu.mongodb.net/urlShortener`

### Locally
 1. build & start server
 2. local app `http://localhost:3000/`
