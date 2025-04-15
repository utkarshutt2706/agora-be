import User from '../models/userModel.js';

export const createUser = async (userData) => {
  try {
    const user = new User({
      createdAt: Date.now(),
      email: userData.email,
      fullName: userData.fullName,
      username: userData.username,
      password: userData.password,
    });
    await user.save();
  } catch (error) {
    throw error;
  }
};
