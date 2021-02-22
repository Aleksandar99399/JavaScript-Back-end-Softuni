module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';

  res.status(status).json({
    message
  });
};
