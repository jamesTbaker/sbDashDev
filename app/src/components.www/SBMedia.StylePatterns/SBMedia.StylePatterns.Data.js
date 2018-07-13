
// ----- IMPORTS

// 

// ----- DATA

module.exports = {

	// COLORS

	Color: (token) => {
		switch (token) {
		case 'yellow':
			return '#fbbd4e';
		case 'blue1':
			return '#081015';
		case 'blue2':
			return '#102029';
		case 'blue3':
			return '#18303d';
		case 'blue4':
			return '#234659';
		// case 'blue1':
		// 	return '#102029';
		// case 'blue1':
		// 	return '#102029';
		// case 'blue1':
		// 	return '#102029';
		case 'red1':
			return '#470006';
		case 'red2':
			return '#5d0007';
		case 'red3':
			return '#8a0009';
		case 'red4':
			return '#a3000b';
		case 'red5':
			return '#bd000d';
		default:
			return '#fcc';
		}
	},


	// TRANSITIONS, ANIMATION

	StandardTransitionTime: () => '.25s',


	// HIDDEN

	BlockHidden: () =>
		`display: block;
		width: 0;
		height: 0;
		padding: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	OverrideBlockHidden: () =>
		`display: block;
		width: auto;
		height: auto;
		text-indent: 0;
		white-space: normal;
		overflow: visible;`,
	InlineHidden: () =>
		`display: inline-block;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	TableColumnHidden: () =>
		`display: table-cell;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`,
	VerticalAlignMiddle: () =>
		`position: relative;
		top: 50%;
		transform: translateY(-50%);`,

};
