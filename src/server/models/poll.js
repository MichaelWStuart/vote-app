import mongoose, { Schema } from 'mongoose';

const PollSchema = new Schema({
  title: String,
  _authorId: Schema.Types.ObjectId,
});

export default mongoose.model('Poll', PollSchema);
