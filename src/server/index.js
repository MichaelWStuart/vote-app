import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

//eslint-disable-next-line
if (!isProd) require('dotenv').load();
const mongodb = `mongodb://${process.env.UNAME}:${process.env.PASS}@${process.env.LOC}:${process.env.MDBPORT}/vote-app`;
//eslint-disable-next-line
mongoose.connect(mongodb, err => console.log(err));

const userSchema = new mongoose.Schema({ username: String, password: String });
const User = mongoose.model('user', userSchema);

const app = express();
app.use(bodyParser.json());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});

app.post('/sign-up', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({ username }, (err, response) => {
    if (response.length === 0) {
      User.create({ username, password }, () => {
        res.send({ code: 0, username });
      });
    } else {
      res.send({ code: 1 });
    }
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({ username }, (err, response) => {
    if (response.length === 0) {
      res.send({ code: 2 });
    } else if (password !== response[0].password) {
      res.send({ code: 3 });
    } else {
      res.send({ code: 0, username });
    }
  });
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
