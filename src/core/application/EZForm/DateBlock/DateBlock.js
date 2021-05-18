/*
 * File: /src/core/survey/DateBlock/DateBlock.js
 * Version: 0.0.3
 * Project: @siliconmtn/spacelibs-react
 * Description: Class to render a Date Question
 * File Created: Friday, 19th February 2021 10:39 am
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Monday, 17th May 2021 11:03 am
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
     * Creates an instance of DateBlock.
     * @param {*} props Component props
     * @memberof DateBlock
     */
    constructor(props) {
        super(props);
    }

    /**
     * Event handler for value change events
     *
     * @param {object} output - Event handler event
     * @memberof DateBlock
     */
    onValueChanged(output) {
		if (output == null){
			output = [];
		}else if (output.constructor !== Array) {
            output = [output];
        }
        this.props.onValueChanged(this.props.identifier, output);
    }

	/**
	 * Renders Date Block component
	 *
	 * @returns {*} Date Block component
	 * @memberof DateBlock
	 */
	render() {
		const {label, ...leftovers} = this.props;

        return (
            <>
                <QuestionLabel
                    label={label}
                    helperText={this.props.helperText}
                    isRequired={this.props.isRequired}
                    number={this.props.number}
                />
                <div className='question-input-wrapper pl-5'>
                    <FormControl fullWidth>
                        <DateField
                            {...leftovers}
                            onValueChanged={this.onValueChanged.bind(this)}
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

DateBlock.defaultProps = {
    variant: "standard",
    isRequired: false,
};

DateBlock.propTypes = {
    value: PropTypes.arrayOf(PropTypes.any),
    isValid: PropTypes.bool,
    errorMessage: PropTypes.string,

    identifier: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
    number: PropTypes.number,
    label: PropTypes.string.isRequired,
    onValueChanged: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,
};

export default DateBlock;