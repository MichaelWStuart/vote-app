import {} from 'dotenv/config';
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
import pollsRoutes from './routes/polls';
import usersRoutes from './routes/users';
import authRoutes from './routes/auth';

import { normalizePolls } from './helpers/polls';

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
app.use('/polls', pollsRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  Poll.find({}, (err, polls) => {
    res.send(renderApp(APP_NAME, req.user, normalizePolls(polls)));
  });
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
