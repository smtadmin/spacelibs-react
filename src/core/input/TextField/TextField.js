/*
 * File: /src/core/survey/TextField/TextBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Spacelibs TextField input
 * File Created: Wednesday, 10th February 2021 8:26 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 17th May 2021 10:55 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";
import MuiTextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";

/**
 * Text Field component
 * props: 
 	className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onValueChanged: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    hasError: PropTypes.bool,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    subText: PropTypes.string,
    placeholder: PropTypes.string,
    variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
 *
 * @class TextField
 */
class TextField extends React.Component {
    /**
     * Creates an instance of TextField.
     *
     * @param {*} props - TextField props
     * @memberof TextField
     */
    constructor(props) {
        super(props);
    }

    /**
     * Event handler for TextField value chaning
     *
     * @param {*} output - Text input change event
     * @memberof TextField
     */
    onValueChanged(output) {
        let reducedValue = output && output.target ? output.target.value : null;
        this.props.onValueChanged(reducedValue);
    }

    /**
     * Renders the TextField component
     *
     * @returns {object} - TextField child elements
     * @memberof TextField
     */
    render() {
		const InputProps = this.props.startAdornment ? {
            startAdornment: <InputAdornment position="start">{this.props.startAdornment}</InputAdornment>,
          } : null;

		let inputProps = this.props.inputProps ? this.props.inputProps : {};
		inputProps.readOnly = this.props.isReadOnly;

		if(this.props.maxLength != null){
			inputProps.maxLength = this.props.maxLength;
		}

        return (
            <FormControl fullWidth={this.props.fullWidth} style={this.props.style}>
                <MuiTextField
                    autoFocus={this.props.autoFocus}
                    disabled={this.props.isDisabled}
                    className={this.props.className}
                    variant={this.props.variant}
                    multiline={this.props.multiline}
                    rowsMax={this.props.rowsMax}
                    data-testid={"textfield-input"}
                    type={this.props.type}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    inputProps={inputProps}
                    onChange={this.onValueChanged.bind(this)}
                    value={this.props.value ? this.props.value : ""}
                    required={this.props.required}
                    fullWidth={this.props.fullWidth}
					label={this.props.label}
					placeholder={this.props.placeholder}
                    error={this.props.hasError ? true : null}
                    InputProps={InputProps}
                />
                {this.props.subText && this.props.subText.length > 0 && (
                    <FormHelperText>{this.props.subText}</FormHelperText>
                )}
            </FormControl>
        );
    }
}

/**
 * Default Props
 */
TextField.defaultProps = {
    variant: "standard",
    fullWidth: true,
    required: false,
    isDisabled: false,
};

/**
 * Accepted Props
 */
TextField.propTypes = {
	className: PropTypes.string,
	autoFocus: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onValueChanged: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	inputProps: PropTypes.any,
    value: PropTypes.string,
	hasError: PropTypes.bool,
	multiline: PropTypes.bool,
	rowsMax: PropTypes.number,
	maxLength: PropTypes.number,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    subText: PropTypes.string,
	placeholder: PropTypes.string,
	startAdornment: PropTypes.string,
	style: PropTypes.object,
    variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
};

export default TextField;
