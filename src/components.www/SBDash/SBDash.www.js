
// --- IMPORTS

import React from 'react';
import ReactDOM from 'react-dom';

// --- COMPONENT


export default class SBDashApp extends React.Component {
	render() {
		return (
			<div>
				Hello, world!
			</div>
		);
	}
}


ReactDOM.render(<SBDashApp />, document.getElementById('react-root'));
