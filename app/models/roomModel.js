import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const roomSchema = new Schema({
  name: String,
  author: ObjectId,
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  currentOnlineCount: { type: Number, min: 0 },
});

export default mongoose.model('Room', roomSchema);
