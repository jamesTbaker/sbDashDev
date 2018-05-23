
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import { ButtonTransparent } from 'rebass';


// --- COMPONENT

const Icon = styled.span`
    display: inline-block;
    font: normal normal normal 16px/1 "LineAwesome";
    font-size: inherit;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
	&:before {
		content: '\\f108';
	}
`;

const IconButton = props => (
	<ButtonTransparent onClick={props.clickHandler}>
		<Icon>{props.icon}</Icon>
	</ButtonTransparent>
);

export default IconButton;
