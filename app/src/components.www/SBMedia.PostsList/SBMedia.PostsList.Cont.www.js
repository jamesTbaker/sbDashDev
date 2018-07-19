
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import PostOption from '../SBMedia.PostOption/SBMedia.PostOption.Pres.www';

const PostsListsData = require('./SBMedia.PostsList.Data');

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
		if (arrayElement.tumblrID) {
			return arrayElement.tumblrID === tumblrID;
		}
		return arrayElement.id === tumblrID;
	}
	returnPostOptionFromProps(tumblrID) {
		let neededPostOption = null;
		this.props.posts.forEach((postOption) => {
			if (this.returnThisTumblrIDInThisElement(tumblrID, postOption)) {
				neededPostOption = postOption;
			}
		});
		return neededPostOption;
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
		// get a promise to post the post data to the API
		this.addPostOptionToDatabase(tumblrID)
			// if the promise is resolved with a result
			.then((result) => {
				console.log('addPostOptionToDatabaseAndState - result');
				console.log(result);
				// add the tumblrID and the mongoID to state
				// this.addPostOptionToState(tumblrID, result.id);
			});
	}
	addPostOptionToDatabase(tumblrID) {
		// return a new promise
		return new Promise((resolve, reject) => {
			const post = this.returnPostOptionFromProps(tumblrID);
			// get a promise to post the post data to the API
			PostsListsData.AddPostOptionToDatabaseAndReturnID(post)
				// if the promise is resolved with a result, then resolve this promise with the result
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, 
				// 		then reject this promise with the error
				.catch((error) => { reject(error); });
		});
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
