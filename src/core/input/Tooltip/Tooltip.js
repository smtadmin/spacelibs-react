/*
 * File: /src/core/survey/Tooltip/Tooltip.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Tooltip component
 * File Created: Monday, 8th February 2021 5:07 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 5:04 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import MuiTooltip from '@material-ui/core/Tooltip';

/**
 * Tooltip class
 */
class Tooltip extends React.Component {

	/**
	 * Creates an instance of Tooltip.
	 * @param {object} props - Component props
	 * @memberof Tooltip
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Renders a Tooltip component
	 *
	 * @returns {object} - Tooltip component 
	 * @memberof Tooltip
	 */
	render(){
		if(this.props.text == null || this.props.text === ""){
			return null;
		}
		return <MuiTooltip arrow title={this.props.text}>
			<span> ⓘ</span>
		</MuiTooltip>;
	}
}

Tooltip.propTypes = {
	text: PropTypes.string
};

export default Tooltip;