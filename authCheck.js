const token = require('./token');

module.exports = function authCheck (req, res, next) {
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.headers.authorization;
  //const tokenHead = authHeader ? authHeader.replace('Bearer ', '') : '';

  if(!authHeader) {
    return res.status(403).json({message: 'Authorization failed, token missing.'});
  }

  token.verify(authHeader)
    .then( payload => {
      req.user = payload;
      next();
    })
    .catch(error => {
      console.log('Error verifying token:',error);
      res.status(403).json({message: 'Authorization failed, token invalid.'});
    });

};
