
// --- IMPORTS

import * as React from 'react';

// --- COMPONENT

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			XXX: true,
		};
		// this.XXX = this.XXX.bind(this);
	}
	render() {
		console.log(this.props.postContent);
		return (
			<div>
				<img src={this.props.postContent.photos[0].alt_sizes[3].url} />
			</div>
		);
	}
}
