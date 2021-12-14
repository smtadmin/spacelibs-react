/*
 * File: /src/core/survey/SelectBlock/SelectBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class that renders a SelectBlock
 * File Created: Friday, 19th February 2021 10:49 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 14th December 2021 11:16 am
 * Modified By: Daniel Fong (daniel.fong@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import SelectField from '../../../input/SelectField';
import TextField from '../../../input/TextField';
import ErrorLabel from '../ErrorLabel';

/**
 * SelectBlock component
 */
class SelectBlock extends React.Component {
  /**
   * Creates an instance of SelectBlock.
   * @param {*} props - Component props
   * @memberof RadioBlock
   */
  constructor(props) {
    super(props);

    let object;
    for (var x = 0; x < this.props.value.length; x++) {
      if (this.props.value[x].identifier === this.props.altResponseId) {
        object = this.props.value[x];
        break;
      }
    }

    this.state = {
      values: this.props.value,
      showAlternateResponse: object != null,
      alternateValue: object != null ? object.value : ''
    };
  }

  /**
   * Event handler for value changing
   *
   * @param {*} output - value changed
   * @memberof SelectBlock
   */
  valueChanged(output) {
    if (output.constructor !== Array) {
      output = [output];
    }

    let flag = false;
    for (var x = 0; x < output.length; x++) {
      if (output[x].identifier === this.props.altResponseId) {
        flag = true;
        break;
      }
    }

    let prevState = this.state;
    prevState.values = output;
    prevState.showAlternateResponse = flag;
    this.setState(prevState);

    this.submitMergedValues();
  }

  /**
   * Method called when either the select field or text field value changes
   *
   * @memberof SelectBlock
   */
  submitMergedValues() {
    if (this.state.showAlternateResponse) {
      let values = this.state.values;
      for (var x = 0; x < values.length; x++) {
        if (values[x].identifier === this.props.altResponseId) {
          values[x].value = this.state.alternateValue;
          break;
        }
      }
      this.props.onValueChanged(values);
    } else {
      this.props.onValueChanged(this.state.values);
    }
  }

  /**
   * Method called when the other text field value changes
   *
   * @param {*} event Text Field value change event
   * @memberof SelectBlock
   */
  onAlternateValueChanged(event) {
    const value = event;
    let prevState = this.state;
    prevState.alternateValue = value;
    this.setState(prevState);

    this.submitMergedValues();
  }

  /**
   * Renders SelectBlock Component
   *
   * @returns {*} SelectBlock Component
   * @memberof SelectBlock
   */
  render() {
    return (
      <div className='question-input-wrapper'>
        <FormControl fullWidth>
          <SelectField
            {...this.props}
            isMultiple={this.props.type === 'MULTI'}
            onValueChanged={this.valueChanged.bind(this)}
          />
        </FormControl>
        {this.state.showAlternateResponse && (
          <TextField
            class={'select-alt-field'}
            label={'Other (NO PII AUTHORIZED)'}
            maxLength={100}
            value={this.state.alternateValue}
            onValueChanged={this.onAlternateValueChanged.bind(this)}
          />
        )}
        <ErrorLabel
          isValid={this.props.isValid}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

SelectBlock.defaultProps = {
  color: 'default',
  alignment: 'vertical',
  labelPlacement: 'right'
};

SelectBlock.propTypes = {
  value: PropTypes.arrayOf(PropTypes.any),
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  altResponseId: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  number: PropTypes.number,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  dataType: PropTypes.shape({
    code: PropTypes.string
  }),
  type: PropTypes.string,
  color: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  inputLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChanged: PropTypes.func.isRequired,
  config: PropTypes.shape({
    maxCount: PropTypes.number, // Also used by Text
    alternateResponseAllowed: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        identifier: PropTypes.string.isRequired,
        displayText: PropTypes.string.isRequired,
        helperText: PropTypes.string,
        isSelected: PropTypes.bool,
        isDisabled: PropTypes.bool
      })
    ).isRequired
  })
};

export default SelectBlock;
