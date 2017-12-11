const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const SALT = Math.random() + Date.now();
const PERSONALISED_MESSAGES_DIR = path.join(__dirname, '../../personalised_messages/');

const personalised_messages = fs.readdirSync(PERSONALISED_MESSAGES_DIR)
    .filter(name => name[0] !== '.')
    .map(name => ({
      name,
      hash: md5(name + SALT).substring(0, 4),
      body: fs.readFileSync(path.join(PERSONALISED_MESSAGES_DIR, name), 'utf8'),
    }));

personalised_messages.forEach(({hash, name}) => {
  console.log(`${name}: http://xmas.ycmjason.com/${hash}\n`);
});

module.exports = function personalisedController(req, res){
  const hash = req.params.hash;
  const pm = personalised_messages.find(pm => pm.hash === hash);
  if(!pm) return res.json({ name: 'Hacker', body: 'I love you! <3 Muah!' });
  return res.json({name: pm.name, body: pm.body});
};
