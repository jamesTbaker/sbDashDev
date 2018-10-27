
// --- IMPORTS

const ibmColors = require('ibm-design-colors/ibm-colors.json');

// --- COLOR FUNCTIONS

module.exports = {
	ReturnColor: (hue, grade) => ibmColors[hue][grade],
	ReturnTextColor: (hue, grade) => [`color: ${module.exports.ReturnColor(hue, grade)}`],
	ReturnSolidBackgroundColor: (hue, grade) => [`background-color: ${module.exports.ReturnColor(hue, grade)}`],
	RetrunInteractiveInactiveTextOnWhite: () => [`color: ${module.exports.ReturnColor('cerulean', '50')}`],
	RetrunInteractiveActiveTextOnWhite: () => [`color: ${module.exports.ReturnColor('cerulean', '60')}`],
	RetrunInteractiveInactiveBackground: () => [`background-color: ${module.exports.ReturnColor('cerulean', '50')};`, `color: ${module.exports.ReturnColor('white', '0')};`],
	RetrunInteractiveActiveBackground: () => [`background-color: ${module.exports.ReturnColor('cerulean', '60')};`, `color: ${module.exports.ReturnColor('white', '0')};`],
};
