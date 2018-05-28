
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import * as Tc from 'styled-components-mixins/tachyons';
import { RetrunInteractiveInactiveBackground, RetrunInteractiveActiveBackground } from './colors';
import { ReturnBackgroundColorTransition } from './transitions';


// --- LINK COMPONENTS

// on click handler
// text visible
// text caps
// icon

const StyledButton = styled.button`
	${Tc.pv2}
	${Tc.ph3}
	${Tc.bn}
	${Tc.br1}
	${ReturnBackgroundColorTransition()}
	${RetrunInteractiveInactiveBackground()}
	&:hover {
		${RetrunInteractiveActiveBackground()}
	}
`;

const ButtonVisibleTextContainer = styled.span`

`;

const ButtonInVisibleTextContainer = styled.span`

`;

export const Button = (props) => {
	const {
		text,
		handleButtonClick,
	} = props;

	return (
		<StyledButton
			onClick={handleButtonClick}
		>
			{
				!props.textInvisible &&

				<ButtonVisibleTextContainer>
					{text}
				</ButtonVisibleTextContainer>
			}
			{
				props.textInvisible &&

				<ButtonInVisibleTextContainer>
					{text}
				</ButtonInVisibleTextContainer>
			}
		</StyledButton>
	);
};
