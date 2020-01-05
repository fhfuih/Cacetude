const { createToken, Lexer } = require('chevrotain');

const AdditionOperator = createToken({
  name: 'AdditionOperator',
  pattern: Lexer.NA,
});

const Plus = createToken({
  name: 'Plus',
  pattern: /\+|plus|and|with/i,
  categories: AdditionOperator,
});

const Minus = createToken({
  name: 'Minus',
  pattern: /-|minus|subtract|without/i,
  categories: AdditionOperator,
});

const MultiplicationOperator = createToken({
  name: 'MultiplicationOperator',
  pattern: Lexer.NA,
});

const Multiplication = createToken({
  name: 'Multiplication',
  pattern: /\*|times|mul|multiplied by/i,
  categories: MultiplicationOperator,
});

const Division = createToken({
  name: 'Division',
  pattern: /\/|mul|divide|divided by/,
  categories: MultiplicationOperator,
});

const Modulo = createToken({
  name: 'Modulo',
  pattern: /%|mod/,
  categories: MultiplicationOperator,
});

const Exponent = createToken({
  name: 'Exponent',
  pattern: /\^|\*\*/,
});

const BitShiftOperator = createToken({
  name: 'BitShiftOperator',
  pattern: Lexer.NA,
});

const LeftShift = createToken({
  name: 'LeftShift',
  pattern: /<</,
  categories: BitShiftOperator,
});

const RightShift = createToken({
  name: 'RightShift',
  pattern: />>/,
  categories: BitShiftOperator,
});

const BitAnd = createToken({
  name: 'BitAnd',
  pattern: /&/,
});

const BitOr = createToken({
  name: 'BitOr',
  pattern: /\|/,
});

const BitXor = createToken({
  name: 'BitXor',
  pattern: /xor/,
});

module.exports = [
  Exponent,
  Plus,
  Minus,
  Multiplication,
  Division,
  Modulo,
  LeftShift,
  RightShift,
  BitAnd,
  BitOr,
  BitXor,
  AdditionOperator,
  MultiplicationOperator,
  BitShiftOperator,
];
