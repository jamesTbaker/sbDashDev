
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import PostOption from '../SBMedia.PostOption/SBMedia.PostOption.Pres.www';

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
			postOptionsSelected: [
				{
					tumblrID: 175656834461,
					mongoID: 175656834461,
				}, {
					tumblrID: 175656586575,
					mongoID: 175656586575,
				},
			],
		};
		this.handlePostOptionClick = this.handlePostOptionClick.bind(this);
	}
	returnThisTumblrIDInThisElement(tumblrID, arrayElement) {
		return arrayElement.tumblrID === tumblrID;
	}
	returnPostOptionIsSelected(tumblrID) {
		let selected = false;
		this.state.postOptionsSelected.forEach((selectedOption) => {
			if (this.returnThisTumblrIDInThisElement(tumblrID, selectedOption)) {
				selected = true;
			}
		});
		return selected;
	}
	handlePostOptionClick(tumblrID, selected) {
		if (selected) {
			this.deletePostOptionFromDatabase(tumblrID);
		} else {
			this.addPostOptionToDatabaseAndState(tumblrID);
		}
	}
	addPostOptionToDatabaseAndState(tumblrID) {
		this.addPostOptionToDatabase(tumblrID);
		this.addPostOptionToState(tumblrID);
	}
	addPostOptionToDatabase(tumblrID) {
		console.log('addPostOptionToDatabase');
		console.log(tumblrID);
	}
	addPostOptionToState(tumblrID, mongoID) {
		console.log('addPostOptionToState');
		console.log(tumblrID);
	}
	deletePostOptionFromDatabase(tumblrID) {
		console.log('deletePostOptionToDatabase');
		console.log(tumblrID);
	}
	render() {
		// console.log(this.props.posts);
		if (this.props.posts && this.props.posts[0]) {
			return (
				<PostList>
					{
						this.props.posts.map(postValue => (
							<PostOption
								key={postValue.id}
								postOptionContent={postValue}
								postOptionSelected={this.returnPostOptionIsSelected(postValue.id)}
								handlePostOptionClick={this.handlePostOptionClick}
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
