const { CstParser } = require('chevrotain');
const Lexer = require('./lexer/lexer');

const {
  LParen,
  RParen,
  Percent,
  Number,
  Exponent,
  BitAnd,
  BitOr,
  BitXor,
  AdditionOperator,
  MultiplicationOperator,
  BitShiftOperator,
} = Lexer.tokens;

class Parser extends CstParser {
  constructor() {
    super(Lexer.tokens);

    const $ = this;

    $.RULE('expression', () => $.SUBRULE($.bitOrExpr));

    $.RULE('bitOrExpr', () => {
      $.SUBRULE($.bitXorExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(BitOr);
        $.SUBRULE2($.bitXorExpr, { LABEL: 'rhs' });
      });
    });

    $.RULE('bitXorExpr', () => {
      $.SUBRULE($.bitAndExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(BitXor);
        $.SUBRULE2($.bitAndExpr, { LABEL: 'rhs' });
      });
    });

    $.RULE('bitAndExpr', () => {
      $.SUBRULE($.bitShiftExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(BitAnd);
        $.SUBRULE2($.bitShiftExpr, { LABEL: 'rhs' });
      });
    });

    $.RULE('bitShiftExpr', () => {
      $.SUBRULE($.additionExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(BitShiftOperator);
        $.SUBRULE2($.additionExpr, { LABEL: 'rhs' });
      });
    });

    $.RULE('additionExpr', () => {
      $.SUBRULE($.multiplicationExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(AdditionOperator);
        $.SUBRULE2($.multiplicationExpr, { LABEL: 'rhs' });
        $.OPTION({
          DEF: () => $.CONSUME(Percent),
          NAME: '$percent',
        });
      });
    });

    $.RULE('multiplicationExpr', () => {
      $.SUBRULE($.signExpr, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(MultiplicationOperator);
        $.SUBRULE2($.signExpr, { LABEL: 'rhs' });
      });
    });

    $.RULE('signExpr', () => {
      $.MANY(() => $.CONSUME(AdditionOperator));
      $.SUBRULE($.exponentExpr, { LABEL: 'base' });
    });

    $.RULE('exponentExpr', () => {
      $.MANY(() => {
        $.SUBRULE($.atomicExpr, { LABEL: 'lhs' });
        $.CONSUME(Exponent);
      });
      $.SUBRULE2($.atomicExpr, { LABEL: 'rhs' });
    });

    $.RULE('atomicExpr', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.parenthesisExpr) },
        { ALT: () => $.CONSUME(Number) },
      ]);
    });

    $.RULE('parenthesisExpr', () => {
      $.CONSUME(LParen);
      $.SUBRULE($.expression);
      $.CONSUME(RParen);
    });

    this.performSelfAnalysis();
  }
}

const parser = new Parser([]);

module.exports = {
  parser,
};
