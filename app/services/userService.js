import brcypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import userLoginSchema from '../schemas/userLoginSchema.js';
import userRegisterSchema from '../schemas/userRegisterSchema.js';

export const createUser = async (userData) => {
  try {
    const validateResponse = userRegisterSchema.validate(userData);
    if (validateResponse && validateResponse.error) {
      throw new Error(validateResponse.error.message);
    }

    const existingUser = await User.find({ email: userData.email });
    if (existingUser && existingUser.length) {
      throw new Error('User with this email already exists');
    }

    const salt = brcypt.genSaltSync(10);
    userData.password = brcypt.hashSync(userData.password, salt);

    const user = new User({
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      const userJsonList = users.map((user) => {
        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
      });
      return userJsonList;
    } else {
      throw new Error('No users found');
    }
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const validateResponse = userLoginSchema.validate(loginData);
    if (validateResponse && validateResponse.error) {
      throw new Error(validateResponse.error.message);
    }

    const { email, password } = loginData;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = brcypt.compareSync(password, user.password);
      if (!isPasswordMatch) {
        throw new Error('Invalid password');
      }
      const userJson = user.toJSON();
      delete userJson.password;
      const secret = process.env.JWT_SECRET;
      const authToken = jwt.sign({ sub: userJson }, secret);
      return { authToken };
    } else {
      throw new Error(
        'User not found with the given email ID. Please register first'
      );
    }
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error('Invalid user');
    }
    const user = await User.findById(userId);
    if (user) {
      const userJson = user.toJSON();
      delete userJson.password;
      return userJson;
    } else {
      throw new Error('No user found with the given user ID');
    }
  } catch (error) {
    throw error;
  }
};
