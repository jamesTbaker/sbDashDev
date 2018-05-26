
// --- IMPORTS

import { injectGlobal } from 'styled-components';
import * as React from 'react';
import * as ReactDOM from 'react-dom';


injectGlobal`
	* { box-sizing: border-box; }
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
			<div>
				{/* <Provider
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
				</Provider> */}
			</div>
		);
	}
}


ReactDOM.render(<SBDashApp />, document.getElementById('react-root'));
