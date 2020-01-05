const { tokenMatcher } = require('chevrotain');
const { parser } = require('./parser');
const {
  tokens: {
    Decimal,
    Binary,
    Octal,
    // Hexadecimal,
    Plus,
    Minus,
    Multiplication,
    Division,
    // Modulo,
    LeftShift,
    // RightShift,
  },
} = require('./lexer/lexer');

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class Interpreter extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  expression(ctx) {
    return this.visit(ctx.bitOrExpr);
  }

  bitOrExpr(ctx) {
    let result = this.visit(ctx.lhs);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand) => {
        result |= this.visit(rhsOperand);
      });
    }
    return result;
  }

  bitXorExpr(ctx) {
    let result = this.visit(ctx.lhs);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand) => {
        result ^= this.visit(rhsOperand);
      });
    }
    return result;
  }

  bitAndExpr(ctx) {
    let result = this.visit(ctx.lhs);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand) => {
        result &= this.visit(rhsOperand);
      });
    }
    return result;
  }

  // TODO: Validate integer in bitShift
  bitShiftExpr(ctx) {
    let result = this.visit(ctx.base);
    if (ctx.shift) {
      ctx.shift.forEach((rhsOperand, idx) => {
        const val = this.visit(rhsOperand);
        const op = ctx.BitShiftOperator[idx];
        if (tokenMatcher(op, LeftShift)) {
          result <<= val;
        } else {
          result >>= val;
        }
      });
    }
    return result;
  }

  additionExpr(ctx) {
    let result = this.visit(ctx.lhs);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const val = this.visit(rhsOperand);
        const op = ctx.AdditionOperator[idx];
        if (tokenMatcher(op, Plus)) {
          result += val;
        } else {
          result -= val;
        }
      });
    }
    return result;
  }

  multiplicationExpr(ctx) {
    let result = this.visit(ctx.lhs);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        const val = this.visit(rhsOperand);
        const op = ctx.MultiplicationOperator[idx];
        if (tokenMatcher(op, Multiplication)) {
          result *= val;
        } else if (tokenMatcher(op, Division)) {
          result /= val;
        } else {
          result %= val;
        }
      });
    }
    return result;
  }

  signExpr(ctx) {
    let result = this.visit(ctx.base);
    if (ctx.AdditionOperator) {
      ctx.AdditionOperator.forEach((op) => {
        if (tokenMatcher(op, Minus)) {
          result = -result;
        }
      });
    }
    return result;
  }

  exponentExpr(ctx) {
    let result = this.visit(ctx.rhs);
    if (ctx.lhs) {
      for (let idx = ctx.lhs.length - 1; idx >= 0; idx -= 1) {
        const val = this.visit(ctx.lhs[idx]);
        result = val ** result;
      }
    }
    return result;
  }

  atomicExpr(ctx) {
    if (ctx.parenthesisExpr) {
      return this.visit(ctx.parenthesisExpr);
    }
    const numberToken = ctx.Number[0];
    const str = numberToken.image;
    if (tokenMatcher(numberToken, Decimal)) {
      return parseFloat(str);
    }
    if (tokenMatcher(numberToken, Binary)) {
      return parseInt(str.slice(2), 2);
    }
    if (tokenMatcher(numberToken, Octal)) {
      return parseInt(str.slice(2), 8);
    }
    return parseInt(str.slice(2), 16);
  }

  parenthesisExpr(ctx) {
    return this.visit(ctx.expression);
  }
}

const interpreter = new Interpreter();

module.exports = {
  interpreter,
};
