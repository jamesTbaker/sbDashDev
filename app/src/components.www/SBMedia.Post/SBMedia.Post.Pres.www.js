
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';

// --- COMPONENT


const PostContainer = styled.li`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const PostImage = styled.img`
	width: 100%;
	opacity: .1;
`;

export default (props) => {
	console.log(props.postContent);
	return (
		<PostContainer>
			<PostImage src={props.postContent.photos[0].alt_sizes[3].url} />
		</PostContainer>
	);
};
