/*
 * File: /src/core/survey/TextBlock/TextBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to render TextBlock
 * File Created: Friday, 19th February 2021 10:04 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Thursday, 18th March 2021 5:17 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import QuestionLabel from "../QuestionLabel";
import TextField from "../../../input/TextField";
import ErrorLabel from "../ErrorLabel";

/**
 * TextBlock Component
 */
class TextBlock extends React.Component {

	/**
	 * On value changed handler
	 *
	 * @param {*} output - Value
	 * @memberof TextBlock
	 */
	onValueChanged(output) {
		let reducedValue = output;
        if (reducedValue.constructor !== Array) {
            reducedValue = [reducedValue];
        }
        this.props.onValueChanged(this.props.identifier, reducedValue);
    }

    /**
     * QuestionLabel Render
     *
     * @returns {*} Component
     * @memberof TextBlock
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
                <div className='question-input-wrapper pl-5'>
                    <FormControl fullWidth>
                        <TextField
                            type={this.props.config.textType}
                            onValueChanged={this.onValueChanged.bind(this)}
                            value={this.props.value ? this.props.value[0] : ""}
                            isValid={this.props.isValid}
                        />
                    </FormControl>
                    <ErrorLabel
                        errorMessage={this.props.errorMessage}
                        isValid={this.props.isValid}
                    />
                </div>
            </>
        );
    }
}

TextBlock.defaultProps = {
	variant: "standard",
	isRequired: false,
	config: {}
};

TextBlock.propTypes = {
	value: PropTypes.arrayOf(PropTypes.string),
	isValid: PropTypes.bool,
	errorMessage: PropTypes.string,

	identifier: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
	number: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	onValueChanged: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	helperText: PropTypes.string,
	config: PropTypes.shape({
		textType: PropTypes.string,
		matchesPattern: PropTypes.string,
	}),
	isRequired: PropTypes.bool,
};

export default TextBlock;