import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now() },
  author: ObjectId,
  roomId: ObjectId,
});

export default mongoose.model('Chat', chatSchema);
