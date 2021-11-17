/*
 * File: /src/core/input/DateField/DateField.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs date field with no keyboard input
 * File Created: Tuesday, 9th February 2021 3:31 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 16th November 2021 2:13 pm
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
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
  constructor(props) {
    super(props);
  }

  /**
   * Event handler for when date changes in field
   *
   * @param {*} event - Date field event
   * @memberof DateField
   */
  onValueChanged(event) {
    if (event && event._d) {
      this.props.onValueChanged(event._d);
    } else {
      this.props.onValueChanged(null);
    }
  }

  /**
   * Renders Date Field component
   *
   * @returns {object} - Date Field component
   * @memberof DateField
   */
  render() {
    let date = null;
    let selected = this.props.value;

    if (selected) {
      if (selected.constructor === Array) {
        if (selected.length > 0) {
          date = selected[0];
        }
      } else {
        date = selected;
      }
    }

    return (
      <>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container>
            <DatePicker
              minDate={this.props.minDate}
              autoOk={this.props.closeOnSelect}
              data-testid={'date-input'}
              disableToolbar
              disabled={this.props.isDisabled}
              variant='inline'
              format={this.props.format}
              margin='normal'
              label={this.props.label}
              placeholder={this.props.placeholder}
              value={date}
              disabledToolbar={this.props.disabledToolbar}
              views={this.props.views}
              onChange={this.onValueChanged.bind(this)}
              allowKeyboardControl={true}
              KeyboardButtonProps={{}}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.subText && this.props.subText.length > 0 && (
          <FormHelperText>{this.props.subText}</FormHelperText>
        )}
      </>
    );
  }
}

/**
 * Default Props
 */
DateField.defaultProps = {
  variant: 'standard',
  closeOnSelect: true
};

/**
 * Expected Props
 */
DateField.propTypes = {
  isDisabled: PropTypes.bool,

  closeOnSelect: PropTypes.bool,

  // Value of the date field, shown in the input
  value: PropTypes.arrayOf(PropTypes.any),

  // Whether or not datefield is in error
  hasError: PropTypes.bool,

  // Text that appears under the
  subText: PropTypes.string,

  // Changes how the field looks
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),

  label: PropTypes.string,

  // Value to be on the field when nothing is entered
  placeholder: PropTypes.string,

  // Date format that the field should follow
  format: PropTypes.string,

  // Event handler for value changes
  onValueChanged: PropTypes.func,

  // Toolbar disabled/enabled
  disabledToolbar: PropTypes.bool,

  views: PropTypes.array,

  minDate: PropTypes.any
};

export default DateField;
