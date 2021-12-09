const {
  readdirSync
} = require('fs');

const initFolder = `${__dirname}/`;

const jestInitFileList = readdirSync(initFolder).map((file) => ({
  path: initFolder + file,
  name: file
}));

module.exports = {
  jestInitFileList
};