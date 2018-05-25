
// --- IMPORTS

import * as React from 'react';
import { ButtonTransparent } from 'rebass';
import styled from 'styled-components';
import Icon from '../SBMedia.Icon/SBMedia.Icon.Pres.www';
import StylePatterns from '../../styles/SBMedia.StylePatterns';

// --- COMPONENT

const VisibleTextWrapper = styled.span`
	display: inline-block;
	font-size: ${props => props.textSize}rem;
	padding-left: 1rem
`;

const InvisibleTextWrapper = styled.span`display: inline-block;
		width: 0;
		height: 0;
		text-indent: 100%;
		white-space: nowrap;
		overflow: hidden;`;

export default props => (
	<ButtonTransparent onClick={props.clickHandler}>
		<Icon
			iconContent={props.iconContent}
			iconSize={props.iconSize}
		/>
		{
			props.textVisible &&

			<VisibleTextWrapper textSize={props.textSize}>{props.text}</VisibleTextWrapper>
		}
		{
			!props.textVisible &&

			<InvisibleTextWrapper>{props.text}</InvisibleTextWrapper>
		}
	</ButtonTransparent>
);
