const {
  readdirSync
} = require('fs');

const initFolder = `${__dirname}/`;

const jestInitFileList = readdirSync(initFolder).map((file) => initFolder + file);

module.exports = {
  jestInitFileList
};