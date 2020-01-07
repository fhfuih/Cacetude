const readline = require('readline');
const { lexer } = require('../engine/lexer/lexer');
const { parser } = require('../engine/parser');
const { interpreter } = require('../engine/interpreter');

function parseInput(text) {
  const lexingResult = lexer.tokenize(text);
  if (lexingResult.errors.length > 0) {
    console.warn(lexingResult.errors);
    throw new Error('sad sad panda, Lexing errors detected');
  }
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  const cst = parser.expression();

  if (parser.errors.length > 0) {
    console.warn(parser.errors);
    throw new Error('sad sad panda, Parsing errors detected');
  }

  const value = interpreter.visit(cst);
  return value;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Cacetude> ',
});

rl.on('line', (line) => {
  const result = parseInput(line.trim());
  console.log(result);
  rl.prompt();
});

rl.prompt();
