import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
  body: { type: String, unique: false, nullable: false },
  authorId: { type: ObjectId, unique: false, nullable: false },
  authorName: { type: String, unique: false, nullable: false },
  roomId: { type: ObjectId, unique: false, nullable: false },
  extra: { type: String, unique: false, nullable: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  type: {
    type: String,
    unique: false,
    nullable: false,
    enum: ['text', 'image', 'imageWithText'],
    default: 'text',
  },
});

export default mongoose.model('Chat', chatSchema);
