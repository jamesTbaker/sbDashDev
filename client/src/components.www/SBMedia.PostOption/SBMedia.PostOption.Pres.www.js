
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';
// import SeasonSelect from '../SBMedia.SeasonSelect/SBMedia.SeasonSelect.Pres.www';

// --- COMPONENT

const PostContainer = styled.li`
	list-style: none;
	padding: 0;
	margin: 0 0 2rem 0;
`;

const PostImage = styled.img`
	display: block;
	width: 100%;
`;

const PostOptionsContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue2')};
`;

const PostOptionsHeaderContainer = styled.div`
	display: grid;
	grid-template-columns: 50px 1fr;
`;

const PostOptionsButtonContainer = styled.div`
`;
const PostBlogNameContainer = styled.div`
	padding-top: .6rem	
	font-size: ${StylePatterns.FontSize('xs')};
	text-align: right;
	color: ${StylePatterns.Color('grey13')};
`;


const PostOptionsBodyContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue3')};
`;
const PostTags = styled.input`
	width: 100%;
	padding: .4rem 1.1rem;
	height: 3.2rem;
	font-size: 1.4rem;
	line-height: 1.5;
	color: ${StylePatterns.Color('yellow')};
	background-color: ${StylePatterns.Color('blue1')};
	border: none;
	border-radius: .2rem;
`;

const PostComments = styled.textarea`
	width: 100%;
	padding: .4rem 1.1rem;
	height: 4.7rem;
	font-family: 'Roboto',sans-serif;
	font-size: 1.4rem;
	line-height: 1.5;
	color: ${StylePatterns.Color('yellow')};
	background-color: ${StylePatterns.Color('blue1')};
	border: none;
	border-radius: .2rem;
`;


export default class PostsOption extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			added: false,
			showPostOptions: false,
		};
		this.handlePostOptionsButtonClick = this.handlePostOptionsButtonClick.bind(this);
	}
	handlePostOptionsButtonClick() {
		console.log('handlePostOptionsButtonClick');
		this.setState(prevState => ({
			showPostOptions: !prevState.showPostOptions,
		}));
	}

	render() {
		return (
			<PostContainer>
				<PostImage
					src={this.props.postOptionContent.photos[0].alt_sizes[3].url}
					postOptionID={this.props.postOptionContent.id}
					postOptionSelected={this.props.postOptionSelected}
					// onClick={
					// 	e => 
					// 		props
					// 			.handlePostOptionClick(this.props.postOptionContent.id, this.props.postOptionSelected, e)
					// }
				/>
				<PostOptionsContainer>
					<PostOptionsHeaderContainer>
						<PostOptionsButtonContainer>
							<Button
								buttonHeight="3"
								iconContent="ellipsis-h"
								contentHeight="2.2"
								text="Post Options"
								textInvisible
								defaultBackgroundColor="transparent"
								defaultContentColor={StylePatterns.Color('red5')}
								activeBackgroundColor="transparent"
								activeContentColor={StylePatterns.Color('red3')}
								clickHandler={this.handlePostOptionsButtonClick}
							/>
						</PostOptionsButtonContainer>
						<PostBlogNameContainer>{this.props.postOptionContent.blog_name}</PostBlogNameContainer>
					</PostOptionsHeaderContainer>
					{
						this.state.showPostOptions &&

						<PostOptionsBodyContainer>
							{/* <SeasonSelect /> */}
							<PostTags type="text" />
							<PostComments />
						</PostOptionsBodyContainer>
					}
				</PostOptionsContainer>
			</PostContainer>
		);
	}
}
