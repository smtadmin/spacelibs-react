/*
 * File: /src/core/input/Button/Button.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Button class
 * File Created: Thursday, 11th February 2021 12:37 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 23rd June 2021 2:01 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from "@material-ui/core/Button";

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
		const {className, startIcon, endIcon, children, ...leftOver} = this.props;
		return (
            <MuiButton
                data-testid={"button"}
                className={"sl-button " + className}
                startIcon={startIcon ? startIcon : null}
                endIcon={endIcon ? endIcon : null}
                {...leftOver}>
                {children}
            </MuiButton>
        );
	}
}

/**
 * Default props
 */
Button.defaultProps = {
	variant: "contained",
	color: "primary"
};

/**
 * Props this component takes
 */
Button.propTypes = {
    children: PropTypes.any,
    variant: PropTypes.oneOf(["contained", "outlined", "text"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    color: PropTypes.oneOf(["default", "primary", "secondary"]),
    onClick: PropTypes.func,
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    className: PropTypes.string,
};

export default Button;
