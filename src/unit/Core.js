const Scalar = require('./Scalar');

class Core {
  static createScalar(value, unitName) {
    if (!Core.mappings[unitName]) {
      return null;
    }
    return new Scalar(value, Core.mappings[unitName]);
  }
}

Core.mappings = {};

module.exports = Core;
