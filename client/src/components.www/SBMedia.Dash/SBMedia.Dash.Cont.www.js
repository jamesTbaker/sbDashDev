
// --- IMPORTS

import * as React from 'react';
import PostsList from '../SBMedia.PostsList/SBMedia.PostsList.Cont.www';

const DashData = require('./SBMedia.Dash.Data');

// --- COMPONENT

export default class SBMediaDashContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postOptions: [],
			dashPostsQuantityRequested: 0,
		};
		// this.XXX = this.XXX.bind(this);
	}
	componentDidMount() {
		// get a promise to return a batch of dashboard posts
		DashData.ReturnDashboardPosts(this.state.dashPostsQuantityRequested)
			.then((returnedPostOptions) => {
				this.setState((prevState) => {
					const previousPostOptionsArray = prevState.postOptions;
					const currentPostOptionsArray = [...previousPostOptionsArray, ...returnedPostOptions];
					return {
						postOptions: currentPostOptionsArray,
					};
				});
			});
	}
	render() {
		// console.log('rendering dash');
		// console.log(this.state.postOptions);
		return (
			<div>
				<PostsList
					posts={this.state.postOptions}
				/>
			</div>
		);
	}
}
