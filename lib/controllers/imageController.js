const path = require('path');
const pms = require('../store/pms');

module.exports = function personalisedController(req, res, next){
  const { hash, filename } = req.params;
  const pm = pms.find(pm => pm.hash === hash);
  if(!pm) return next();
  return res.sendFile(pm.images.find(p => path.basename(p) === filename));
};
