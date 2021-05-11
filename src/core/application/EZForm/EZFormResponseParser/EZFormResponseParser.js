/*
 * File: /src/core/application/EZForm/EZFormResponseParser/EZFormResponseParser.js
 * Version: 0.0.19
 * Project: @siliconmtn/spacelibs-react
 * Description: Parser that converts EZForm question data to question responses
 * File Created: Tuesday, 27th April 2021 5:07 pm
 * Author: tyler Gaffaney (tyler.gaffaney@siliconmtn.com)
 * -----
 * Last Modified: Tuesday, 27th April 2021 5:11 pm
 * Modified By: tyler Gaffaney (tyler.gaffaney@siliconmtn.com>)
 * -----
 * Copyright 2021, Silicon Mountain Technologies, Inc.
 */

/**
 * EZForm question response parser
 *
 * @class EZFormResponseParser
 */
class EZFormResponseParser {

	/**
	 * Gets the response array for an EZForm
	 *
	 * @param {*} ezformData - EZForm data object
	 * @returns {*} Array of EZForm question responses
	 * @memberof EZFormResponseParser
	 */
	getResponseDataForEZForm(ezformData){
		let data = [];
		for (let x = 0; x < ezformData.pages.length; x++) {
            const page = ezformData.pages[x];
            for (let y = 0; y < page.questions.length; y++) {
                const question = page.questions[y];
                let values = this.getResponseValuesFromQuestion(question);
                for (var z = 0; z < values.length; z++) {
                    data.push(values[z]);
                }
            }
		}
		return data;
	}

    /**
     * Gets the current value(s) for a question to send as a response to the backend
     *
     * @param {*} question Question object
     * @returns {*} Array of values
     * @memberof EZForm
     */
    getResponseValuesFromQuestion(question) {
        const dictionary = {
            ENTRY: this.getEntryValue.bind(this),
            MULTI: this.getMultiValue.bind(this),
            CHOICE: this.getChoiceValue.bind(this),
        };

        return dictionary[question.type](question);
    }

    /**
     * Gets value for an Entry question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getEntryValue(question) {
        if (question.value == null || question.value.length === 0) {
            return [];
        }

        return [
            {
                question: question.identifier,
                value: question.value[0],
            },
        ];
    }

    /**
     * Gets value for a Multi question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getMultiValue(question) {
        let values = [];
        for (let x = 0; x < question.value.length; x++) {
            const value =
                question.altResponseId === question.value[x].identifier
                    ? question.value[x].value
                    : question.value[x].displayText;
            values.push({
                question: question.identifier,
                value: value,
            });
        }
        return values;
    }

    /**
     * Gets value for a Choice question
     *
     * @param {*} question Question object
     * @returns {Array.<{isValid: boolean, errorMessage: string}>} Value object
     * @memberof EZForm
     */
    getChoiceValue(question) {
        if (question.value == null || question.value.length === 0) return [];

        const value =
            question.altResponseId === question.value[0].identifier
                ? question.value[0].value
                : question.value[0].displayText;

        return [
            {
                question: question.identifier,
                value: value,
            },
        ];
    }
}

export default EZFormResponseParser;