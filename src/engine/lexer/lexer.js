const _ = require('lodash');
const { Lexer } = require('chevrotain');
const misc = require('./misc');
const numbers = require('./numbers');
const operations = require('./operators');

const allTokens = [
  ...misc,
  ...operations,
  ...numbers,
];

const tokens = _.keyBy(allTokens, 'name');
const lexer = new Lexer(allTokens);

module.exports = {
  tokens,
  lexer,
};
