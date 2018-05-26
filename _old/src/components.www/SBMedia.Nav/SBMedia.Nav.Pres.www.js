
// --- IMPORTS

import * as React from 'react';
import { Fixed, Flex } from 'rebass';
import IconButton from '../SBMedia.IconButton/SBMedia.IconButton.Pres.www';

// --- COMPONENT

export default props => (
	<Fixed
		bottom={0}
		right={0}
		left={0}
		p={3}
		bg="black"
	>
		<Flex
			justifyContent="space-between"
		>
			<IconButton
				iconContent="tachometer"
				iconSize="2.2"
				text="Dash"
				textSize="2"
				clickHandler={props.handleButtonDashClick}
			/>
			<IconButton
				iconContent="list-ul"
				iconSize="2.2"
				text="Blogs"
				textVisible
				textSize="2"
				clickHandler={props.handleButtonBlogsClick}
			/>
			<IconButton
				iconContent="user"
				iconSize="2.2"
				text="Skip Baker"
				textVisible
				textSize="2"
				clickHandler={props.handleButtonSBClick}
			/>
			<IconButton
				iconContent="cog"
				iconSize="2.2"
				text="Administration"
				textVisible
				textSize="2"
				clickHandler={props.handleButtonAdminClick}
			/>
		</Flex>
	</Fixed>

);
