/*
 * File: /src/core/input/Button/Button.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Button class
 * File Created: Thursday, 11th February 2021 12:37 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 11th February 2021 3:34 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

/**
 * Button class
 */
class Button extends React.Component {

	/**
	 * Creates an instance of Button.
	 * @param {*} props - Button props
	 * @memberof Button
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Renders the Button
	 *
	 * @returns {object} - Button elements
	 * @memberof Button
	 */
	render(){
		return <MuiButton 
		variant={this.props.variant ? this.props.variant : "contained"}
		data-testid={'button'}
		className={"sl-button " + this.props.className}
		color={this.props.color ? this.props.color : 'default'}
		startIcon={this.props.startIcon}
		endIcon={this.props.endIcon}
		onClick={this.props.onClick}>
			{this.props.children}
		</MuiButton>;
	}
}

/**
 * Default props
 */
Button.defaultProps = {
	varaint: "contained",
	color: "default"
};

/**
 * Props this component takes
 */
Button.propTypes = {
	children: PropTypes.any,
	variant: PropTypes.oneOf(["contained","outlined","text"]),
	color: PropTypes.oneOf(["default","primary","secondary"]),
	onClick: PropTypes.func
};

export default Button;
