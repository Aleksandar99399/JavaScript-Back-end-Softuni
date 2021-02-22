module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong';
  err.page = err.page || '404';

  return res.render(err.page, {
    error: err
  });
};
