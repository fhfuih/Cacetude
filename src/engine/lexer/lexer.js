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
  lex: (inputText) => {
    const result = lexer.tokenize(inputText);
    if (result.errors.length > 0) {
      console.warn(result.errors);
      throw new Error('Lexing errors');
    }
    return result;
  },
};
