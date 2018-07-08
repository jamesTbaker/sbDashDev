
// --- IMPORTS

import * as React from 'react';
import PostsList from '../SBMedia.PostsList/SBMedia.PostsList.Cont.www';

const DashData = require('./SBMedia.Dash.Data');

// --- COMPONENT

export default class SBMediaDashContainer extends React.Component {
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
		DashData.ReturnDashboardPosts(this.state.dashPostsQuantityRequested)
			.then((returnedDashPosts) => {				
				this.setState((prevState) => {
					const previousPostsArray = prevState.dashPosts;
					const currentPostsArray = [...previousPostsArray, returnedDashPosts];
					console.log('value');
					console.log(value);
					console.log('value');
					console.log(value);
					console.log('value');
					console.log(value);
					return {
						dashPosts: currentPostsArray,
					};
				});
			});
	}
	render() {
		// console.log('rendering dash');
		// console.log(this.state.dashPosts);
		return (
			<div>
				<PostsList
					posts={this.state.dashPosts}
				/>
			</div>
		);
	}
}
