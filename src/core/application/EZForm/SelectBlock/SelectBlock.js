/*
 * File: /src/core/survey/SelectBlock/SelectBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: INSERT DESCRIPTION
 * File Created: Friday, 19th February 2021 10:49 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 22nd February 2021 8:28 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import QuestionLabel from "../QuestionLabel";
import SelectField from "../../../input/SelectField";
import ErrorLabel from "../ErrorLabel";

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
        this.props.onValueChanged(this.props.identifier, output);
    }

    /**
     * Renders SelectBlock Component
     *
     * @returns {*} SelectBlock Component
     * @memberof SelectBlock
     */
    render() {
        console.log("Rendering select block ", this.props)
        return (
            <>
                <QuestionLabel
                    label={this.props.label}
                    helperText={this.props.helperText}
                    isRequired={this.props.isRequired}
                    number={this.props.number}
                />
                <div className="question-input-wrapper pl-5">
                <FormControl fullWidth>
                    <SelectField
						{...this.props}
						isMultiple={this.props.dataType.isMultiple}
                        onValueChanged={this.valueChanged.bind(this)}
                    />
                </FormControl>
                <ErrorLabel
                    isValid={this.props.isValid}
                    errorMessage={this.props.errorMessage}
                />
                </div>
            </>
        );
    }
}

SelectBlock.defaultProps = {
    color: "default",
    alignment: "vertical",
    labelPlacement: "right",
};

SelectBlock.propTypes = {
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

export default SelectBlock;
