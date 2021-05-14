/*
 * File: /src/core/survey/QuestionLabel/QuestionLabel.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Question Label component
 * File Created: Wednesday, 10th February 2021 11:08 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 12th May 2021 10:26 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../../input/Tooltip';

/**
 * QuestionLabel Component
 * 
 * @param {*} props - Component props
 * @returns {*} Component
 */
function QuestionLabel(props) {
	/**
	 * Returns the number label
	 *
	 * @returns {*} Number String
	 */
	function getNumber(){
		if(props.number == null)
			return null;
		else 
			return props.number + ".";
	}

	return <div 
	className={"question-label"}>
		{getNumber()} {props.label} {props.isRequired && <span style={{color:'red'}}>*</span>} <Tooltip text={props.helperText}/>
	</div>;
}

QuestionLabel.defaultProps = {
	isRequired: false
};

QuestionLabel.propTypes = {
	number: PropTypes.number,
	label: PropTypes.string.isRequired,
	helperText: PropTypes.string,
	isRequired: PropTypes.bool
};

export default QuestionLabel;