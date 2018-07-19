
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Post from '../SBMedia.Post/SBMedia.Post.Pres.www';

// --- COMPONENT

const PostList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export default class PostsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postOptionsSelected: [],
		};
		this.handleClickPost = this.handleClickPost.bind(this);
	}
	handleClickPost() {
		
	}
	addPost() {

	}
	deletePost() {

	}
	render() {
		// console.log(this.props.posts);
		if (this.props.posts && this.props.posts[0]) {
			return (
				<PostList>
					{
						this.props.posts.map(postValue => (
							<Post
								key={postValue.id}
								postContent={postValue}
							/>
						))
					}
				</PostList>
			);
		}
		return (
			<p>Sorry, I can&apos;t find any messages to show you.</p>
		);
	}
}
