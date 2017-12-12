const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const htmlspecialchars = require('htmlspecialchars');

const SALT = process.env.SECRET || Math.random() + Date.now();
const PMS_DIR = path.join(__dirname, '../../pms/');
const IMG_PLACEHOLDER = /{{IMG ([0-9]*(?:.jpg|.jpeg|.gif|.png))}}/;

const htmlise = (content) => '<p>' +
  htmlspecialchars(content.trim())
    .split('\n')
    .map(s => s.trim())
    .map(line => (line.length <= 0)? '</p><p>': line)
    .join('\n') +
  '</p>';

const getPlaceholders = (content) => content.match(new RegExp(IMG_PLACEHOLDER, 'g')) || [];

const replaceImagePlaceHolder = (content, hash) => {
  const getImgTag = (filename) => `<img src="${path.join('/', hash, 'images', filename)}">`;
  return content.replace(new RegExp(IMG_PLACEHOLDER, 'g'), (_, filename) => getImgTag(filename));
};

module.exports = fs.readdirSync(PMS_DIR)
  .filter(name => name[0] !== '.')
  .map(name => {
    const hash = md5(name + SALT).substring(0, 4);
    const body = fs.readFileSync(path.join(PMS_DIR, name, 'body.txt'), 'utf8');
    return {
      name,
      hash,
      body: replaceImagePlaceHolder(htmlise(body), hash),
      images: getPlaceholders(body).map(placeholder => path.join(PMS_DIR, name, placeholder.match(IMG_PLACEHOLDER)[1])),
    };
  });
