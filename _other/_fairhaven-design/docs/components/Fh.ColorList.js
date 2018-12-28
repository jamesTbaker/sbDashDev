
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import {
	lh_title,
	mt3,
	mb1,
	fw3,
} from 'styled-components-mixins/tachyons';
// eslint-disable-next-line
import * as Fh from 'fairhaven-design';
import FhColorItem from './Fh.ColorItem';

// --- COMPONENT

const ColorItemHeader = styled.h3`
	${Fh.fs4}
	${lh_title}
	${mt3}
	${mb1}
	${fw3}
`;

export default (props) => {
	const colorItemKeys = Object.keys(props.colorGrades);
	return (
		<div>
			<ColorItemHeader>{props.colorName}</ColorItemHeader>
			<ul>
				{
					colorItemKeys.map(colorGradeKey => (
						<FhColorItem
							key={colorGradeKey}
							colorName={props.colorName}
							colorGradeName={colorGradeKey}
						/>
					))
				}
			</ul>
		</div>
	);
};
