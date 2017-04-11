import { Router } from 'express';
import Poll from '../models/poll';

const router = Router();

router.post('/new', (req, res) => {
  const title = req.body.title;
  const _options = req.body._options;
  const _authorId = req.user._id;
  Poll.create({ title, _options, _authorId }, (err, poll) => {
    res.send(poll);
  });
});

router.put('/:_id', (req, res) => {
  const _id = req.params._id;
  const _options = req.params._options;
  Poll.findByIdAndUpdate({ _id, _options }, (err, poll) => {
    res.send(poll);
  });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  Poll.findByIdAndRemove({ _id }, () => {
    res.send(_id);
  });
});

export default router;
