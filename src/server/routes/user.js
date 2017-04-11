import { Router } from 'express';
import passport from 'passport';
import User from '../models/user';

const router = Router();

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
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

router.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

export default router;
