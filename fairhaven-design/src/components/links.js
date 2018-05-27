
// --- IMPORTS

import styled from 'styled-components';
import { no_underline } from 'styled-components-mixins/tachyons';
import { ReturnTextColor } from './colors';
import { ReturnColorTransition } from './transitions';

// --- LINK COMPONENTS

export const BasicLink = styled.a.attrs({
	href: 'https://google.com',
})`
	${no_underline}
	${ReturnTextColor('blue', 50)};
	${ReturnColorTransition}
	&:hover {
		${ReturnTextColor('blue', 60)};
	}
`;
