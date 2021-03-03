/*
 * File: /src/core/survey/QuestionBlock/QuestionBlock.js
 * Version: 0.0.2
 * Project: @siliconmtn/spacelibs-react
 * Description: Question Factory Component
 * File Created: Tuesday, 9th February 2021 6:10 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 3rd March 2021 9:04 am
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DateBlock from '../DateBlock';
import RadioBlock from '../RadioBlock';
import CheckBlock from "../CheckBlock";
import SelectBlock from "../SelectBlock";
import TextBlock from "../TextBlock";

/**
 * Question Factory
 */
class QuestionBlock extends React.Component {
    /**
     * Creates an instance of QuestionBlock.
     * @param {*} props -
     * @memberof QuestionBlock
     */
    constructor(props) {
		super(props);

		
	}
	
	/**
	 * Method to get a map of block components;
	 *
	 * @returns {*} Map of Block components
	 * @memberof QuestionBlock
	 */
	getComponentMap(){
		let dictionary = {};
		dictionary["date"] = DateBlock;
		dictionary["text"] = TextBlock;
		dictionary["radio"] = RadioBlock;
		dictionary["check"] = CheckBlock;
		dictionary["select"] = SelectBlock;
		dictionary["multiselect"] = SelectBlock;
		return dictionary;
	}

    /**
     * Render Question Block
     *
     * @returns {*} - Rendered component
     * @memberof QuestionBlock
     */
    render() {
		let props = this.props;
		props.config = { options: this.props.options };
		delete props.options;
		
		let component = this.getComponentMap()[this.props.dataType.code];
		if(component === null || component === undefined){
			console.error("Type '" + this.props.dataType.code + "' was not found in 'getComponentMap()'");
			return null;
		}

		let newReactElement = React.createElement(component, {...props}, null);

		return <div className={"question-block-wrapper pt-3 pl-2"}>{newReactElement}</div>;
    }
}

QuestionBlock.defaultProps = {
	variant: "standard",
	isRequired: false
};

QuestionBlock.propTypes = {
    value: PropTypes.any,
    isValid: PropTypes.bool,
    errorMessage: PropTypes.string,
	config: PropTypes.any,
    identifier: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    variant: PropTypes.oneOf(["standard", "filled", "outlined"]),
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    helperText: PropTypes.string,
    dataType: PropTypes.shape({
        code: PropTypes.oneOf([
            "date",
            "radio",
            "select",
            "check",
            "text",
            "multiselect",
        ]).isRequired,
        isMultiple: PropTypes.bool,
    }),
    placeholder: PropTypes.string,
    isAlternateResponseAllowed: PropTypes.bool,
    // Choice details
    maxCount: PropTypes.number, // Also used by Text
    alternateResponseAllowed: PropTypes.bool,

    // Date
    minDate: PropTypes.string,
    maxDate: PropTypes.string,

    // Text
    textType: PropTypes.string,
    matchesPattern: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            identifier: PropTypes.string.isRequired,
            displayText: PropTypes.string.isRequired,
            helperText: PropTypes.string,
            isSelected: PropTypes.bool,
            isDisabled: PropTypes.bool,
        })
    ),
    onValueChanged: PropTypes.func.isRequired,
};

const areEqual = (prevProps, nextProps) => {
	return prevProps.identifier === nextProps.identifier
		&& prevProps.value === nextProps.value
		&& prevProps.isValid === nextProps.isValid
		&& prevProps.errorMessage === nextProps.errorMessage;
};

export default React.memo(QuestionBlock, areEqual);