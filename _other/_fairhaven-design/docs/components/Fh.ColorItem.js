
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import { flex, pl3, w_25, w_75, pt2 } from 'styled-components-mixins/tachyons';
// eslint-disable-next-line
import * as Fh from 'fairhaven-design';

// --- COMPONENT

const ColorItemContainer = styled.li`
	${flex}
`;
const ColorItemSample = styled.div`
	${w_25}
	height: 3rem;
	${props => Fh.ReturnSolidBackgroundColor(props.colorName, props.colorGradeName)}
`;
const ColorItemData = styled.div`
	${w_75}
	${pl3}
	${pt2}
	${Fh.fs6}
`;
export default props => (
	<ColorItemContainer>
		<ColorItemSample 
			colorName={props.colorName}
			colorGradeName={props.colorGradeName}
		/>
		<ColorItemData>
			{props.colorName} {props.colorGradeName}
		</ColorItemData>
	</ColorItemContainer>
);
