import { createUser, getAllUsers, loginUser } from '../services/userService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createUserHandler = async (req, res) => {
  try {
    const userFullName = await createUser(req.body);
    res.status(200).json({
      userFullName,
      message: `Welcome ${
        userFullName || 'user'
      } to Agora! Please proceed with login.`,
    });
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllUserHandler = async (_, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const loginUserHandler = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.cause || 500).json({ error: error.message });
  }
};
