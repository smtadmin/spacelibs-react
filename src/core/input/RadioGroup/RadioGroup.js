/*
 * File: /src/core/input/RadioGroup/RadioGroup.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Radio group field
 * File Created: Monday, 8th February 2021 3:18 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 13th July 2021 2:11 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
*/

import React from 'react';
import PropTypes from 'prop-types';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '../Tooltip';

/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { withTheme } from "@material-ui/core/styles";

/**
 * Class for Radio buttons
 */
class RadioGroup extends React.Component {	
	
	/**
	 * Creates an instance of RadioGroup.
	 * @param {object} props - Component props
	 * @memberof RadioGroup
	 */
	constructor(props) {
		super(props);	
	}	

	/**
	 * Event Handler for a radio button click event.  Calls this.props.onValueChanged and returns selected value
	 *
	 * @param {event} event - the name of the radio button selected
	 * @memberof RadioGroup
	 */
	onValueChanged(event) {
		var identifier = event.target.value;		
		var selectedValue;
		for (var x = 0; x < this.props.config.options.length; x++) {
			var value = this.props.config.options[x];
			if (value.identifier === identifier) {
				selectedValue = value;
			}
		}		
		this.props.onValueChanged(selectedValue);
	}	

	/**
	 * Returns a rendered Form Control Label with a radio button
	 *
	 * @param {object} option - Option object to become a radio button
	 * @returns {object} A Form Control Label with a radio button 
	 * @memberof RadioGroup
	 */
	getFormControlLabel(option) {
		let placement = this.props.labelPlacement;
		let muiPlacement;
		if (placement === "right") { muiPlacement = "end"; }
		else if (placement === "left") { muiPlacement = "start"; }
		else { muiPlacement = placement; }		
		return <FormControlLabel
			key={option.identifier}
			disabled={option.isDisabled == null ? false : option.isDisabled}
			value={option.identifier}
			control={<Radio color={this.props.color} />}
			label={<div>
				<span css={css`color: ${this.props.theme.palette.text.primary};`}>{option.displayText}</span>
				<Tooltip text={option.helperText} />
			</div>}
			labelPlacement={muiPlacement}
		/>;
	}	
	
	/**
	 * Returns a rendered Form List for the radio buttons
	 *
	 * @returns {object} From List 
	 * @memberof RadioGroup
	 */
	getFormControlList() {
		let children = [];
		this.props.config.options.map((option) => {
			children.push(this.getFormControlLabel(option));
		});		
		return children;
	}	
	
	/**
	 * Renders RadioGroup component
	 * 
	 * @returns {object} Form Group component with radio buttons inside
	 * @memberof RadioGroup
	 */
	render() {
		let selectedValue = "";
		var value = this.props.value;
		if (value && value.constructor === Array && value.length === 1) {
			selectedValue = value[0].identifier;
		}		
		return <MuiRadioGroup
			row={this.props.row}
			data-testid={"radio-group"}
			value={selectedValue}
			onChange={this.onValueChanged.bind(this)}>
			{this.getFormControlList()}
		</MuiRadioGroup>;
	}
}

/**
 * Default Props
 */
RadioGroup.defaultProps = {
	color: "default",
	alignment: 'vertical',
	labelPlacement: "right"
};

/**
 * Expected Props
 */
RadioGroup.propTypes = {
	row: PropTypes.bool,
	value: PropTypes.arrayOf(PropTypes.any),
	isValid: PropTypes.bool,
	color: PropTypes.string,
	labelPlacement: PropTypes.oneOf(["left", "top", "right", "bottom"]),
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	onValueChanged: PropTypes.func.isRequired,
	config: PropTypes.shape({
		alternateResponseAllowed: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.shape({
			identifier: PropTypes.string.isRequired,
			displayText: PropTypes.string.isRequired,
			helperText: PropTypes.string,
			isSelected: PropTypes.bool,
			isDisabled: PropTypes.bool
		})).isRequired
	}),
	theme: PropTypes.any
};

export default withTheme(RadioGroup);