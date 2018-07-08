
// --- IMPORTS

import * as React from 'react';
import Post from '../SBMedia.Post/SBMedia.Post.Cont.www';

// --- COMPONENT

export default class PostsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			XXX: true,
		};
		// this.XXX = this.XXX.bind(this);
	}
	render() {
		// console.log(this.props.posts);
		if (this.props.posts && this.props.posts[0]) {
			return (
				<ul>
					{
						this.props.posts.map(postValue => (
							<Post
								key={postValue.id}
								postContent={postValue}
							/>
						))
					}
				</ul>
			);
		}
		return (
			<p>Sorry, I can&apos;t find any messages to show you.</p>
		);
	}
}
