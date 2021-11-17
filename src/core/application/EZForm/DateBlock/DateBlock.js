/*
 * File: /src/core/survey/DateBlock/DateBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to render a Date Question
 * File Created: Friday, 19th February 2021 10:39 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 10th August 2021 4:55 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import QuestionLabel from '../QuestionLabel';
import DateField from '../../../input/DateField';
import ErrorLabel from '../ErrorLabel';

/**
 * Class for Select pickers on survey forms
 */
class DateBlock extends React.Component {
  /**
   * Event handler for value change events
   *
   * @param {object} output - Event handler event
   * @memberof DateBlock
   */
  onValueChanged(output) {
    if (output == null) {
      output = [];
    } else if (output.constructor !== Array) {
      output = [output];
    }
    this.props.onValueChanged(output);
  }

  /**
   * Renders Date Block component
   *
   * @returns {*} Date Block component
   * @memberof DateBlock
   */
  render() {
    return (
      <div className="question-input-wrapper">
        <FormControl fullWidth>
          <DateField
            {...this.props}
            onValueChanged={this.onValueChanged.bind(this)}
          />
        </FormControl>
        <ErrorLabel
          isValid={this.props.isValid}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

DateBlock.defaultProps = {
  variant: 'standard',
  required: false
};

DateBlock.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any),
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,

  identifier: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  number: PropTypes.number,
  onValueChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool
};

export default DateBlock;
