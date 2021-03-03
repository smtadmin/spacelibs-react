/*
 * File: /src/core/survey/RadioBlock/RadioBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to render a Radio Question
 * File Created: Friday, 19th February 2021 10:25 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:06 am
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
    }

	/**
	 * Event handler for value changing
	 *
	 * @param {*} output - value changed
	 * @memberof RadioBlock
	 */
	valueChanged(output) {
        if (output.constructor !== Array) {
            output = [output];
        }
        this.props.onValueChanged(this.props.identifier, output);
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
                    isRequired={this.props.isRequired}
                    number={this.props.number}
                />
                <div className="question-input-wrapper pl-5 pt-2">
                <FormControl fullWidth>
                    <RadioGroup
                        {...this.props}
                        color={this.props.color}
                        onValueChanged={this.valueChanged.bind(this)}
                    />
                </FormControl>
                <ErrorLabel isValid={this.props.isValid} errorMessage={this.props.errorMessage} />
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
    number: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,

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