
// --- IMPORTS

import * as React from 'react';
import { ButtonTransparent } from 'rebass';
import Icon from '../SBMedia.Icon/SBMedia.Icon.Pres.www';

// --- COMPONENT

export default props => (
	<ButtonTransparent onClick={props.clickHandler}>
		<Icon
			iconContent={props.iconContent}
			iconSize={props.iconSize}
		/>
		{props.text}
	</ButtonTransparent>
);
