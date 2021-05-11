/*
 * File: /src/core/input/SelectField/SelectField.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs Select field
 * File Created: Monday, 8th February 2021 4:50 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 23rd April 2021 3:04 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Tooltip from '../Tooltip';

/**
 * Select Field class
 */
class SelectField extends React.Component {
	
  /**
   * Creates an instance of SelectField.
   *
   * @param {object} props - Component props
   * @memberof SelectField
   */
  constructor(props) {
    super(props);
  }

  /**
   * Event handler for select option picks
   *
   * @param {*} _event - Event to handle
   * @param {*} selectedValues - Selected values
   * @memberof SelectField
   */
  onValueChanged(_event, selectedValues) {
    if (selectedValues === null) {
      this.setState({
        selectedValues: [],
      });
      this.props.onValueChanged([]);
    } else if (selectedValues.constructor === Array) {
      // Is Multiple
      this.setState({
        selectedValues: selectedValues,
      });
      this.props.onValueChanged(selectedValues);
    } else {
      // Is single
      this.setState({
        selectedValues: [selectedValues],
      });
      this.props.onValueChanged(selectedValues);
    }
  }

  /**
   * Checks whether an option should be selected
   *
   * @param {*} option - Option to test
   * @param {*} selected - Selected objects
   * @returns {boolean} True if option is selected, otherwise false
   */
  isOptionSelected(option, selected) {
    return option.identifier === selected.identifier;
  }

  /**
   * Returns whether or not an option should be disabled
   *
   * @param {object} option - Option object to pull .isDisabled from
   * @returns {boolean} True if selection count is greater than max or if value is disabled
   * @memberof SelectField
   */
  isOptionDisabled(option) {
    const isOverLimit = this.props.value.length >= this.props.config.maxCount;
    return isOverLimit || option.isDisabled;
  }

  /**
   * Returns an options label
   *
   * @param {*} option - Option to become a label
   * @returns {*} - Text to display in select field
   * @memberof SelectField
   */
  getOptionLabel(option) {
    var output = option.displayText;
    return output;
  }

  /**
   * Returns a rendered Input for the select filed
   *
   * @param {*} params - Input params passed from <Autocomplete> component
   * @returns {object} - Text field that <Autocomplete> will reside in
   * @memberof SelectField
   */
  renderInput(params) {
    return (
        <TextField
            {...params}
            error={this.props.hasError ? true : null}
            variant={this.props.variant}
            placeholder={this.props.placeholder}
            label={this.props.inputLabel}
        />
    );
  }

  /**
   * Returns a rendered Option for the select field
   *
   * @param {object} option - Option object to be rendered
   * @param {string} inputValue - Current input value (what the user has typed in)
   * @returns {object} - Rendered Option
   * @memberof SelectField
   */
  renderOption(option, inputValue) {
    const matches = match(option.displayText, inputValue);
    const parts = parse(option.displayText, matches);

    return (
      <div>
        {parts.map((part, index) => (
          <span
            data-testid={"select-option"}
            key={index}
            style={{ fontWeight: part.highlight ? 700 : 400 }}
          >
            {part.text}
          </span>
        ))}
        <Tooltip text={option.helperText} />
      </div>
    );
  }

  /**
   * Renders SelectField component
   *
   * @returns {object} - Components to render
   * @memberof SelectField
   */
  render() {
    let selectedValues;
    let value = this.props.value;

    if (this.props.isMultiple) {
      // Is Multiple
      selectedValues = value;
    } else {
      selectedValues = value.length > 0 ? value[0] : null;
    }

    var options = this.props.config.options;
    return (
      <Autocomplete
        data-testid={"select"}
        multiple={this.props.isMultiple ? true : false}
        options={options}
        getOptionLabel={(option) => this.getOptionLabel(option)}
        value={selectedValues}
        getOptionSelected={(option, option2) =>
          this.isOptionSelected(option, option2)
        }
        onChange={this.onValueChanged.bind(this)}
        renderInput={(params) => this.renderInput(params)}
        getOptionDisabled={(option) => this.isOptionDisabled(option)}
        renderOption={(option, { inputValue }) =>
          this.renderOption(option, inputValue)
        }
      />
    );
  }
}

/**
 * Default Props
 */
SelectField.defaultProps = {
	variant: "standard",
	isMultiple: false,
	maxCount: Number.MAX_SAFE_INTEGER
};

/**
 * Accepted Props
 */
SelectField.propTypes = {
	value: PropTypes.arrayOf(PropTypes.any),
	hasError: PropTypes.bool,
	subText: PropTypes.string,
	isMultiple: PropTypes.bool,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	inputLabel: PropTypes.string,
	placeholder: PropTypes.string,
	onValueChanged: PropTypes.func.isRequired,
	config: PropTypes.shape({
		isMultiple: PropTypes.bool,
		maxCount: PropTypes.number, // Also used by Text
		alternateResponseAllowed: PropTypes.bool,
		options: PropTypes.arrayOf(PropTypes.shape({
			identifier: PropTypes.string.isRequired,
			displayText: PropTypes.string.isRequired,
			helperText: PropTypes.string,
			isSelected: PropTypes.bool,
			isDisabled: PropTypes.bool
		})).isRequired
	})
};

export default SelectField;
