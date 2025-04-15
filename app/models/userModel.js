import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  fullName: String,
  password: String,
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('User', userSchema);
