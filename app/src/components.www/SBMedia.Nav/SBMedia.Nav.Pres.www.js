
// --- IMPORTS

import * as React from 'react';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import FixedContainer from '../SBMedia.FixedContainer/SBMedia.FixedContainer.Pres.www';
import FlexContainer from '../SBMedia.FlexContainer/SBMedia.FlexContainer.Pres.www';

// --- COMPONENT

export default props => (
	<FixedContainer
		bottom={0}
		right={0}
		left={0}
		padding="1rem 0"
		margin="0"
	>
		<FlexContainer
			justifyContent="space-around"
		>
			<Button
				buttonHeight="3"
				iconContent="tachometer"
				contentHeight="2.2"
				text="Dash"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor="#97faf2"
				activeBackgroundColor="transparent"
				activeContentColor="#73a7b5"
				clickHandler={props.handleButtonDashClick}
			/>
			<Button
				buttonHeight="3"
				iconContent="list-ul"
				contentHeight="2.2"
				text="Blogs"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor="#97faf2"
				activeBackgroundColor="transparent"
				activeContentColor="#73a7b5"
				clickHandler={props.handleButtonBlogsClick}
			/>
			<Button
				buttonHeight="3"
				iconContent="user"
				contentHeight="2.2"
				text="Skip Baker"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor="#97faf2"
				activeBackgroundColor="transparent"
				activeContentColor="#73a7b5"
				clickHandler={props.handleButtonSBClick}
			/>
			<Button
				buttonHeight="3"
				iconContent="cog"
				contentHeight="2.2"
				text="Administration"
				textInvisible
				defaultBackgroundColor="transparent"
				defaultContentColor="#97faf2"
				activeBackgroundColor="transparent"
				activeContentColor="#73a7b5"
				clickHandler={props.handleButtonAdminClick}
			/>
		</FlexContainer>
	</FixedContainer>

);
