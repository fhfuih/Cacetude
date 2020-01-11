const Category = require('./Category');
const Core = require('./Core');

/* const Length = */ new Category('Length')
  .addUnit('m', ['meter', 'meters'], 'm', 1)
  .addUnit('km', ['kilometer', 'kilometers'], 'm', 0.001)
  .addUnit('cm', ['centimeter', 'centimeters'], 'm', 100)
  .addUnit('mm', ['millimeter', 'millimeters'], 'm', 100);

/* const Temperature = */ new Category('Temperature')
  .addUnit('C', ['Celsius', 'celsius'], 'C', 1)
  .addUnit('F', ['Fahrenheit', 'fahrenheit'], 'F', 1)
  .addUnit('K', ['Kelvin', 'kelvin'], 'K', 1)
  .setBaseConverter('C', 'K', (c) => c + 273.15)
  .setBaseConverter('C', 'F', (c) => c * 1.8 + 32)
  .setBaseConverter('F', 'C', (f) => (f - 32) / 1.8)
  .setBaseConverter('F', 'K', (f) => (f + 459.67) / 1.8)
  .setBaseConverter('K', 'C', (k) => k - 273.15)
  .setBaseConverter('K', 'F', (k) => k / 1.8 - 459.67);

module.exports = Core;
