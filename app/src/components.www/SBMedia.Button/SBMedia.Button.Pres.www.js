
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Icon from '../SBMedia.Icon/SBMedia.Icon.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';

// --- COMPONENT

const ReturnButtonVerticalPadding = (buttonHeight, contentHeight, topOrBottom) => {
	const timesTen = parseFloat(((buttonHeight - contentHeight) / 2).toFixed(2)) * 10;
	const rounded = topOrBottom === 'top' ? Math.ceil(timesTen) : Math.floor(timesTen);
	return rounded / 10;
};

const ButtonBase = styled.button`
	display: inline-block;
	padding: ${props => ReturnButtonVerticalPadding(props.buttonHeight, props.contentHeight, 'top')}rem 1rem ${props => ReturnButtonVerticalPadding(props.buttonHeight, props.contentHeight, 'bottom')}rem 1rem;
	border: 0;
	background-color: ${props => props.defaultBackgroundColor};
	color: ${props => props.defaultContentColor};
	cursor: pointer;
	transition: color ${StylePatterns.ReturnStandardTransitionTime()}, background-color ${StylePatterns.ReturnStandardTransitionTime()};

	&:hover {
		background-color: ${props => props.activeBackgroundColor};
		color: ${props => props.activeContentColor};
	}
`;

const VisibleTextWrapper = styled.span`
	font-size: ${props => props.contentHeight}rem;
	font-weight: normal;
	${props => props.iconContent && `
		padding-left: 1rem;
	`}
`;

const InvisibleTextWrapper = styled.span`
	${StylePatterns.ReturnInlineHidden()}
`;

export default props => (
	<ButtonBase
		onClick={props.clickHandler}
		buttonHeight={props.buttonHeight}
		contentHeight={props.contentHeight}
		defaultBackgroundColor={props.defaultBackgroundColor}
		defaultContentColor={props.defaultContentColor}
		activeBackgroundColor={props.activeBackgroundColor}
		activeContentColor={props.activeContentColor}
	>
		{
			props.iconContent &&

			<Icon
				iconContent={props.iconContent}
				iconSize={props.contentHeight}
			/>
		}
		{
			!props.textInvisible &&

			<VisibleTextWrapper
				textSize={props.contentHeight}
				iconContent={props.iconContent}
			>
				{props.text}
			</VisibleTextWrapper>
		}
		{
			props.textInvisible &&

			<InvisibleTextWrapper>{props.text}</InvisibleTextWrapper>
		}
	</ButtonBase>
);
