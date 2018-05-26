
// --- IMPORTS

import styled from 'styled-components';
import IconData from './SBMedia.Icon.Data';


// --- COMPONENT

export default styled.span`
	display: inline-block;
	font-size: inherit;
	font: normal normal normal ${props => props.iconSize}rem / 1 "LineAwesome";
	text-decoration: inherit;
	text-rendering: optimizeLegibility;
	text-transform: none;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-smoothing: antialiased;
	&:before {
		content: '${props => IconData.ReturnIconData(props.iconContent)}';
	}
`;
