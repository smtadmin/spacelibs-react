/*
 * File: /src/core/survey/DateBlock/DateBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 9th February 2021 4:31 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 4:00 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import QuestionLabel from '../QuestionLabel';
import DateField from '../../input/DateField';

/**
 * Class for Select pickers on survey forms
 */
class DateBlock extends React.Component {

	/**
	 * Creates an instance of DateBlock.
	 * @param {*} props
	 * @memberof DateBlock
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Event handler for value change events
	 *
	 * @param {object} output - Event handler event
	 * @memberof DateBlock
	 */
	onValueChanged(output){
		if(output.constructor !== Array){
			output = [output];
		}
		this.props.onValueChanged(this.props.identifier, output);
	}

	
	render(){
		return <div>
			<QuestionLabel 
			label={this.props.label} 
			helperText={this.props.helperText} 
			isRequired={this.props.isRequired} 
			number={this.props.number}/>
			<FormControl fullWidth>
				<DateField 
				{...this.props}
				onValueChanged={this.onValueChanged.bind(this)}
				/>
			</FormControl>
		</div>;
	}
}

DateBlock.defaultProps = {
	variant: "standard",
	isRequired: false
};

DateBlock.propTypes = {
	value: PropTypes.arrayOf(PropTypes.any),
	hasError: PropTypes.bool,
	subText: PropTypes.string,

	identifier: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	number: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	onValueChanged: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	helperText: PropTypes.string,
	isRequired: PropTypes.bool
};

export default DateBlock;