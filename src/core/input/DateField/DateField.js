/*
 * File: /src/core/input/DateField/DateField.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs date field
 * File Created: Tuesday, 9th February 2021 3:31 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 5:15 pm
 * Modified By: Justin Jeffrey (justin.jeffrey@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText';

/**
 * Class for Date field
 */
class DateField extends React.Component {

	/**
	 * Creates an instance of DateField.
	 * 
	 * @param {object} props - Component props
	 * @memberof DateField
	 */
	constructor(props){
		super(props);
	}

	/**
	 * Event handler for when date changes in field
	 *
	 * @param {*} event - Date field event
	 * @memberof DateField
	 */
	onValueChanged(event){
		if( event && event._d ){
			this.props.onValueChanged(event._d);
		}else{
			this.props.onValueChanged([]);
		}
	}

	/**
	 * Renders Date Field component
	 *
	 * @returns {object} - Date Field component
	 * @memberof DateField
	 */
	render(){
		let date, selected = this.props.value;
		if ( selected && selected.constructor === Array && selected.length === 1 ){
			date = selected[0];
		}else{
			date = null;
		}

		return <>
			<MuiPickersUtilsProvider
			utils={MomentUtils}>
				<Grid 
				container>
					<KeyboardDatePicker
					data-testid={"date-input"}
					disableToolbar
					variant="inline"
					format="MM/DD/yyyy"
					margin="normal"
					label={this.props.placeholder}
					value={date}
					onChange={this.onValueChanged.bind(this)}
					KeyboardButtonProps={{}}
					/>
				</Grid>
			</MuiPickersUtilsProvider>
			{ (this.props.subText && this.props.subText.length > 0) &&
				<FormHelperText>{this.props.subText}</FormHelperText>
			}
		</>
		;
	}
}

/**
 * Default Props
 */
DateField.defaultProps = {
	variant: "standard"
};

/**
 * Expected Props
 */
DateField.propTypes = {
  // Value of the date field, shown in the input
  value: PropTypes.arrayOf(PropTypes.any),

  // Whether or not datefield is in error
  hasError: PropTypes.bool,

  // Text that appears under the
  subText: PropTypes.string,

  // Changes how the field looks
  variant: PropTypes.oneOf(["standard", "filled", "outlined"]),

  // Value to be on the field when nothing is entered
  placeholder: PropTypes.string,

  // Date format that the field should follow
  format: PropTypes.string,

  // Event handler for value changes
  onValueChanged: PropTypes.func.isRequired,

};

export default DateField;