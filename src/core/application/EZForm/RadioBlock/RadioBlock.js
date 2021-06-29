/*
 * File: /src/core/survey/RadioBlock/RadioBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to render a Radio Question
 * File Created: Friday, 19th February 2021 10:25 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Friday, 4th June 2021 8:32 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import QuestionLabel from "../QuestionLabel";
import RadioGroup from "../../../input/RadioGroup";
import ErrorLabel from "../ErrorLabel";
import TextField from "../../../input/TextField";

/**
 * RadioBlock component
 */
class RadioBlock extends React.Component {
    /**
     * Creates an instance of RadioBlock.
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
            alternateValue: object != null ? object.value : "",
        };
    }

    /**
     * Event handler for value changing
     *
     * @param {*} output - value changed
     * @memberof RadioBlock
     */
    valueChanged(output) {
        if (output.constructor !== Array) output = [output];

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
     * @memberof RadioBlock
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
            this.props.onValueChanged(this.props.identifier, values);
        } else {
            this.props.onValueChanged(this.props.identifier, this.state.values);
        }
    }

    /**
     * Method called when the other text field value changes
     *
     * @param {*} event Text Field value change event
     * @memberof RadioBlock
     */
    onAlternateValueChanged(event) {
        const value = event;
        let prevState = this.state;
        prevState.alternateValue = value;
        this.setState(prevState);

        this.submitMergedValues();
    }

    /**
     * Renders Radio Block Component
     *
     * @returns {*} Radio Block Component
     * @memberof RadioBlock
     */
    render() {
        return (
            <>
                <QuestionLabel
                    label={this.props.label}
                    helperText={this.props.helperText}
                    required={this.props.required}
                    number={this.props.number}
                />
                <div className='question-input-wrapper pl-5 pt-2'>
                    <FormControl fullWidth>
                        <RadioGroup
                            {...this.props}
                            color={this.props.color}
                            onValueChanged={this.valueChanged.bind(this)}
                        />
                    </FormControl>
                    {this.state.showAlternateResponse && (
                        <TextField
                            class={"select-alt-field"}
                            label={"Other"}
                            value={this.state.alternateValue}
                            onValueChanged={this.onAlternateValueChanged.bind(
                                this
                            )}
                        />
                    )}
                    <ErrorLabel
                        isValid={this.props.isValid}
                        errorMessage={this.props.errorMessage}
                    />
                </div>
            </>
        );
    }
}

RadioBlock.defaultProps = {
    color: "default",
    alignment: "vertical",
    labelPlacement: "right",
};

RadioBlock.propTypes = {
    value: PropTypes.arrayOf(PropTypes.any),
    isValid: PropTypes.bool,
    errorMessage: PropTypes.string,

    identifier: PropTypes.string.isRequired,
    number: PropTypes.number,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
	required: PropTypes.bool,
	altResponseId: PropTypes.string,

    color: PropTypes.string,
    labelPlacement: PropTypes.oneOf(["left", "top", "right", "bottom"]),
    variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
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
                isDisabled: PropTypes.bool,
            })
        ).isRequired,
    }),
};

export default RadioBlock;