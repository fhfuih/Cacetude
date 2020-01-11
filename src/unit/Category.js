const Scalar = require('./Scalar');
const Unit = require('./Unit');
const Core = require('./Core');

class Category {
  constructor(name) {
    this.name = name;
    this.baseConverters = {};
  }

  addUnit(name, aliases, baseName, relative) {
    const U = new Unit(name, aliases, baseName, relative, this);
    Core.mappings[name] = U;
    aliases.forEach((aliaseName) => {
      Core.mappings[aliaseName] = U;
    });
    return this;
  }

  setBaseConverter(from, to, func) {
    if (!this.baseConverters[from]) {
      this.baseConverters[from] = {};
    }
    this.baseConverters[from][to] = func;
    return this;
  }

  convertToValue(fromScalar, toUnitOrName) {
    const { unit: fromUnit, value: fromValue } = fromScalar;
    const toUnit = (typeof toUnitOrName === 'string' || toUnitOrName instanceof String)
      ? Core.mappings[toUnitOrName]
      : toUnitOrName;

    // convert to itself
    if (fromUnit === toUnit) {
      return fromScalar;
    }

    // (reject) convert to another category
    if (fromUnit.category.name !== toUnit.category.name) {
      return NaN;
    }

    // convert to a unit with the same base
    const fromBase = fromValue * fromUnit.relative;
    if (fromUnit.baseName === toUnit.baseName) {
      return fromBase / toUnit.relative;
    }

    // convert to a unit with a different base
    if (!this.baseConverters[fromUnit.baseName]
      || !this.baseConverters[fromUnit.baseName][toUnit.baseName]) {
      return NaN;
    }
    const toBase = this.baseConverters[fromUnit.baseName][toUnit.baseName](fromBase);
    return toBase / toUnit.relative;
  }

  convertToScalar(fromScalar, toUnit) {
    const toValue = this.convertToValue(fromScalar, toUnit);
    return new Scalar(toValue, toUnit);
  }
}

module.exports = Category;
