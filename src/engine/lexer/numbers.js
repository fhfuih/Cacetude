const { createToken, Lexer } = require('chevrotain');

const Number = createToken({
  name: 'Number',
  pattern: Lexer.NA,
});

// Decimal "x", "x.y", ".y" with scientific notation
const Decimal = createToken({
  name: 'Decimal',
  pattern: /(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?/,
  categories: Number,
});

const Binary = createToken({
  name: 'Binary',
  pattern: /0b[01]+/i,
  categories: Number,
});

const Octal = createToken({
  name: 'Octal',
  pattern: /0o[0-7]+/i,
  categories: Number,
});

const Hexadecimal = createToken({
  name: 'Hexadecimal',
  pattern: /0x[0-9a-e]+/i,
  categories: Number,
});

module.exports = [
  Binary,
  Octal,
  Hexadecimal,
  // Putting decimal at botton or the first 0 of 0b01 is eaten separately
  Decimal,
  Number,
];
