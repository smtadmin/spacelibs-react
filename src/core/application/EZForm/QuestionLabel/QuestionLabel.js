/*
 * File: /src/core/survey/QuestionLabel/QuestionLabel.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Question Label component
 * File Created: Wednesday, 10th February 2021 11:08 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 19th February 2021 3:04 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
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
	return <div 
	className={"question-label"}>
		{props.number}. {props.label} {props.isRequired && <span style={{color:'red'}}>*</span>} <Tooltip text={props.helperText}/>
	</div>;
}

QuestionLabel.defaultProps = {
	isRequired: false
};

QuestionLabel.propTypes = {
	number: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	helperText: PropTypes.string,
	isRequired: PropTypes.bool
};

export default QuestionLabel;