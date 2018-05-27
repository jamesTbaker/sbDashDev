
// --- IMPORTS

import styled from 'styled-components';
import {
	lh_title,
	mt2,
	mt3,
	mb0,
	mb1,
	mb2,
	mb3,
	ml3,
	i,
	fw5,
	fw6,
} from 'styled-components-mixins/tachyons';

// --- TYPOGRAPHIC COMPONENTS

// bases
export const baseFontSizeInPx = 16;
export const baseFontSizeMultiplier = 16 / baseFontSizeInPx;

/* // font sizes; major third scale
export const fs1 = [`font-size: ${baseFontSizeMultiplier * 2.441}rem;`];
export const fs2 = [`font-size: ${baseFontSizeMultiplier * 1.953}rem;`];
export const fs3 = [`font-size: ${baseFontSizeMultiplier * 1.563}rem;`];
export const fs4 = [`font-size: ${baseFontSizeMultiplier * 1.25}rem;`];
export const fs5 = [`font-size: ${baseFontSizeMultiplier * 1}rem;`];
export const fs6 = [`font-size: ${baseFontSizeMultiplier * 0.8}rem;`];
export const fs7 = [`font-size: ${baseFontSizeMultiplier * 0.64}rem;`];
export const fs8 = [`font-size: ${baseFontSizeMultiplier * 0.512}rem;`]; */

// font sizes; minor third scale
export const fs1 = [`font-size: ${baseFontSizeMultiplier * 2.074}rem;`];
export const fs2 = [`font-size: ${baseFontSizeMultiplier * 1.728}rem;`];
export const fs3 = [`font-size: ${baseFontSizeMultiplier * 1.44}rem;`];
export const fs4 = [`font-size: ${baseFontSizeMultiplier * 1.2}rem;`];
export const fs5 = [`font-size: ${baseFontSizeMultiplier * 1}rem;`];
export const fs6 = [`font-size: ${baseFontSizeMultiplier * 0.833}rem;`];
export const fs7 = [`font-size: ${baseFontSizeMultiplier * 0.694}rem;`];
export const fs8 = [`font-size: ${baseFontSizeMultiplier * 0.579}rem;`];

// headers

export const H1 = styled.h1`
	${fs2}
	${lh_title}
	${mt3}
	${mb1}
	${fw6}
`;
export const H2 = styled.h2`
	${fs2}
	${lh_title}
	${mt3}
	${mb1}
	${fw5}
`;
export const H3 = styled.h3`
	${fs3}
	${lh_title}
	${mt3}
	${mb1}
	${fw5}
`;
export const H4 = styled.h4`
	${fs4}
	${lh_title}
	${mt3}
	${mb1}
	${fw5}
`;
export const H5 = styled.h5`
	${fs5}
	${lh_title}
	${mt2}
	${mb1}
	${fw5}
`;
export const H6 = styled.h6`
	${fs5}
	${lh_title}
	${mt2}
	${mb1}
	${fw5}
	${i}
`;

// para

export const P = styled.p`
	${mb2}
`;

// lists - unordered - unbulleted

export const UlUnbulleted = styled.ul`
	${mt3}
	${mb3}
`;
export const UlUnbulletedNested = styled.ul`
	${mt3}
	${mb0}
`;
export const LiUnbulleted = styled.li`
	${mb3}
`;
export const LiUnbulletedNested = styled.li`
	${mb3}
	${ml3}
`;

// lists - unordered - bulleted


export const UlBulleted = styled.ul`
	${mb2}
`;
export const UlBulletedNested = styled.ul`
	${mb0}
`;
export const LiBulleted = styled.li`
	${mb2}
	${ml3}
	list-style-position: outside;
	list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIElEQVQoU2NkIAAY09LS/qOrmTVrFiNMbFAoIOgLQgoAA4QUCSjONAIAAAAASUVORK5CYII=');
`;
export const LiBulletedNested = styled.li`
	${mb2}
	${ml3}
	list-style-position: outside;
	list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAATElEQVQoU2NkIAAYQfIzZ878f//+fQZFRUWG9PR0sBgMMIIkz549CxcwNjZGUcRYUVHx/927d3AFQkJCDB0dHXBTCJtA0A1E+QKfIgBQeyMJtPI08AAAAABJRU5ErkJggg==');
`;
