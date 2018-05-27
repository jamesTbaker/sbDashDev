
// --- IMPORTS

const ibmColors = require('ibm-design-colors/ibm-colors.json');

// --- COLOR FUNCTIONS

module.exports = {
	ReturnColor: (hue, grade) => ibmColors[hue][grade],
	ReturnTextColor: (hue, grade) => [`color: ${module.exports.ReturnColor(hue, grade)}`],
	ReturnSolidBackgroundColor: (hue, grade) => [`background-color: ${module.exports.ReturnColor(hue, grade)}`],
};
