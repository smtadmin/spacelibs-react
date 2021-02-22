/*
 * File: /src/core/survey/TextField/TextBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs TextField input
 * File Created: Wednesday, 10th February 2021 8:26 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 19th February 2021 2:26 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MuiTextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * Text Block class
 */
class TextField extends React.Component {
	
	/**
	 * Creates an instance of TextField.
	 * 
	 * @param {*} props - TextField props
	 * @memberof TextField
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Event handler for TextField value chaning
	 *
	 * @param {*} event - Text input change event
	 * @memberof TextField
	 */
	onValueChanged(event){
		this.props.onValueChanged(event);
	}

	/**
	 * Renders the TextField component
	 *
	 * @returns {object} - TextField child elements 
	 * @memberof TextField
	 */
	render(){
		return <FormControl>
			<MuiTextField 
			variant={this.props.variant}
			data-testid={"textfield-input"}
			type={this.props.type}
			onChange={this.onValueChanged.bind(this)}
			value={this.props.value}
			error={this.props.isValid ? null : true}
			/>
			</FormControl>;
	}
}

/**
 * Default Props
 */
TextField.defaultProps = {
	variant: "standard"
};

/**
 * Accepted Props
 */
TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	onValueChanged: PropTypes.func.isRequired,
	value: PropTypes.string,
	isValid: PropTypes.bool,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"])
};

export default TextField;