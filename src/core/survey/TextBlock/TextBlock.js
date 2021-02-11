/*
 * File: /src/core/survey/TextBlock/TextBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 10th February 2021 11:15 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 1:43 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */
import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import QuestionLabel from '../QuestionLabel';
import TextField from '../../input/TextField';

/**
 * Class for Text Block on survey forms
 */
class TextBlock extends React.Component {

	/**
	 * Creates an instance of DateBlock.
	 * @param {*} props -
	 * @memberof DateBlock
	 */
	constructor(props){
		super(props);

		this.state = {
			isValid: true,
			errorMessage: "",
			value: null,
		};
	}

	/**
	 * Event handler for value change events
	 *
	 * @param {object} value - Event handler event
	 * @memberof DateBlock
	 */
	onValueChanged(value){
		value = value.target.value;
		var output = value;
		if(output.constructor !== Array){
			output = [output];
		}
		this.props.onValueChanged(this.props.identifier, output);
	}

	/**
	 * Render TextBlock question
	 *
	 * @returns {*} - 
	 * @memberof TextBlock
	 */
	render(){
		return <div>
			<QuestionLabel 
			label={this.props.label} 
			helperText={this.props.helperText} 
			isRequired={this.props.isRequired} 
			number={this.props.number}/>
			<FormControl fullWidth>
				<TextField 
				type={this.props.config.textType}
				onValueChanged={this.onValueChanged.bind(this)} 
				value={this.props.value ? this.props.value[0] : ""} 
				hasError={this.props.hasError} 
				subText={this.props.subText}/>
			</FormControl>
		</div>;
	}
}

TextBlock.defaultProps = {
	variant: "standard",
	isRequired: false
};

TextBlock.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	hasError: PropTypes.bool,
	subText: PropTypes.string,

	identifier: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	number: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	onValueChanged: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	helperText: PropTypes.string,
	config: PropTypes.shape({
		textType: PropTypes.string,
		matchesPattern: PropTypes.string,
	}),
	isRequired: PropTypes.bool
};

export default TextBlock;