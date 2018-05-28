
// --- IMPORTS

import * as React from 'react';
// import styled from 'styled-components';
// import * as Tc from 'styled-components-mixins/tachyons';
import {
	material as MaterialIcons,
	// octicons as OcticonsIcons,
	// faBrands as FaBrandsIcons,
	// faRegular as FaRegularIcons,
	// faSolid as FaSolidIcons,
	// feather as FeatherIcons,
} from 'styled-icons';
import { FeaturedPlayList } from 'styled-icons/material';

/* import { 
	RetrunInteractiveInactiveBackground,
	RetrunInteractiveActiveBackground,
} from './colors'; */
// import { ReturnBackgroundColorTransition } from './transitions';

// --- ICON COMPONENT

// size
// title
// css
// fill color


export const Icon = (props) => {
	const IconPackage = `${props.package}Icons`;
	const IconName = props.name;
	const IconCombo = `${IconPackage}[${IconName}]`;
	return <FeaturedPlayList size="48" title="Unlock account" css="color: red;" />;
};
