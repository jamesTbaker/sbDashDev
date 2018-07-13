
// --- IMPORTS

import * as React from 'react';

// --- COMPONENT

export default (props) => {
	console.log(props.postContent);
	return (
		<li>
			<img src={props.postContent.photos[0].alt_sizes[3].url} />
		</li>
	);
};
