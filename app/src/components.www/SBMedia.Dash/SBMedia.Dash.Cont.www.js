
// --- IMPORTS

import * as React from 'react';

const SBMediaDashData = require('./SBMedia.Dash.Data');

// --- COMPONENT

export default class XXX extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dashPosts: [],
			dashPostsQuantityRequested: 0,
		};
		// this.XXX = this.XXX.bind(this);
	}
	componentDidMount() {
		// get a promise to return a batch of dashboard posts
		SBMediaDashData.ReturnDashboardPosts(this.state.dashPostsQuantityRequested)
			.then((returnedDashPosts) => {
				this.setState(() => ({
					dashPosts: [...this.state.dashPosts, returnedDashPosts],
				}));
			});
	}
	render() {
		return (
			<div />
		);
	}
}
