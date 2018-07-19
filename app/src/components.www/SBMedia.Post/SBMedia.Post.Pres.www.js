
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import SeasonSelect from '../SBMedia.SeasonSelect/SBMedia.SeasonSelect.Pres.www';

// --- COMPONENT

const PostContainer = styled.li`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const PostImage = styled.img`
	width: 100%;
`;

// const PostTags = styled.input`
// `;

// const PostComments = styled.textarea`
// `;


export default (props) => {
	console.log(props.postContent);
	return (
		<PostContainer>
			<PostImage
				src={props.postContent.photos[0].alt_sizes[3].url}
			/>
			<SeasonSelect />
			{/* <PostTags type="text" />
			<PostComments /> */}
		</PostContainer>
	);
};
