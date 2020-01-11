class Scalar {
  constructor(value, unit) {
    this.value = value;
    this.unit = unit;
  }

  convert(unit) {
    this.value = this.unit.category.convertToValue(this, unit);
    this.unit = unit;
    return this;
  }

  convertAndCreate(unit) {
    return this.unit.category.convertToScalar(this, unit);
  }
}

module.exports = Scalar;
