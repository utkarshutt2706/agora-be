import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, nullable: false },
  fullName: { type: String, unique: false, nullable: false },
  password: { type: String, unique: false, nullable: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export default mongoose.model('User', userSchema);
