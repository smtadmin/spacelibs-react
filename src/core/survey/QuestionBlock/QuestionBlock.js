/*
 * File: /src/core/survey/QuestionBlock/QuestionBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Tuesday, 9th February 2021 6:10 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 2:57 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ChoiceBlock from '../ChoiceBlock';
import DateBlock from '../../survey/DateBlock';
import TextBlock from '../../survey/TextBlock';

/**
 * 
 */
class QuestionBlock extends React.Component {

	/**
	 * Creates an instance of QuestionBlock.
	 * @param {*} props -
	 * @memberof QuestionBlock
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Render Question Block
	 *
	 * @returns {*} - Rendered component
	 * @memberof QuestionBlock
	 */
	render(){
		let input;
		let props = this.props;
		
		if(this.props.type === "choice"){
			input = <ChoiceBlock {...props} />;
		}else if(this.props.type === "date"){
			input = <DateBlock {...props} />;
		}else if(this.props.type === "text"){
			input = <TextBlock {...props} />;
		}else{
			return null;
		}
		return <>
		<br></br><br></br>
			{input}
		</>;
	}
}

QuestionBlock.defaultProps = {
	variant: "standard",
	isRequired: false	
};

QuestionBlock.propTypes = {
	value: PropTypes.any,
	hasError: PropTypes.bool,
	subText: PropTypes.string,

	identifier: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	label: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
	helperText: PropTypes.string,
	type: PropTypes.oneOf(["date", "choice", "text"]).isRequired,
	placeholder: PropTypes.string,
	config: PropTypes.exact({

		// Choice details
		isMultiple: PropTypes.bool,
		maxCount: PropTypes.number, // Also used by Text
		alternateResponseAllowed: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.exact({
			identifier: PropTypes.string.isRequired,
			displayText: PropTypes.string.isRequired,
			helperText: PropTypes.string,
			isSelected: PropTypes.bool,
			isDisabled: PropTypes.bool
		})),

		// Date
		minDate: PropTypes.string,
		maxDate: PropTypes.string,

		// Text
		textType: PropTypes.string,
		matchesPattern: PropTypes.string,
	}).isRequired,
	onValueChanged: PropTypes.func.isRequired,
};

export default QuestionBlock;