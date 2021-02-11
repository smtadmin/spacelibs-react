/*
 * File: /src/core/survey/QuestionLabel/QuestionLabel.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Wednesday, 10th February 2021 11:08 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 10th February 2021 11:12 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../input/Tooltip';

/**
 * Label component for survey questions
 */
class QuestionLabel extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return <div style={{'fontFamily':'arial'}}>
			{this.props.number}. {this.props.label} {this.props.isRequired && <span style={{color:'red'}}>*</span>} <Tooltip text={this.props.helperText}/>
		</div>;
	}
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