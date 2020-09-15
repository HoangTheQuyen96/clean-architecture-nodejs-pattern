module.exports = fn => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    res.status(result.status).json(result.data);
  } catch (error) {
    await next(error);
  }
};
