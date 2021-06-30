/*
 * File: /src/core/application/EZForm/EZFormValidator/EZFormValidator.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Module to validate different parts of an EZForm form
 * File Created: Tuesday, 27th April 2021 4:30 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Wednesday, 30th June 2021 1:43 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

import moment from "moment";

/**
 * This is the EZForm Validator class
 *
 * @class EZFormValidator
 */
export default class EZFormValidator {

	/**
	 * This validates an EZForm Page and returns the validated page with errors
	 *
	 * @param {*} page - Page object
	 * @returns {*} Validated page and any errors
	 * @memberof EZFormValidator
	 */
	validatePage(page) {
        let errors = [];
        for (let question of page.questions) {

            const validateObject = this.validateQuestion(question);
            if (!validateObject.isValid) {
				let label = question.number ? question.number + '. ' : '';
                errors.push(label + '"' + question.label + '"');
            }

            question.isValid = validateObject.isValid;
            question.errorMessage = validateObject.errorMessage;
        }
        return {
            validatedPage: page,
            errors: errors,
            hasErrors: errors.length > 0,
        };
    }

    /**
     * Method to get an aggregated list of errors
     *
     * @param {*} errors error-ing questions
     * @returns {*} String message for errors
     */
    getErrorMessageForErrors(errors) {
        if (errors.length === 0) {
            return null;
        }
        if (errors.length === 1) {
            return errors[0];
        } else {
            let output = "";
            for (let error of errors) {
                output += error + ", ";
            }
            return output.slice(0, -2);
        }
    }

    /**
     *Validates that the required questions were answered and all of the input values are valid
     *
     * @param {*} question - The question to validate
     * @returns {*} - Object with boolean isValid and an error if the validation returns false
     * @memberof EZForm
     */
    validateQuestion(question) {
        const dictionary = {
            ENTRY: this.validateEntry.bind(this),
            MULTI: this.validateMulti.bind(this),
            CHOICE: this.validateChoice.bind(this),
        };
        const validationFunc = dictionary[question.type];
        const validationObject = validationFunc(question);
        return validationObject;
    }

    /**
     * Factory for single value validation against its type
     *
     * @param {*} value value to be validated
     * @param {*} type type the value should be
     * @param {*} required whether or not the value is required
     * @returns {*} validation object
     * @memberof EZForm
     */
    validateValueAgainstType(value, type, required) {
        const dictionary = {
            DATE: this.validateDate.bind(this),
            TEXT: this.validateText.bind(this),
            NUMBER: this.validateNumber.bind(this),
        };
        return dictionary[type](value, required);
    }

    /**
     * Validates the value object as a date
     *
     * @param {*} value Object to validate
     * @param {*} required Whether or not the date is required
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateDate(value, required) {
        const validDate = value && moment(value, "MM/DD/YYYY").isValid();

        if (required) {
            if (validDate) {
                return { isValid: true, errorMessage: "" };
            } else if (!value || value.length === 0) {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            } else {
                return { isValid: false, errorMessage: "" };
            }
        } else {
            if (validDate || value == null || value.length === 0) {
                return { isValid: true, errorMessage: "" };
            } else {
                return { isValid: false, errorMessage: "" };
            }
        }
    }

    /**
     * Validates a value object as text
     *
     * @param {*} value Object to validate
     * @param {*} required Whether or not the value needs to exist
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateText(value, required) {
        const hasValue = value != null && value.length > 0;

        if (required) {
            if (hasValue) {
                return { isValid: true, errorMessage: "" };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            }
        } else {
            return { isValid: true, errorMessage: "" };
        }
    }

    /**
     * Validates a value object as a number
     *
     * @param {*} value Object to validate
     * @param {*} required Whether or not the value needs to exist
     * @returns {*} Validation object
     * @memberof EZForm
     */
    validateNumber(value, required) {
        const validNumber = value && !isNaN(value);
        if (required) {
            if (validNumber && value.length > 0) {
                return { isValid: true, errorMessage: "" };
            } else if (value && value.length > 0) {
                return {
                    isValid: false,
                    errorMessage: "This field expects a number",
                };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field is required",
                };
            }
        } else {
            if (validNumber || value == null || value.length === 0) {
                return { isValid: true, errorMessage: "" };
            } else {
                return {
                    isValid: false,
                    errorMessage: "This field expects a number",
                };
            }
        }
    }

    /**
     * Validates an entry question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateEntry(question) {
        const hasValues = question.value != null && question.value.length;
        return this.validateValueAgainstType(
            hasValues ? question.value[0] : null,
            question.dataType.code,
            question.required
        );
    }

    /**
     * Validate a multiple choice question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateMulti(question) {
        let values = question.value;
        let altId = question.altResponseId;

        for (let index = 0; index < values.length; index++) {
            const option = values[index];
            const value =
                option.identifier === altId ? option.value : option.displayText;

            let error = this.validateValueAgainstType(
                value,
                question.dataType.code,
                question.required
            );
            if (!error.isValid) {
                return error;
            }
        }

        if (question.required && values.length === 0) {
            return {
                isValid: false,
                errorMessage: "This field is required",
            };
        }

        return { isValid: true, errorMessage: "" };
    }

    /**
     * Validates a choice question
     *
     * @param {*} question Question to validate
     * @returns {*} boolean, true the value is a valid representation of the type
     * @memberof EZForm
     */
    validateChoice(question) {
        const hasValues = question.value != null && question.value.length > 0;
        let value;
        if (hasValues) {
            value =
                question.altResponseId === question.value[0].identifier
                    ? question.value[0].value
                    : question.value[0].displayText;
        }

        return this.validateValueAgainstType(
            value,
            question.dataType.code,
            question.required
        );
    }
}
