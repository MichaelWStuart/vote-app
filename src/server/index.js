import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';
import User from './models/user';
import Poll from './models/poll';

// eslint-disable-next-line global-require
if (!isProd) require('dotenv').load();

const mongodb = `mongodb://${process.env.UNAME}:${process.env.PASS}@${process.env.LOC}:${process.env.MDBPORT}/vote-app`;
mongoose.connect(mongodb);
const app = express();
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.get('*', (req, res) => {
  const { user } = req;
  Poll.find({}, (err, polls) => {
    polls.forEach(poll => poll._options.forEach(option => option.votes = option.votes.length));
    res.send(renderApp(APP_NAME, user, polls));
  });
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  User.register(newUser, req.body.password, (err, user) => {
    if (!user) res.send(err);
    else {
      const credentials = { username, _id: user._id };
      passport.authenticate('local')(req, res, () => {
        res.send({ name: 'Success', credentials });
      });
    }
  });
});

app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (!user) res.send({ name: 'Error', message: 'Invalid username or password' });
    else {
      req.logIn(user, () => {
        const credentials = { username: user.username, _id: user._id };
        res.send({ name: 'Success', credentials });
      });
    }
  })(req, res);
});

app.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

app.post('/polls/new', (req, res) => {
  const title = req.body.title;
  const _options = req.body._options;
  const _authorId = req.user._id;
  Poll.create({ title, _options, _authorId }, (err, poll) => {
    res.send(poll);
  });
});

app.put('/polls/:_id', (req, res) => {
  const _id = req.params._id;
  const _options = req.params._options;
  Poll.findByIdAndUpdate({ _id, _options }, (err, poll) => {
    res.send(poll);
  });
});

app.delete('/polls/:_id', (req, res) => {
  const _id = req.params._id;
  Poll.findByIdAndRemove({ _id }, () => {
    res.send(_id);
  });
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
