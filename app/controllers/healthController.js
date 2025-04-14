/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy 🚀",
    timestamp: new Date().toString(),
    port: process.env.PORT || 3000,
  });
};
