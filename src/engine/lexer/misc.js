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

const Percent = createToken({
  name: 'Percent',
  pattern: /%|percent|per cent/i,
});

module.exports = [
  WhiteSpace,
  LParen,
  RParen,
  Percent,
];
