const chalk = require('chalk');

const pms = require('../store/pms');
const { pickRandom } = require('../utils');

const hacker_pms = [
  `Wow, you spent time trying to read other people's message?`,
  `Nice try!`,
  `Nope, nothing's here.`,
  `Tell me when you finally made it!`,
  `Stop it already.`,
];

const colors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
];

module.exports = function personalisedController(req, res){
  const hash = req.params.hash;
  const pm = pms.find(pm => pm.hash === hash) || {
    name: 'Hacker',
    body: pickRandom(hacker_pms),
  };
  console.log(chalk.bold[pickRandom(colors)](`${pm.name} just opened his card!`));
  return res.json({name: pm.name, body: pm.body});
};
