const pms = require('./lib/store/pms');

pms.forEach(({hash, name}) => console.log(`${name}: http://xmas.ycmjason.com/${hash}`));
console.log();

require('./lib/app').listen(process.env.PORT || 3000);
