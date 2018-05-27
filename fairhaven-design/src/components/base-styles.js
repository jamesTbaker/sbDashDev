
/* eslint-disable import/prefer-default-export */

// --- IMPORTS

import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import { lh_copy, fw4 } from 'styled-components-mixins/tachyons';
import { baseFontSizeInPx, fs5 } from './typography';
import { ReturnTextColor, ReturnSolidBackgroundColor } from './colors';

// --- BASE STYLES

export const baseStyles = () => injectGlobal`
	${reset}
	* { box-sizing: border-box; }
	html { font-size: ${baseFontSizeInPx}px; }
	body { 
		font-family: -apple-system, BlinkMacSystemFont, Roboto, 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, 'Segoe UI', Arial, 'Lucida Grande', sans-serif;
		
		${fs5}
		${fw4}
		${lh_copy}

		${ReturnSolidBackgroundColor('white', 0)};
		${ReturnTextColor('gray', 80)};
	} 
`;
