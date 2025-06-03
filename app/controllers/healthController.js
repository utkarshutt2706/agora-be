import { getHealthStatus } from '../services/healthService.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const healthCheck = (_, res) => {
  const health = getHealthStatus();
  res.status(health.status ? 200 : 500).json(health.json);
};
