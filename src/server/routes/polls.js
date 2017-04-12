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

router.put('/:_id/vote', (req, res) => {
  const _id = req.params._id;
  const { pollIndex, optionIndex, voterId } = req.body;
  Poll.findById(_id, (findErr, poll) => {
    const duplicateUser = poll._options[optionIndex].votes.indexOf(voterId) >= 0;
    if (duplicateUser) {
      res.send({ success: false, message: 'You have already voted on this poll' });
    } else {
      poll._options.forEach(option => option.votes = option.votes.filter(voter => voter !== voterId));
      poll._options[optionIndex].votes.push(voterId);
      poll.save((saveErr, updatedPoll) => {
        updatedPoll._options.forEach(option => option.votes = option.votes.length);
        res.send({ success: true, data: { pollIndex, updatedPoll } });
      });
    }
  });
});

router.put('/:_id', (req, res) => {
  const _id = req.params._id;
  const { _options, pollIndex } = req.body;
  Poll.findByIdAndUpdate(_id, _options, (err, poll) => {
    res.send({ poll, pollIndex });
  });
});

router.delete('/:_id', (req, res) => {
  const _id = req.params._id;
  Poll.findByIdAndRemove(_id, () => {
    res.end();
  });
});

export default router;
