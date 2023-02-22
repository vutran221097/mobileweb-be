import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan';
import * as dotenv from 'dotenv'
dotenv.config()

import db from './src/models'
import routes from './src/routes/index.routes'

const uri = 'mongodb://127.0.0.1:27017/metruyen';

db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to the MongoDB!");
  })
  .catch(err => {
    console.log("Cannot connect to the MongoDB!", err);
    process.exit();
  });


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


//set secret
app.set('Secret', process.env.SECRET);


app.get('/', function (req, res) {
  res.send('Hello darkness my old friendsss..')
})

//routes
app.use(routes);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


export default server;