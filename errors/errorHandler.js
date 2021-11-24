const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong..." } = err;

  res.status(status).send(`${message}`);
  console.log(err);
  next();
};

module.exports = errorHandler;
