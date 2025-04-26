//simulate authentication
exports.protect = (req, res, next) => {
  // Later add token checks here
  console.log('Protected route accessed');
  next();
};
