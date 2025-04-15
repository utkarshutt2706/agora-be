import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
  title: { type: String, unique: false, nullable: false },
  body: { type: String, unique: false, nullable: true },
  author: { type: ObjectId, unique: false, nullable: false },
  roomId: { type: ObjectId, unique: false, nullable: false },
  date: { type: Date, default: Date.now() },
});

export default mongoose.model('Chat', chatSchema);
