import React from 'react';

const Button = (props) => {
	const {
		children,
		link,
		onClick,
		style,
		showBottomLine,
		bottomLineSize,
		color,
		fontColor,
		capitalize,
	} = props;


	const backgroundColorObj = Color(color);
	let bottomLineStyle = {};
	if (showBottomLine) {
		bottomLineStyle = {
			borderColor: backgroundColorObj.lighten(0.3),
			borderBottomWidth: bottomLineSize,
			borderTopWidth: 0,
			borderLeftWidth: 0,
			borderRightWidth: 0,
			borderStyle: 'solid',
		};
	}

	if (capitalize) {
		buttonStyle.textTransform = 'uppercase';
	}

	if (link) {
		return (
			<a
				href={link}
				style={objectAssign(buttonStyle, bottomLineStyle, style)}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			style={objectAssign(buttonStyle, bottomLineStyle, style)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};


export default Button;
