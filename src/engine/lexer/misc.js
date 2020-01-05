const { createToken, Lexer } = require('chevrotain');

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const LParen = createToken({
  name: 'LParen',
  pattern: /\(/,
});

const RParen = createToken({
  name: 'RParen',
  pattern: /\)/,
});

module.exports = [
  WhiteSpace,
  LParen,
  RParen,
];
