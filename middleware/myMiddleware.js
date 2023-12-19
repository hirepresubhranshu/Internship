const myMiddleware = (req, res, next) => {
  // Your middleware logic here
  console.log('Middleware triggered');
  next(); 
};

module.exports = myMiddleware;
