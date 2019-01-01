
// --- IMPORTS

import * as React from 'react';
import styled from 'styled-components';
import Button from '../SBMedia.Button/SBMedia.Button.Pres.www';
import StylePatterns from '../SBMedia.StylePatterns/SBMedia.StylePatterns.Data';
import SelectOption from '../SBMedia.SelectOption/SBMedia.SelectOption.Pres.www';

// --- COMPONENT

/* const ReturnButtonVerticalPadding = (buttonHeight, contentHeight, topOrBottom) => {
	const timesTen = parseFloat(((buttonHeight - contentHeight) / 2).toFixed(2)) * 10;
	const rounded = topOrBottom === 'top' ? Math.ceil(timesTen) : Math.floor(timesTen);
	return rounded / 10;
}; */

/* const SelectBase = styled.button`
	display: inline-block;
	border: 0;
	background-color: ${props => props.defaultBackgroundColor};
	color: ${props => props.defaultContentColor};
	cursor: pointer;
	transition: color ${StylePatterns.StandardTransitionTime()}, background-color ${StylePatterns.StandardTransitionTime()};

	&:hover {
		background-color: ${props => props.activeBackgroundColor};
		color: ${props => props.activeContentColor};
	}
`; */


const PostContainer = styled.div`
	padding: 1rem;
	background-color: ${StylePatterns.Color('blue1')};
`;


export default class Select extends React.Component {
	constructor(props) {
		super(props);
		console.log('constructor props');
		console.log(this.props);
		this.state = {
			showOptions: false,
			selectedOption: {},
		};
		this.handleShowOptionsButtonClick = this.handleShowOptionsButtonClick.bind(this);
		this.handleSelectionButtonClick = this.handleSelectionButtonClick.bind(this);
	}
	
	returnDefaultOption(options) {
		console.log('returnDefaultOption');
		console.log(options);
		let defaultOption = {};
		this.props.options.forEach((option) => {
			if (option.default) {
				defaultOption = option;
			}
		});
		return defaultOption;
	}
	handleShowOptionsButtonClick() {
		console.log('handleShowOptionsButtonClick');
		this.setState(prevState => ({
			showOptions: !prevState.showOptions,
		}));
	}
	render() {
		console.log('select rendering');
		// console.log('select props');
		// console.log(this.props);
		// console.log('select state');
		// console.log(this.state);
		return (
			<div>
				<Button
					buttonHeight="3"
					iconContent="angle-down"
					contentHeight="2.2"
					text={this.state.selectedOption.display}
					defaultBackgroundColor={StylePatterns.Color('blue1')}
					defaultContentColor={StylePatterns.Color('yellow')}
					activeBackgroundColor={StylePatterns.Color('blue2')}
					activeContentColor={StylePatterns.Color('yellow')}
					clickHandler={this.handleShowOptionsButtonClick}
				/>
				{
					this.state.showOptions && this.props.options[0] &&

					<PostContainer>
						{
							this.props.options.map(option => (
								<SelectOption
									key={option.key}
									option={option}
									clickHandler={this.handleSelectionButtonClick}
								/>
							))
						}
					</PostContainer>
				}
			</div>
		);
	}
}
