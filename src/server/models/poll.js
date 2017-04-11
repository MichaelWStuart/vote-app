import mongoose, { Schema } from 'mongoose';

const PollSchema = new Schema({
  title: String,
  _authorId: Schema.Types.ObjectId,
  _options: Object,
});

export default mongoose.model('Poll', PollSchema);
