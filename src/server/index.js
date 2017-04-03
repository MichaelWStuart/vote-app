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

app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/magic', (req, res) => {
  User.findById('58e09d04eec44d35727c990d', (err, result) => {
    res.send(result);
  });
});

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});

// eslint-disable-next-line
app.post('/create', (req, res) => {
// eslint-disable-next-line
  User.create({ username: req.body.username, password: req.body.password }, (err, result) => {
    console.log(result);
  });
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
