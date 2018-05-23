
// --- IMPORTS

import * as React from 'react';
import { Fixed, Flex } from 'rebass';
import IconButton from '../IconButton/IconButton';

// --- COMPONENT

const SBMediaNav = props => (
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
				icon="iD"
				text="Dash"
				clickHandler={props.handleButtonDashClick}
			/>
			<IconButton
				icon="iB"
				text="Blogs"
				clickHandler={props.handleButtonBlogsClick}
			/>
			<IconButton
				icon="iS"
				text="Skip Baker"
				clickHandler={props.handleButtonSBClick}
			/>
			<IconButton
				icon="iA"
				text="Administration"
				clickHandler={props.handleButtonAdminClick}
			/>
		</Flex>
	</Fixed>

);

export default SBMediaNav;
