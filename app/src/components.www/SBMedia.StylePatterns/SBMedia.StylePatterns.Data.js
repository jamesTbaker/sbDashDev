
// ----- IMPORTS

// 

// ----- DATA

module.exports = {

	// TRANSITIONS, ANIMATION

	ReturnStandardTransitionTime: () => '.25s',


	// HIDDEN

	ReturnBlockHidden: () =>
		`display: block;
		width: 0;
		height: 0;
		padding: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	ReturnOverrideBlockHidden: () =>
		`display: block;
		width: auto;
		height: auto;
		text-indent: 0;
		white-space: normal;
		overflow: visible;`,
	ReturnInlineHidden: () =>
		`display: inline-block;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	ReturnTableColumnHidden: () =>
		`display: table-cell;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	ReturnVerticalAlignMiddle: () =>
		`position: relative;
		top: 50%;
		transform: translateY(-50%);`,

};
