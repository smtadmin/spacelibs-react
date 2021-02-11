/*
 * File: /src/core/survey/ChoiceBlock/ChoiceBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Monday, 8th February 2021 11:15 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 3:39 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import SelectField from '../../input/SelectField';
import FormControl from '@material-ui/core/FormControl';
import CheckboxGroup from '../../input/CheckboxGroup';
import RadioGroup from '../../input/RadioGroup';
import QuestionLabel from '../QuestionLabel';

/**
 * Class for Select pickers on survey forms
 */
class ChoiceBlock extends React.Component {
	
	/**
	 * Creates an instance of SelectField.
	 * @param {object} props - Props for the SelectField components
	 * @memberof ChoiceBlock
	 */
	constructor(props){
		super(props);
		this.state = {
			selectedValues: []
		};

		this.valueChanged.bind(this);
	}

	/**
	 * Event handler for value change events
	 *
	 * @param {object} output - Event handler event
	 * @memberof ChoiceBlock
	 */
	valueChanged(output){
		if(output.constructor !== Array){
			output = [output];
		}
		this.props.onValueChanged(this.props.identifier, output);
	}

	/**
	 * Returns the first selected value object
	 * 
	 * @returns {object} Value object
	 * @memberof ChoiceBlock
	 */
	getFirstSelectedValue(){
		const options = this.props.config.options;
		for(var x = 0; x < options.length; x++){
			if(options[x].isSelected){
				return options[x];
			}
		}
		return {};
	}

	/**
	 * Renders SelectField
	 *
	 * @returns {object} a Component to display
	 * @memberof SelectField
	 */
	render(){
		let color = "primary";
		let input;
		let isSelect = this.props.config.options.length > 4;

		if(isSelect){
			input = <SelectField 
			{...this.props}
			onValueChanged={this.valueChanged.bind(this)} 
			/>;
		}else if(this.props.config.isMultiple){
			input = <CheckboxGroup 
			{...this.props}
			color={color}
			onValueChanged={this.valueChanged.bind(this)} 
			/>;
		}else{
			input = <RadioGroup 
			{...this.props}
			color={color}
			onValueChanged={this.valueChanged.bind(this)} 
			/>;
		}

		return<>
			<QuestionLabel label={this.props.label} helperText={this.props.helperText} isRequired={this.props.isRequired} number={this.props.number}/>
			<FormControl fullWidth>
				{input}
			</FormControl>
		</>;
	}
}

/**
 * Default Props
 */
ChoiceBlock.defaultProps = {
	color: "default",
	alignment: 'vertical',
	labelPlacement: "right"
};

ChoiceBlock.propTypes = {
	value: PropTypes.arrayOf(PropTypes.any),
	hasError: PropTypes.bool,
	subText: PropTypes.string,

	identifier: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	helperText: PropTypes.string,
	isRequired: PropTypes.bool,

	color: PropTypes.string,
	labelPlacement: PropTypes.oneOf(["left", "top", "right", "bottom"]),
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	inputLabel: PropTypes.string,
	placeholder: PropTypes.string,
	onValueChanged: PropTypes.func.isRequired,
	hideSelectedValueInInput: PropTypes.bool,
	config: PropTypes.shape({
		isMultiple: PropTypes.bool,
		maxCount: PropTypes.number, // Also used by Text
		alternateResponseAllowed: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.shape({
			identifier: PropTypes.string.isRequired,
			displayText: PropTypes.string.isRequired,
			helperText: PropTypes.string,
			isSelected: PropTypes.bool,
			isDisabled: PropTypes.bool
		})).isRequired
	})
};

export default ChoiceBlock;