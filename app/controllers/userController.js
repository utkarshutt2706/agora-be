import { createUser } from '../services/userService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createUserHandler = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
