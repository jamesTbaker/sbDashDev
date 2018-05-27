
// --- TRANSITION FUNCTIONS

module.exports = {
	ReturnTransitionParams: () => '.25s ease-in',
	ReturnColorTransition: () => [`transition: color ${module.exports.ReturnTransitionParams()}`],
	ReturnBackgroundColorTransition: () => [`transition: background-color ${module.exports.ReturnTransitionParams()}`],
	ReturnBorderColorTransition: () => [`transition: border-color ${module.exports.ReturnTransitionParams()}`],
	ReturnColorAndBackgroundColorTransition: () => 
		[
			`transition: color ${module.exports.ReturnTransitionParams()}, 
			background-color ${module.exports.ReturnTransitionParams()}`,
		],
};
