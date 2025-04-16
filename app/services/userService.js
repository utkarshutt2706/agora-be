import User from '../models/userModel.js';

export const createUser = async (userData) => {
  try {
    const user = new User({
      createdAt: Date.now(),
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
    });
    const savedUser = await user.save();
    if (savedUser && savedUser.id) {
      return savedUser.id;
    } else {
      throw new Error('An error occured while creating the user');
    }
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (users && users.length) {
      return users;
    } else {
      throw new Error('No users found');
    }
  } catch (error) {
    throw error;
  }
};
