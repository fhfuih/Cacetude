const Lexer = require('./engine/lexer/lexer');
const { parser } = require('./engine/parser');
const { interpreter } = require('./engine/interpreter');

function parseInput(text) {
  const lexingResult = Lexer.lex(text);
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  const cst = parser.expression();

  if (parser.errors.length > 0) {
    console.warn(parser.errors);
    throw new Error('sad sad panda, Parsing errors detected');
  }

  const value = interpreter.visit(cst);

  console.log(value);
  return value;
}

const inputText = '0X1000';
parseInput(inputText);
