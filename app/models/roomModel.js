import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const roomSchema = new Schema({
  name: { type: String, unique: false, nullable: false },
  description: { type: String, unique: false, nullable: true },
  authorId: { type: ObjectId, unique: false, nullable: false },
  authorName: { type: String, unique: false, nullable: false },
  active: { type: Boolean, default: false, unique: false, nullable: false },
  isPrivate: { type: Boolean, default: false, unique: false, nullable: false },
  currentOnlineCount: { type: Number, min: 0, unique: false, nullable: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model('Room', roomSchema);
