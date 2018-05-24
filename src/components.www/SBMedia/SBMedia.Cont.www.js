
// --- IMPORTS

import { injectGlobal } from 'styled-components';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'rebass';

import SBMediaTheme from '../../theme/SBMedia.Theme';

import SBMediaNav from '../SBMedia.Nav/SBMedia.Nav.Pres.www';

import LineAwesomeEOT from '../../fonts/line-awesome.eot';
import LineAwesomeTTF from '../../fonts/line-awesome.ttf';
import LineAwesomeWOFF from '../../fonts/line-awesome.woff';
import LineAwesomeWOFF2 from '../../fonts/line-awesome.woff2';
import LineAwesomeSVG from '../../fonts/line-awesome.svg';


injectGlobal`
	* { box-sizing: border-box; }
	html { font-size: 10px; }
	body { font-size: 1.6rem; margin: 0; background-color: #222; color: #ddd} 

	@font-face {
		font-family: 'LineAwesome';
		src: url(${LineAwesomeEOT});
		src: url(${LineAwesomeEOT}) format("embedded-opentype"),
			url(${LineAwesomeWOFF2}) format("woff2"),
			url(${LineAwesomeWOFF}) format("woff"),
			url(${LineAwesomeTTF}) format("truetype"),
			url(${LineAwesomeSVG}) format("svg");
		font-weight: normal;
		font-style: normal;
	}

	@media screen and (-webkit-min-device-pixel-ratio:0) {
		@font-face {
			font-family: "LineAwesome";
			src: url("../../fonts/line-awesome.svg?v=1.1.#fa") format("svg");
		}
	}
`;

// --- COMPONENT


export default class SBDashApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showScreenDash: true,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: false,
		};
		this.handleButtonDashClick = this.handleButtonDashClick.bind(this);
		this.handleButtonBlogsClick = this.handleButtonBlogsClick.bind(this);
		this.handleButtonSBClick = this.handleButtonSBClick.bind(this);
		this.handleButtonAdminClick = this.handleButtonAdminClick.bind(this);
	}
	handleButtonDashClick() {
		this.setState({
			showScreenDash: true,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: false,
		});
	}
	handleButtonBlogsClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: true,
			showScreenSB: false,
			showScreenAdmin: false,
		});
	}
	handleButtonSBClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: false,
			showScreenSB: true,
			showScreenAdmin: false,
		});
	}
	handleButtonAdminClick() {
		this.setState({
			showScreenDash: false,
			showScreenBlogs: false,
			showScreenSB: false,
			showScreenAdmin: true,
		});
	}
	render() {
		return (
			<Provider
				theme={SBMediaTheme}
			>
				{
					this.state.showScreenDash &&

					<p>Dash</p>
				}
				{
					this.state.showScreenBlogs &&

					<p>Blogs</p>
				}
				{
					this.state.showScreenSB &&

					<p>SB</p>
				}
				{
					this.state.showScreenAdmin &&

					<p>Admin</p>
				}
				<SBMediaNav
					handleButtonDashClick={this.handleButtonDashClick}
					handleButtonBlogsClick={this.handleButtonBlogsClick}
					handleButtonSBClick={this.handleButtonSBClick}
					handleButtonAdminClick={this.handleButtonAdminClick}
				/>
			</Provider>
		);
	}
}


ReactDOM.render(<SBDashApp />, document.getElementById('react-root'));
